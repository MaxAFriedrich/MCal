import * as Creation from "./creation"

export { Creation }
//* define DOM for each of the main eliments
var day = document.getElementById("day-wrapper");
var select = document.getElementById("select-wrapper");
var date = document.getElementById("date-selector-box");
var note = document.getElementById("notes-wrapper");
var body = document.getElementById("body-wrapper");
var cal = document.getElementById("day_picker");
var menu = document.getElementById("menu-wrapper");
var cal = document.getElementById("date-selector-cal");

export enum GUIElement {
  day,
  select,
  date,
  note,
  body,
  cal,
  menu
}

//* Getters and Setters
/**
 *
 * @returns HTML string
 */
export function getHTML(element : GUIElement): string {
  return enumToElement(element).innerHTML;
}
/**
 *
 * @returns HTML text
 */
export function getText(element : GUIElement): string {
  return enumToElement(element).innerText;
}

/**
 *
 * @param setter HTML string
 */
export function setHTML(element : GUIElement, setter : string): void {
  enumToElement(element).innerHTML = setter;
}

/**
 * Sets an attribute to the given element
 * @param element to be given an attribute
 * @param qualifiedName name of the attribute
 * @param value value to set to the attribute
 */
export function setElementAttribute(element: GUIElement, qualifiedName: string, value: string): void {
  enumToElement(element).setAttribute(qualifiedName, value);
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
export function appendChildToElement(element: GUIElement, child: HTMLElement) {
  enumToElement(element).appendChild(child);
}

/**
 * Adds child to the beginning of the element child list
 * @param element to add child to
 * @param child to be added
 */
export function appendChildToBeginningOfElement(element: GUIElement, child: HTMLElement) {
  var elem = enumToElement(element);
  elem.insertBefore(child, elem.firstChild);
}

//* Specific element functions
/**
 * Change the date picker to a given table
 * @param table
 */
export function setDatePicker(table : HTMLTableElement): void {
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
export function changeBody(newBody : string): string {
  var oldBody: string = body.innerHTML;
  body.innerHTML = newBody;

  return oldBody;
}

/**
 * change editability of content editable
 * @param state bool to set content editable to
 * @param obj what to set, string
 */
export function setContEdit(state : boolean, obj : string) {
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

//* Event listener

/**
 * Adds an event listener to a given object
 * @param element to add event listener to
 * @param type of event listener
 * @param listener function that should be called when that event happens
 */
export function addElementEventListener(element : GUIElement, type : string, listener : () => void) {
  enumToElement(element).addEventListener(type, listener);
}

//* Private functions
/**
 * @param GUIElement
 * @returns HTMLElement that enum refers to
 */
function enumToElement(element : GUIElement): HTMLElement {
  var returnElem: HTMLElement;
  switch (element) {
    case GUIElement.day:
      {
        returnElem = day;
        break;
      }
    case GUIElement.select:
      {
        returnElem = select;
        break;
      }
    case GUIElement.date:
      {
        returnElem = date;
        break;
      }
    case GUIElement.note:
      {
        returnElem = note;
        break;
      }
    case GUIElement.cal:
      {
        returnElem = cal;
        break;
      }
    case GUIElement.menu:
      {
        returnElem = menu;
        break;
      }
    default:
      {
        returnElem = body;
        break;
      }
  }

  return returnElem;
}