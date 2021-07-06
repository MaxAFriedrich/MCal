import { ClassName, addClassNamesToElement } from "./className";
import { ElementID, setElementID } from "./elementID";

export { ClassName, ElementID }

/**
 * Creates and returns HTMLInputElement
 * @param type of input
 * @param value of object
 * @param classNames list of class names to give the object
 * @param disabled boolean to say if it disabled (default: false)
 * @param size max character limit (default: 20)
 * @param idName id of object
 * @returns
 */
export function createInput(type : string, value : string, classNames : ClassName[], disabled : boolean = false, size : number = 20, id: ElementID = ElementID.none): HTMLInputElement {
  var inp = document.createElement("input");
	inp.type = type;
  addClassNamesToElement(classNames, inp);
	inp.value = value;
  inp.disabled = disabled;
  inp.size = size;
  setElementID(id, inp);

  return inp;
}

/**
 * Creates and returns HTMLInputElement which is a Button
 * @param label of the button
 * @param onclick function to be called when button clicked
 * @param classNames list of class names to be added to the button
 * @param idName id of the button
 * @returns HTML Button Object
 */
export function createButton(label: string, onclick: Function, classNames: ClassName[], id: ElementID = ElementID.none): HTMLInputElement {
  var b = createInput("button", label, classNames, false, 20, id);
	b.onclick = () => { onclick(); };
  return b;
}

/**
 * Creates and returns HTML Table Element
 * @returns HTML Table element
 */
export function createTable(): HTMLTableElement {
  return document.createElement("table");
}

/**
 * Creates and returns HTML Div Element
 * @param classNames list of class names that div should be given
 * @returns HTMLDivElement
 */
export function createDiv(classNames: ClassName[], onclick: () => void = null): HTMLDivElement {
  var div = document.createElement("div");
  addClassNamesToElement(classNames, div);
  if (onclick != null) {
    div.onclick = onclick;
  }

  return div;
}

/**
 * Creates and returns HTML Span Element
 * @param id of the span
 * @param placeholder of the span
 * @param contentEditable boolean of whether the content can be edited
 * @param spellCheck whether spelling should be checked
 * @param innerHTML inner HTML of the object (default: "")
 * @param onBlurFunc (default: empty function)
 * @returns HTML Span Element
 */
export function createSpan(id: ElementID, placeholder : string, contentEditable : string, spellCheck : boolean, innerHTML : string = "", onBlurFunc : () => void = () => {}): HTMLSpanElement {
  var span = document.createElement("span");
  span.contentEditable = contentEditable;
  setElementID(id, span);
  span.spellcheck = spellCheck;
  span.innerHTML = innerHTML;
  span.onblur = onBlurFunc;

  span.setAttribute("placeholder", placeholder);

  return span;
}
