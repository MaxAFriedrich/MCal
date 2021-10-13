import { addCommandKey, CommandKey, PressType } from "../../input/input";
import { CalDay } from "./calDay";

export let days: CalDay[];
let selectedIndex: number;
let currentUnitialisedDay: CalDay;

/**
 * Function that initialises the module variables
 * @param fromFile should be string from the save file to initialise the variables
 */
export function init(fromFile: string): void {
  days = getCalFromFileContents(fromFile);
  selectedIndex = -1;
  currentUnitialisedDay = null;

  addCommandKey([CommandKey.ctrl], "ArrowUp", () => {
    changeSelectedEventBy(-1);
  });
  addCommandKey([CommandKey.ctrl], "ArrowDown", () => {
    changeSelectedEventBy(1);
  });
  addCommandKey([CommandKey.ctrl], "ArrowLeft", moveFocusLeft);
  addCommandKey([CommandKey.ctrl], "ArrowRight", moveFocusRight);
  addCommandKey([CommandKey.ctrl], "d", deleteSelectedEvent);
  addCommandKey([], "Tab", focusShifted, PressType.up);
}

/**
 * Displays events for the current day
 * @param selected date to display
 */
export function display(selected: Date): void {
  console.log("Displaying events for " + selected.toDateString());
  // Implement binomial search
  selectedIndex = days.findIndex(
    (day) => day.getDate().toDateString() == selected.toDateString()
  );
  if (selectedIndex == -1) {
    // Render empty day
    currentUnitialisedDay = new CalDay(new Date(selected));
    currentUnitialisedDay.render();
  } else {
    days[selectedIndex].render();
    currentUnitialisedDay = null;
  }
}

/**
 * Extracts information from HTML and saves it into the data structure (but not to a file)
 */
export function extractFromHTML(): void {
  if (selectedIndex == -1) {
    if (currentUnitialisedDay == null) {
      console.log("ERROR: events has not been displayed for this day yet");
    } else {
      selectedIndex = addDay(currentUnitialisedDay);
    }
  }
  days[selectedIndex].extractFromHTML();
}
/**
 * innits new days if necessary and saves it into the data structure (but not to a file)
 */
export function innitDay(): void {
  if (selectedIndex == -1) {
    if (currentUnitialisedDay == null) {
      console.log("ERROR: events has not been displayed for this day yet");
    } else {
      selectedIndex = addDay(currentUnitialisedDay);
    }
  }
}

/**
 *
 * @returns string to be saved to the file
 */
export function getFileSaveString(): string {
  console.log(days);
  return JSON.stringify(days);
}

/**
 * Updates the selected element when the focus has been changed
 */
export function focusShifted(): void {
  if (selectedIndex != -1) {
    days[selectedIndex].getSelectedEventFromFocusedBox();
  }
}

//* Private

/**
 *
 * @param changeBy number to change selected index by
 */
function changeSelectedEventBy(changeBy: number): void {
  if (selectedIndex != -1) {
    days[selectedIndex].changeSelectedEventBy(changeBy);
  }
}

/**
 * Adds day to days array and returns index it was added at
 * @param day to add to the array
 * @returns index where the day was added to
 */
function addDay(day: CalDay): number {
  // TODO: Add binomial search to make sure days are sorted
  days.push(day);
  return days.length - 1;
}

/**
 * Converts JSON to CalDay[]
 * @param fromFile JSON string to be converted to CalDay[]
 * @returns CalDay[] created from the given string input
 */
function getCalFromFileContents(fromFile: string): CalDay[] {
  const file = JSON.parse(fromFile);
  const output: CalDay[] = [];

  for (const key in file) {
    output.push(CalDay.getDayFromJSON(JSON.stringify(file[key])));
  }

  return output;
}

/**
 * Deletes the selected event
 */
function deleteSelectedEvent(): void {
  if (selectedIndex != -1) {
    days[selectedIndex].deleteSelectedEvent();
  }
}

function moveFocusRight(): void {
  if (selectedIndex != -1) {
    days[selectedIndex].moveFocusRight();
  }
}

function moveFocusLeft(): void {
  if (selectedIndex != -1) {
    days[selectedIndex].moveFocusLeft();
  }
}

