import { ElementID } from "./elementID";

// TODO: Change names so more representative?
export enum ClassName {
  none = "",
  selected = "selected",
  today = "today",
  otherMonth = "otherMonth",
  monthDisplay = "monthDisplay",
  daysRow = "daysRow",
  event = "event",
  previewMD = "previewMD",
  settings = "settings",
  search = "search",
  resultDay = "resultDay",
  twirlExpand = "twirlExpand",
  twirlContract = "twirlContract",
  expandDiv = "expandDiv",
  eventExpandChildren = "eventExpandChildren",
  pasteCancel = "pasteCancel",
  pasteEvent = "pasteEvent",
  repeatBox = "repeatBox",
  repeatEvery = "repeatEvery",
  repeatAdd = "repeatAdd",
  repeatFor = "repeatFor",
  sync = "syncBtn",
  themeBtnDark = "themeBtnDark",
  themeBtnLight = "themeBtnLight",
  cloudAPISettings = "cloudAPISettings",
  cloudAPIBtns = "cloudAPIBtns",
  cloudAPIInputs = "cloudAPIInputs",
}

//* Add class name
/**
 * Adds class name to a given element
 * @param className to add to element
 * @param element to be given className
 */
export function addClassNameToElement(
  className: ClassName,
  element: HTMLElement
): void {
  if (element.className != "") element.className += " ";
  element.className += className;
}

/**
 * Adds list of class names to a given element
 * @param classNames to add to element
 * @param element to be given class names
 */
export function addClassNamesToElement(
  classNames: ClassName[],
  element: HTMLElement
): void {
  if (element.className != "") element.className += " ";
  element.className += convertClassNamesToString(classNames);
}

/**
 * Adds a class name to element/s with given set of class names
 * @param classNames of elements to search through
 * @param classNameToAdd
 * @param index optional to determine specific element in list of elements with that class name
 */
export function addClassNameToElementWith(
  classNames: ClassName[],
  classNameToAdd: ClassName,
  index = -1
): void {
  const elements = document.getElementsByClassName(
    convertClassNamesToString(classNames)
  );
  if (index == -1) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(classNameToAdd);
    }
  } else {
    elements[index].classList.add(classNameToAdd);
  }
}

//* Removing class name
/**
 * Removes a class name from elements with given set of class names
 * @param classNames of the elements to remove class name from
 * @param classNameToRemove
 * @param index optional to determine a specific element in the list
 */
export function removeClassNameFromElementsWith(
  classNames: ClassName[],
  classNameToRemove: ClassName,
  index = -1
): void {
  const elements = document.getElementsByClassName(
    convertClassNamesToString(classNames)
  );
  if (index == -1) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(classNameToRemove);
    }
  } else {
    elements[index].classList.remove(classNameToRemove);
  }
}

/**
 * Removes all the elements with given class name and follows given rules
 * @param className of the elements to remove
 * @param condition function that returns a boolean with true meaning it should be removed
 */
export function removeAllElementWithClassNamesIf(
  className: ClassName,
  condition: (elem: Element) => boolean
): void {
  const elems = document.querySelectorAll("." + className);
  elems.forEach((elem: Element) => {
    if (condition(elem)) {
      elem.remove();
    }
  });
}

//* Children
/**
 * Adds a given element to one that is already on the document
 * @param className of elements to be searched through
 * @param elem element that should be added
 * @param index of the element you are wanting to append to
 */
export function appendChildToElementWithClassNames(
  classNames: ClassName[],
  elem: HTMLElement,
  index: number
): void {
  document.getElementsByClassName(convertClassNamesToString(classNames))[index].appendChild(elem);
}

//* Checks
/**
 *
 * @param className of the class name to check against Element
 * @param elem element to check
 * @returns a boolean, with true meaning it contains that class name
 */
export function doesElementHaveClassName(
  className: ClassName,
  elem: Element
): boolean {
  return elem.classList.contains(className);
}

//* Others
/**
 *
 * @param className of the elements to change
 * @param onclick void function to set the onclick function to
 * @param index optional, determining specific element
 */
export function changeOnClickFuncOfElementWithClassNames(
  className: ClassName,
  onclick: () => void,
  index = -1
): void {
  const elements = document.querySelectorAll<HTMLElement>("." + className);
  if (index == -1) {
    elements.forEach((elem) => (elem.onclick = onclick));
  } else {
    elements[index].onclick = onclick;
  }
}

/**
 * Scrolls to the first element with the given class names
 * @param classNames of the element to scroll to
 */
export function scrollToFirstElementWithClassNames(
  classNames: ClassName[]
): void {
  const elements = document.getElementsByClassName(
    convertClassNamesToString(classNames)
  );
  if (elements.length > 0) {
    elements[0].scrollIntoView();
  }
}

/**
 * finds all divs with a class and returns the first
 * @param classToRemove ClassName of object to return
 * @returns first eliment with class
 */
export function getDivAsObject(classToRemove: ClassName): Element {
  const elements = document.getElementsByClassName(classToRemove);
  return elements[0];
}

/**
 * removes the first eliment with a class name
 * @param classToRemove ClassName of eliment to remove
 */
export function getDivAndRemove(classToRemove: ClassName): void {
  const elements = document.getElementsByClassName(classToRemove);
  elements[0].parentNode.removeChild(elements[0]);
}

/**
 * chanege the twirl icon
 * @param show true=expand false=contract
 * @param index index of event
 */
export function twirlChange(show: boolean, index: number): void {
  if (show == true) {
    document.querySelectorAll('[id=' + ElementID.twirlButton + ']')[index].className = ClassName.twirlExpand;

  }
  else {
    document.querySelectorAll('[id=' + ElementID.twirlButton + ']')[index].className = ClassName.twirlContract;

  }
}

/**
 * changes or adds styling to div by ClassName
 * @param className ClassName of object to restyle
 * @param index index of object with classname to restyle
 * @param property property to set
 */
export function setStyleByClass(className: string, index: number, property: string): void {
  document.getElementsByClassName(className)[index].setAttribute("style", property)
}

/**
 * return the values of all the inputs with a spesific ClassName and input type
 * @param type type string
 * @param name ClassName of inputs
 * @returns all the eliments with the set ClassName and type
 */
export function scrapeByInputType(type: string, name: ClassName): string[] {
  const classtoScrape = document.getElementsByClassName(name);
  const out = [];
  for (let i = 0; i < classtoScrape.length; i++) {
    const elm = classtoScrape[i] as HTMLInputElement;
    out.push(elm.value);
  }
  return out;
}

//* Private
/**
 *
 * @param classNames list of class names to be turned into string so it can be added to object class name
 * @returns string variant to be added to the class name of an object
 */
function convertClassNamesToString(classNames: ClassName[]): string {
  let output = "";
  for (const name of classNames) {
    output += name + " ";
  }

  return output.slice(0, -1);
}

