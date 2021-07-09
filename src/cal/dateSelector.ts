import { createButton, createInput, createTable } from "../gui/creation";
import { ClassName, addClassNameToElement } from "../gui/className";
import { getAttributeFromElement, getDateSelectorBoxValue, getHTML, GUIElement, setDatePicker, setElementAttribute } from "../gui/guiElement";
import { addCommandKey, CommandKey } from "../input/input";

var monthViewing: Date;
var selectedDate: Date;
var displayDate: () => void;

/**
 * Sets up initial variables and displays the selector
 */
export function init(displayDateFunc: () => void) {
	monthViewing = new Date();
	selectedDate = new Date();
	displayDate = displayDateFunc;

  addCommandKey([CommandKey.alt], "ArrowLeft", () => { changeSelectedDayBy(-1); });
  addCommandKey([CommandKey.alt], "ArrowRight", () => { changeSelectedDayBy(1); });
}

/**
 * Updates the selected date by looking at the date in the date selector text box
 * @returns boolean to say whether the selected date has changed
 */
export function hasDateSelectorChanged(): boolean {
	var dateString = getDateSelectorBoxValue();
	var date = parseDateString(dateString);
	if (!isNaN(date.getTime())) {
		if (selectedDate.toDateString() === date.toDateString()) return false;

		selectedDate = new Date(date);
		return true;
	}
	return false;
}

/**
 * Selects a new date and displays it on the screen
 * @param date date to select
 */
export function selectDate(date: Date) {
	selectedDate = date;
	monthViewing = date;
	console.log("Selected " + date.toDateString());
	displayDate();
}

/**
 * Changes the month being viewed to the month inputted
 * @param date to view on the calendar
 */
export function changeViewingMonth(date: Date) {
	monthViewing = date;
	displaySelector();
	console.log("Changing viewing month: " + getMonthYearString(date));
}

/**
 *
 * @returns Current selected day
 */
export function getSelectedDay(): Date {
	return selectedDate;
}

/**
 * Creates a table for the date selector and returns it
 * @returns table storing the calendar
 */
export function getSelector(): HTMLTableElement {
	function createTopRow(table: HTMLTableElement): void {
		var topRow = table.insertRow(-1);
		var topSlots = Array(5).fill(null).map(() => topRow.insertCell(-1));

		const buttons: [number, string, number][] = [ [0, "<<", -12]
																								, [1, "<", -1]
																								, [3, ">", 1]
																								, [4, ">>", 12]
																								];

		for (const [index, label, monthChange] of buttons) {
			var onPress = ((date: Date) => {
				return function () {
					changeViewingMonth(date);
				}
			})(new Date(monthViewing.getFullYear(), monthViewing.getMonth() + monthChange, 1, 0, 0, 0, 0));

			topSlots[index].appendChild(createButton(label, onPress, [ClassName.none]));
		}

		topSlots[2].colSpan = 3;
		var text = createInput("text", getMonthYearString(monthViewing), [ClassName.monthDisplay], true, 15);
		topSlots[2].appendChild(text);
	}

	function createDaysRow(table: HTMLTableElement) {
		var daysRow = table.insertRow(-1);

		for (var day of ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) {
			daysRow.insertCell(-1).innerHTML = day
		}
		addClassNameToElement(ClassName.daysRow, daysRow);
	}

	function getStartDate(): Date {
		var date = new Date(monthViewing.getFullYear(), monthViewing.getMonth(), 1, 0, 0, 0, 0);

		var extraDays = (date.getDay() + 6) % 7;
		date.setDate(date.getDate() - extraDays);

		return date;
	}

	function createDayButton(date: Date, today: Date): HTMLInputElement {
		var classNames: ClassName[] = [];
		if (date.getMonth() != monthViewing.getMonth()) {
			classNames.push(ClassName.otherMonth);
		}

		if (date.toDateString() === selectedDate.toDateString()) {
			classNames.push(ClassName.selected);
		}

		if (date.toDateString() === today.toDateString()) {
			classNames.push(ClassName.today);
		}

		var onPress = ((date: Date) => {
			return function () {
				selectDate(date);
			};
		})(new Date(date));

		return createButton(date.getDate().toString(), onPress, classNames);
	}

	var table = createTable();

	createTopRow(table);
	createDaysRow(table);

	var today = new Date();
  var date = getStartDate();

  do {
    // Loop for each week
    var row = table.insertRow(-1);
    for (var i = 0; i < 7; i++) {
      // Loop each day of this week
      var cell = row.insertCell(-1);

      var day = createDayButton(date, today);
      cell.appendChild(day);

      date.setDate(date.getDate() + 1); // Increment a day
    }
  } while (date.getMonth() == monthViewing.getMonth());

	return table;
}

/**
 * Displays the selector of a given month on the screen
 */
export function displaySelector(): void {
	setElementAttribute(GUIElement.date, "value", getDateString(selectedDate));
	setDatePicker(getSelector());
}

//* Private

/**
 * Converts string in form "dd/MM/YYYY" into a date
 * @param dateString Date in string format
 * @returns Date (which could be invalid if the date is invalid)
 */
function parseDateString(dateString: string): Date {
	if (dateString == "") return new Date("NotADate");

	var components = dateString.split('/');

	if (components.length != 3) return new Date(dateString);

	return new Date(+components[2], +components[1] - 1, +components[0], 0, 0, 0, 0);
}

/**
 * Changes the selected day by a given amount
 * @param changeBy number to change selected day by
 */
function changeSelectedDayBy(changeBy: number) {
	selectedDate.setDate(selectedDate.getDate() + changeBy);
	monthViewing = new Date(selectedDate);
	displayDate();
}

/**
 * Returns month as a number from an index value
 * @param index of the month
 * @returns month as a number
 */
function indexToMonth(index: number) {
	return index + 1;
}

/**
 * Returns the date in: dd/mm/YYYY
 * @param date date to display as text
 * @returns string version of the date in numbers
 */
function getDateString(date: Date): string {
	return date.getDate() + '/' + indexToMonth(date.getMonth()) + '/' + date.getFullYear();
}

/**
 *
 * @returns list of all the months with their full names
 */
function getMonths(): string[] {
	return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

/**
 * Returns name of month from the index
 * @param index of the month
 * @returns month as a string
 */
function getMonthName(index: number): string {
	return getMonths()[index];
}

/**
 *
 * @param date to display
 * @returns String containing month and year
 */
function getMonthYearString(date: Date): string {
	return getMonthName(date.getMonth()) + ' ' + date.getFullYear();
}
