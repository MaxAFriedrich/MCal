import { CalDay } from "./calDay"

var days: CalDay[];

/**
 * Function that initialises the module variables
 */
export function init() {
	days = [];
	days.push(new CalDay(new Date()));
	days[0].render();
}