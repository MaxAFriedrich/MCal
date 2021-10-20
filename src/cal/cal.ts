import {
  ClassName,
  scrollToFirstElementWithClassNames,
} from "../gui/className";
import * as Selector from "./dateSelector";
import { CalEvent } from "./dayWrapper/calEvent";
import * as DayWrapper from "./dayWrapper/dayWrapper";

export let copyOn = false;
export let copyContents:CalEvent;
export function setCopyOn(value:boolean):void{
  copyOn=value;
}
export function setCopyContents(value:CalEvent):void{
  copyContents=new CalEvent(value.getDescription(),value.getStartTime(),value.getEndTime(),value.getColor(),value.getNotes());
}
/**
 * Initialises each section and displays the starting section
 * @param fromFile contents of .json save file
 */
export function init(fromFile: string): void {
  DayWrapper.init(fromFile);
  Selector.init(dateDisplay);
  dateDisplay();
}

/**
 * Function to be called when the events have been edited
 */
export function eventChanged(): void {
  // console.log("Calendar events have changed, updating CalDay");
  DayWrapper.extractFromHTML();
}
/**
 * Function to be called when the events have been pasted
 */
export function eventPasted(): void {
  console.log("Calendar event has been pasted, updating CalDay");
  DayWrapper.innitDay();
}

/**
 * Function to be called when the selected day in the text box has been changed
 */
export function selectedDayChanged(): void {
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

export function refresh():void{
  dateDisplay();
}
//* Private

/**
 * Displays the events for the selected day
 */
function dateDisplay(): void {
  const selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);

  scrollToFirstElementWithClassNames([ClassName.event, ClassName.selected]);
}

