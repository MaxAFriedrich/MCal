import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"

export function temp(){
  console.log("change to cal ocoured")
}

export function init() {
  DayWrapper.init();
  Selector.init(dateDisplay);
  dateDisplay();

}

export function eventChanged() {
  console.log("Calendar events have changed, updating CalDay");
  DayWrapper.extractFromHTML();
}

export function selectedDayChanged() {

}

//* Private
function dateDisplay() {
  var selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);
}