import { CalDay } from "./calDay"

var days: CalDay[];

export function init() {
	days = [];
	days.push(new CalDay(new Date()));
	days[0].render();
}