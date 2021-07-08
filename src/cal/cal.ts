import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"

export function temp(){
  console.log("change to cal ocoured")
}

export function init(fromFile: string) {
  DayWrapper.init(fromFile);
  Selector.init(dateDisplay);
  dateDisplay();

}

export function eventChanged() {
  console.log("Calendar events have changed, updating CalDay");
  DayWrapper.extractFromHTML();
}

export function selectedDayChanged() {
  // TODO: Read new day from text box, give to date selector, and redisplay
}

export function getSaveFileString(): string {
  return DayWrapper.getFileSaveString(); // TODO: Add selected day to save?
}

//* Private
function dateDisplay() {
  // TODO: Focus selected day
  var selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);
}