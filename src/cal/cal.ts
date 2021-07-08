import { ClassName, scrollToFirstElementWithClassNames } from "../gui/className";
import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"

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
  if (Selector.hasDateSelectorChanged()) {
    dateDisplay();
  }
}

export function getSaveFileString(): string {
  return DayWrapper.getFileSaveString(); // TODO: Add selected day to save?
}

//* Private
function dateDisplay() {
  var selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);

  scrollToFirstElementWithClassNames([ClassName.event, ClassName.selected]);
}