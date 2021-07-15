import * as Creation from "./creation";

export { Creation };

// TODO: Unify elementID.ts and guiElement.ts (as they both use IDs)
//* define DOM for each of the main eliments
const day = document.getElementById("day-wrapper");
const select = document.getElementById("select-wrapper");
const date = <HTMLInputElement>document.getElementById("date-selector-box");
const note = document.getElementById("notes-wrapper");
const body = document.getElementById("body-wrapper");
const menu = document.getElementById("menu-wrapper");
const cal = document.getElementById("date-selector-cal");

export enum GUIElement {
  day,
  select,
  date,
  note,
  body,
  cal,
  menu,
}

//* Getters and Setters
/**
 *
 * @returns HTML string
 */
export function getHTML(element: GUIElement): string {
  return enumToElement(element).innerHTML;
}
/**
 *
 * @returns HTML text
 */
export function getText(element: GUIElement): string {
  return enumToElement(element).innerText;
}

/**
 *
 * @param setter HTML string
 */
export function setHTML(element: GUIElement, setter: string): void {
  enumToElement(element).innerHTML = setter;
}

/**
 * Sets an attribute to the given element
 * @param element to be given an attribute
 * @param qualifiedName name of the attribute
 * @param value value to set to the attribute
 */
export function setElementAttribute(
  element: GUIElement,
  qualifiedName: string,
  value: string
): void {
  enumToElement(element).setAttribute(qualifiedName, value);
}

/**
 * Gets and returns the value of an attribute
 * @param element to get attribute from
 * @param attributeName the name of the attribute to get
 * @returns the attribute value attached to the name given
 */
export function getAttributeFromElement(
  element: GUIElement,
  attributeName: string
): string {
  return enumToElement(element).getAttribute(attributeName);
}

//* Children
/**
 * Removes all children from HTML
 * @param element with children to be removed
 */
export function removeAllChildren(element: GUIElement): void {
  enumToElement(element).innerHTML = "";
}

/**
 * Adds child to given element
 * @param element to add child to
 * @param child to be added to element
 */
export function appendChildToElement(
  element: GUIElement,
  child: HTMLElement
): void {
  enumToElement(element).appendChild(child);
}

/**
 * Adds child to the beginning of the element child list
 * @param element to add child to
 * @param child to be added
 */
export function appendChildToBeginningOfElement(
  element: GUIElement,
  child: HTMLElement
): void {
  const elem = enumToElement(element);
  elem.insertBefore(child, elem.firstChild);
}

//* Specific element functions
/**
 * Change the date picker to a given table
 * @param table
 */
export function setDatePicker(table: HTMLTableElement): void {
  if (cal.hasChildNodes()) {
    // For flicking between months
    cal.replaceChild(table, cal.childNodes[0]);
  } else {
    // For creating the calendar when they first click the icon
    cal.appendChild(table);
  }
}

/**
 * change the contents of the body
 * @param newBody new body as HTML string
 * @returns the old body as HTML string
 */
export function changeBody(newBody: string): string {
  const oldBody: string = body.innerHTML;
  body.innerHTML = newBody;

  return oldBody;
}

/**
 * change editability of content editable
 * @param state bool to set content editable to
 * @param obj what to set, string
 */
export function setContEdit(state: boolean, obj: string): void {
  if (state) {
    if (obj == "note") {
      note.contentEditable = "true";
    }
  } else {
    if (obj == "note") {
      note.contentEditable = "false";
    }
  }
}

/**
 *
 * @returns the value inputted into the date selector text box
 */
export function getDateSelectorBoxValue(): string {
  return date.value;
}

//* Event listener

/**
 * Adds an event listener to a given object
 * @param element to add event listener to
 * @param type of event listener
 * @param listener function that should be called when that event happens
 */
export function addElementEventListener(
  element: GUIElement,
  type: string,
  listener: () => void
): void {
  enumToElement(element).addEventListener(type, listener);
}

export function triggerEvent(element: GUIElement, eventName: string): void {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, true, true);
  // event.eventName = eventName;
  enumToElement(element).dispatchEvent(event);
}

//* Private functions
/**
 * @param GUIElement
 * @returns HTMLElement that enum refers to
 */
function enumToElement(element: GUIElement): HTMLElement {
  let returnElem: HTMLElement;
  switch (element) {
    case GUIElement.day: {
      returnElem = day;
      break;
    }
    case GUIElement.select: {
      returnElem = select;
      break;
    }
    case GUIElement.date: {
      returnElem = date;
      break;
    }
    case GUIElement.note: {
      returnElem = note;
      break;
    }
    case GUIElement.cal: {
      returnElem = cal;
      break;
    }
    case GUIElement.menu: {
      returnElem = menu;
      break;
    }
    default: {
      returnElem = body;
      break;
    }
  }

  return returnElem;
}

