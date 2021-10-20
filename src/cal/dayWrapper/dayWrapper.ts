import { GUIElement } from "../../gui/guiElement";
import { triggerEvent } from "../../gui/guiElement";
import { addCommandKey, CommandKey, PressType } from "../../input/input";
import { CalDay } from "./calDay";
import { CalEvent } from "./calEvent";

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

//["Mins","Hrs","Days","Mnths","Yrs"]
//  YYYY-MM-DDTHH:mm:ss. sssZ
//60, 3600, 86400, 2629746, 31556952

export function repeatEventMaker(paramEvery: string[], paramFor: string[], localEventObj: CalEvent): void {
  const localEvery: number[] = [];
  const localFor: number[] = [];

  for (let i = 0; i < 5; i++) {
    if (paramEvery[i] == "") {
      localEvery[i] = 0;
    }
    else {
      localEvery[i] = parseInt(paramEvery[i]);
    }
  }
  for (let i = 0; i < 5; i++) {
    if (paramFor[i] == "") {
      localFor[i] = 0;
    }
    else {
      localFor[i] = parseInt(paramFor[i]);
    }
  }

  const tempDate = new Date(days[selectedIndex].getDate().toISOString())
  let hrs;
  const eventA = localEventObj.getStartTime().split(":");
  hrs = parseInt(eventA[0]);
  if (eventA[1].toLowerCase().includes("pm") && eventA[0] != "12") {
    hrs += 12;
  }
  const mins = parseInt(eventA[1]);
  tempDate.setHours(hrs);
  tempDate.setMinutes(mins);
  tempDate.setSeconds(0);
  tempDate.setMilliseconds(0);

  let unixTemp: number;
  unixTemp = tempDate.valueOf() / 1000;

  let unixFor = 0;
  unixFor += localFor[0] * 60;
  unixFor += localFor[1] * 3600;
  unixFor += localFor[2] * 86400;
  unixFor += localFor[3] * 2629746;
  unixFor += localFor[4] * 31556952;

  let unixEvery = 0;
  unixEvery += localEvery[0] * 60;
  unixEvery += localEvery[1] * 3600;
  unixEvery += localEvery[2] * 86400;
  unixEvery += localEvery[3] * 2629746;
  unixEvery += localEvery[4] * 31556952;


  const unixTarget = unixTemp + unixFor;
  let tempIndex: number;
  unixTemp += unixEvery;
  while (unixTarget > unixTemp) {
    unixTemp += unixEvery;
    const tempObj = new Date(unixTemp * 1000);
    tempIndex = selectedIndex;
    if (days[tempIndex].getDate().getDate() != tempObj.getDate() && days[tempIndex].getDate().getMonth() != tempObj.getMonth() && days[tempIndex].getDate().getFullYear() != tempObj.getFullYear()) {
      //find the day with tehcorrect date and then set index acrodinly, initialise new day if aproraopraite
      let x = false;
      for (let i = 0; i < days.length; i++) {
        if (days[i].getDate().getDate() == tempObj.getDate() && days[i].getDate().getMonth() == tempObj.getMonth() && days[i].getDate().getFullYear() == tempObj.getFullYear()) {
          tempIndex = i;
          x = true;
          break;
        }
      }
      if (!x) {
        tempIndex = days.push(new CalDay(tempObj)) - 1;
      }
    }
    // set the date of the event and then add it to the day
    console.log("-----------------------------\n Intent: " + tempObj.toISOString() + "\nAcutual: " + days[tempIndex].getDate().toISOString() + "\n-----------------------------");
    days[tempIndex].pushNewEvent(new CalEvent(localEventObj.getDescription(), ("0" + tempObj.getHours().toString()).slice(-2) + ":" + ("0" + tempObj.getMinutes().toString()).slice(-2), localEventObj.getEndTime(), localEventObj.getColor(), localEventObj.getNotes()));
  }
  if (tempIndex == selectedIndex) {
    days[selectedIndex].render();
  }
  triggerEvent(GUIElement.day, "pasted");
}