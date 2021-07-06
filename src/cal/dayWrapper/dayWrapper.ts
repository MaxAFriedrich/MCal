import { addCommandKey } from "../../input/inputCallback";
import { CalDay } from "./calDay"

var days: CalDay[];
var selectedIndex: number;

/**
 * Function that initialises the module variables
 */
export function init() {
	days = [];
	selectedIndex = 0;
	days.push(new CalDay(new Date()));

  addCommandKey("ArrowUp", () => { changeSelectedEventBy(-1); });
  addCommandKey("ArrowDown", () => { changeSelectedEventBy(1); });
}

export function display(selected: Date) {
	console.log("Displaying events for " + selected.toDateString())
	// Implement binomial search
	selectedIndex = days.findIndex(day => day.getDate().toDateString() == selected.toDateString())
	if (selectedIndex == -1) {
		// Render empty day
		CalDay.renderEmptyDay();
	} else {
		days[selectedIndex].render();
	}
}

//* Private
function changeSelectedEventBy(changeBy: number) {
	if (selectedIndex != -1) {
		days[selectedIndex].changeSelectedEventBy(changeBy);
	}
}

