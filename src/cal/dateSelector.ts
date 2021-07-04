import { createButton, createInput, createTable, setDatePicker } from "../gui/gui";

const MONTH_DISPLAY_CLASS_NAME = "month_display";
const SELECTED_DATE_CLASS_NAME = "selected";
const CURRENT_DATE_CLASS_NAME = "today";
const OTHER_MONTH_DATES_CLASS_NAME = "other_month";
const DAYS_ROW_CLASS_NAME = "days_row"

var monthViewing: Date;
var selectedDate: Date;

export function init() {
	monthViewing = new Date();
	selectedDate = new Date();
	displaySelector();
}
/**
 * Selects a new date and displays it on the screen
 * @param date date to select
 */
export function selectDate(date: Date) {
	selectedDate = date;
	monthViewing = date;
	displaySelector();
}

/**
 * Changes the month being viewed to the month inputted
 * @param date to view on the calendar
 */
export function changeViewingMonth(date: Date) {
	monthViewing = date;
	displaySelector();
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
			var nextDate = new Date(monthViewing.getFullYear(), monthViewing.getMonth() + monthChange, 1, 0, 0, 0, 0);
			topSlots[index].appendChild(createButton(label, () => { changeViewingMonth(nextDate); }, ""));
		}

		topSlots[2].colSpan = 3;
		var text = createInput("text", getMonthYearString(monthViewing), MONTH_DISPLAY_CLASS_NAME, true, 15);
	}

	function createDaysRow(table: HTMLTableElement) {
		var days_row = table.insertRow(-1);

		for (var day of ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) {
			days_row.insertCell(-1).innerHTML = day
		}
		days_row.className = DAYS_ROW_CLASS_NAME;
	}

	function getStartDate(): Date {
		var date = new Date(monthViewing.getFullYear(), monthViewing.getMonth(), 1, 0, 0, 0, 0);

		var extraDays = (date.getDay() + 6) % 7;
		date.setDate(date.getDate() - extraDays);

		return date;
	}

	function createDayButton(date: Date, today: Date): HTMLInputElement {
		var className = "";
		if (date.getMonth() != monthViewing.getMonth()) {
			className += OTHER_MONTH_DATES_CLASS_NAME + ' ';
		}

		if (date.toDateString() === selectedDate.toDateString()) {
			className += SELECTED_DATE_CLASS_NAME + ' ';
		}

		if (date.toDateString() === today.toDateString()) {
			className += CURRENT_DATE_CLASS_NAME + ' ';
		}

		className = className.slice(0, -1);

		return createButton(date.getDate().toString(), () => { selectDate(date); }, className);
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
	console.log("Updating date selector");
	setDatePicker(getSelector());
}