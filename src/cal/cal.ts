import { ClassName, scrollToFirstElementWithClassNames } from "../gui/className";
import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"

/**
 * Initialises each section and displays the starting section
 * @param fromFile contents of .json save file
 */
export function init(fromFile: string) {
  DayWrapper.init(fromFile);
  Selector.init(dateDisplay);
  dateDisplay();
}

/**
 * Function to be called when the events have been edited
 */
export function eventChanged() {
  console.log("Calendar events have changed, updating CalDay");
  DayWrapper.extractFromHTML();
}

/**
 * Function to be called when the selected day in the text box has been changed
 */
export function selectedDayChanged() {
  if (Selector.hasDateSelectorChanged()) {
    dateDisplay();
  }
}

/**
 *
 * @returns string to save to a json file
 */
export function getSaveFileString(): string {
  return DayWrapper.getFileSaveString(); // TODO: Add selected day to save?
}

//* Private

/**
 * Displays the events for the selected day
 */
function dateDisplay() {
  var selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);

  scrollToFirstElementWithClassNames([ClassName.event, ClassName.selected]);
}