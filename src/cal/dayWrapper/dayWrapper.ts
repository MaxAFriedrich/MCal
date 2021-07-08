import { addCommandKey } from "../../input/inputCallback";
import { CalDay } from "./calDay"

var days: CalDay[];
var selectedIndex: number;
var currentDay: CalDay;

/**
 * Function that initialises the module variables
 */
export function init(fromFile: string): void {
	days = getCalFromFileContents(fromFile);
	selectedIndex = -1;
	currentDay = null;

  addCommandKey("ArrowUp", () => { changeSelectedEventBy(-1); });
  addCommandKey("ArrowDown", () => { changeSelectedEventBy(1); });
}

export function display(selected: Date): void {
	console.log("Displaying events for " + selected.toDateString())
	// Implement binomial search
	selectedIndex = days.findIndex(day => day.getDate().toDateString() == selected.toDateString())
	if (selectedIndex == -1) {
		// Render empty day
		currentDay = new CalDay(new Date(selected));
		currentDay.render();
	} else {
		days[selectedIndex].render();
		currentDay = null;
	}
}

export function extractFromHTML(): void {
	if (selectedIndex == -1) {
		if (currentDay == null) {
			console.log("ERROR: events has not been displayed for this day yet");
		} else {
			selectedIndex = addDay(currentDay);
		}
	}
	days[selectedIndex].extractFromHTML();
}

export function getFileSaveString(): string {
	return JSON.stringify(days);
}

//* Private
function changeSelectedEventBy(changeBy: number): void {
	if (selectedIndex != -1) {
		days[selectedIndex].changeSelectedEventBy(changeBy);
	}
}

function addDay(day: CalDay): number {
	// TODO: Add binomial search to make sure days are sorted
	days.push(day);
	return days.length - 1;
}

function getCalFromFileContents(fromFile: string): CalDay[] {
	var file = JSON.parse(fromFile);
	var output: CalDay[] = [];

	for (var key in file) {
		output.push(CalDay.getDayFromJSON(JSON.stringify(file[key])));
	}

	return output;
}
