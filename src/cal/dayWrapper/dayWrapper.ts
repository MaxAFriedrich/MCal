import { addCommandKey } from "../../input/inputCallback";
import { CalDay } from "./calDay"

var days: CalDay[];
var selectedIndex: number;
var currentUnitialisedDay: CalDay;

/**
 * Function that initialises the module variables
 * @param fromFile should be string from the save file to initialise the variables
 */
export function init(fromFile: string): void {
	days = getCalFromFileContents(fromFile);
	selectedIndex = -1;
	currentUnitialisedDay = null;

  addCommandKey("ArrowUp", () => { changeSelectedEventBy(-1); });
  addCommandKey("ArrowDown", () => { changeSelectedEventBy(1); });
}

/**
 * Displays events for the current day
 * @param selected date to display
 */
export function display(selected: Date): void {
	console.log("Displaying events for " + selected.toDateString())
	// Implement binomial search
	selectedIndex = days.findIndex(day => day.getDate().toDateString() == selected.toDateString())
	if (selectedIndex == -1) {
		// Render empty day
		currentUnitialisedDay = new CalDay(new Date(selected));
		currentUnitialisedDay.render();
	} else {
		days[selectedIndex].render();
		currentUnitialisedDay = null;
	}
}

/**
 * Extracts information from HTML and saves it into the data structure (but not to a file)
 */
export function extractFromHTML(): void {
	if (selectedIndex == -1) {
		if (currentUnitialisedDay == null) {
			console.log("ERROR: events has not been displayed for this day yet");
		} else {
			selectedIndex = addDay(currentUnitialisedDay);
		}
	}
	days[selectedIndex].extractFromHTML();
}

/**
 *
 * @returns string to be saved to the file
 */
export function getFileSaveString(): string {
	return JSON.stringify(days);
}

//* Private

/**
 *
 * @param changeBy number to change selected index by
 */
function changeSelectedEventBy(changeBy: number): void {
	if (selectedIndex != -1) {
		days[selectedIndex].changeSelectedEventBy(changeBy);
	}
}

/**
 * Adds day to days array and returns index it was added at
 * @param day to add to the array
 * @returns index where the day was added to
 */
function addDay(day: CalDay): number {
	// TODO: Add binomial search to make sure days are sorted
	days.push(day);
	return days.length - 1;
}

/**
 * Converts JSON to CalDay[]
 * @param fromFile JSON string to be converted to CalDay[]
 * @returns CalDay[] created from the given string input
 */
function getCalFromFileContents(fromFile: string): CalDay[] {
	var file = JSON.parse(fromFile);
	var output: CalDay[] = [];

	for (var key in file) {
		output.push(CalDay.getDayFromJSON(JSON.stringify(file[key])));
	}

	return output;
}
