//* define DOM for each of the main eliments
var day = document.getElementById("day-wrapper");
var select = document.getElementById("select-wrapper");
var date = document.getElementById("start_dt");
var note = document.getElementById("notes-wrapper");
var body = document.getElementById("body-wrapper");

export enum DOMElement {
  day,
  select,
  date,
  note,
  body
}
//* getters and setters

//day

/**
 * @param DOMElement
 * @returns HTMLElement that enum refers to
 */
function enumToElement(element: DOMElement): HTMLElement {
  var returnElem: HTMLElement;
  switch (element) {
    case DOMElement.day: {
      returnElem = day;
      break;
    }
    case DOMElement.select: {
      returnElem = select;
      break;
    }
    case DOMElement.date: {
      returnElem = date;
      break;
    }
    case DOMElement.note: {
      returnElem = note;
      break;
    }
    default: {
      returnElem = body;
      break;
    }
  }

  return returnElem;
}

/**
 *
 * @returns HTML string
 */
export function getHTML(element: DOMElement): string {
  return enumToElement(element).innerHTML;
}

/**
 *
 * @param setter HTML string
 */
export function setHTML(element: DOMElement, setter: string): void {
  enumToElement(element).innerHTML = setter;
}

/**
 * Change the date picker to a given table
 * @param table
 */
export function setDatePicker(table: HTMLTableElement): void {
  if (select.hasChildNodes()) {
    // For flicking between months
    select.replaceChild(table, select.childNodes[0]);
  } else {
    // For creating the calendar when they first click the icon
    select.appendChild(table);
  }
}

//*add event listener
export function addElementEventListener(element: DOMElement, type: string, listener: () => void) {
  enumToElement(element).addEventListener(type, listener);
}

//*change body

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

//* Creation
export function createInput(type: string, value: string, className: string, disabled: boolean = false, size: number = 20): HTMLInputElement {
	var inp = document.createElement("input");
	inp.type = type;
	inp.className = className;
	inp.value = value;
  inp.disabled = disabled;
  inp.size = size;

  return inp;
}

export function createButton(label: string, onclick: Function, className: string): HTMLInputElement {
  var b = createInput("button", label, className);
	b.onclick = () => { onclick(); };

	return b;
}

export function createTable(): HTMLTableElement {
  return document.createElement("table");
}
