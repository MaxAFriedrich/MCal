//* define DOM for each of the main eliments
var day = document.getElementById("day-wrapper");
var select = document.getElementById("select-wrapper");
var date = document.getElementById("start_dt");
var note = document.getElementById("notes-wrapper");
var body = document.getElementById("body-wrapper");
var cal = document.getElementById("day_picker");
var menu = document.getElementById("menu-wrapper");

export enum DOMElement {
  day,
  select,
  date,
  note,
  body,
  cal,
  menu
}
//* getters and setters

//day

/**
 * @param DOMElement
 * @returns HTMLElement that enum refers to
 */
function enumToElement(element : DOMElement): HTMLElement {
  var returnElem: HTMLElement;
  switch (element) {
    case DOMElement.day:
      {
        returnElem = day;
        break;
      }
    case DOMElement.select:
      {
        returnElem = select;
        break;
      }
    case DOMElement.date:
      {
        returnElem = date;
        break;
      }
    case DOMElement.note:
      {
        returnElem = note;
        break;
      }
    case DOMElement.cal:
      {
        returnElem = cal;
        break;
      }
    case DOMElement.menu:
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

/**
 *
 * @returns HTML string
 */
export function getHTML(element : DOMElement): string {
  return enumToElement(element).innerHTML;
}
/**
 *
 * @returns HTML text
 */
export function getText(element : DOMElement): string {
  return enumToElement(element).innerText;
}

/**
 *
 * @param setter HTML string
 */
export function setHTML(element : DOMElement, setter : string): void {
  enumToElement(element).innerHTML = setter;
}

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
 * Sets nodeValue of element
 * @param element to set value to
 * @param value to set to the element
 */
export function setElementValue(element : DOMElement, value : string): void {
  enumToElement(element).nodeValue = value;
}

export function removeAllChildren(element : DOMElement): void {
  enumToElement(element).innerHTML = "";
}

//*add event listener
export function addElementEventListener(element : DOMElement, type : string, listener : () => void) {
  enumToElement(element).addEventListener(type, listener);
}

export function appendChildToElement(element : DOMElement, child : HTMLElement) {
  enumToElement(element).appendChild(child);
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
export function createInput(type : string, value : string, className : string, disabled : boolean = false, size : number = 20, idName? : string): HTMLInputElement {
  var inp = document.createElement("input");
  inp.type = type;
  inp.className = className;
  inp.value = value;
  inp.disabled = disabled;
  inp.size = size;
  inp.id=idName;

  return inp;
}

export function createButton(label : string, onclick : Function, className : string, idName? : string): HTMLInputElement {
  var b = createInput("button", label, className,false,20,idName);
  b.onclick = () => {
    onclick();
  };

  return b;
}

export function createTable(): HTMLTableElement {
  return document.createElement("table");
}

export function createDiv(className : string): HTMLDivElement {
  var div = document.createElement("div");
  div.className = className;

  return div;
}

export function createSpan(id : string, placeholder : string, contentEditable : string, spellCheck : boolean, innerHTML : string = "", onBlurFunc : () => void = () => {}): HTMLSpanElement {
  var span = document.createElement("span");
  span.contentEditable = contentEditable;
  span.id = id;
  span.spellcheck = spellCheck;
  span.innerHTML = innerHTML;
  span.onblur = onBlurFunc;

  span.setAttribute("placeholder", placeholder);

  return span;
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
