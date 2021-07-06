import { CalDay } from "./calDay"

var days: CalDay[];

/**
 * Function that initialises the module variables
 */
export function init() {
	days = [];
	days.push(new CalDay(new Date()));
}

export function display(selected: Date) {
	console.log("Displaying events for " + selected.toDateString())
	// Implement binomial search
	var day: CalDay = days.find(day => day.getDate().toDateString() == selected.toDateString())
	if (day == null) {
		// Render empty day
		CalDay.renderEmptyDay();
	} else {
		day.render();
	}
}