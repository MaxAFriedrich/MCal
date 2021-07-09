// TODO: Change names so more representative?
export enum ClassName {
  none,
  selected,
  today,
  otherMonth,
  monthDisplay,
  daysRow,
  event,
  delete,
  previewMD,
  settings
}

//* Add class name
/**
 * Adds class name to a given element
 * @param className to add to element
 * @param element to be given className
 */
export function addClassNameToElement(className: ClassName, element: HTMLElement): void {
	if (element.className != "")
		element.className += " ";
	element.className += getClassNameString(className)
}

/**
 * Adds list of class names to a given element
 * @param classNames to add to element
 * @param element to be given class names
 */
export function addClassNamesToElement(classNames: ClassName[], element: HTMLElement): void {
	if (element.className != "")
		element.className += " ";
	element.className += convertClassNamesToString(classNames);
}

/**
 * Adds a given element to one that is already on the document
 * @param className of elements to be searched through
 * @param elem element that should be added
 * @param index of the element you are wanting to append to
 */
export function appendChildToElementWithClassNames(classNames: ClassName[], elem: HTMLElement, index: number): void {
  document.getElementsByClassName(convertClassNamesToString(classNames))[index].appendChild(elem);
}

/**
 * Removes a class name from elements with given set of class names
 * @param classNames of the elements to remove class name from
 * @param classNameToRemove
 * @param index optional to determine a specific element in the list
 */
export function removeClassNameFromElementsWith(classNames: ClassName[], classNameToRemove: ClassName, index: number = -1): void {
  var elements = document.getElementsByClassName(convertClassNamesToString(classNames));
  if (index == -1) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(getClassNameString(classNameToRemove));
    }
  } else {
    elements[index].classList.remove(getClassNameString(classNameToRemove));
  }
}

/**
 * Adds a class name to element/s with given set of class names
 * @param classNames of elements to search through
 * @param classNameToAdd
 * @param index optional to determine specific element in list of elements with that class name
 */
export function addClassNameToElementWith(classNames: ClassName[], classNameToAdd: ClassName, index: number = -1): void {
  var elements = document.getElementsByClassName(convertClassNamesToString(classNames));
  if (index == -1) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add(getClassNameString(classNameToAdd));
    }
  } else {
    elements[index].classList.add(getClassNameString(classNameToAdd));
  }
}

/**
 * Removes all the elements with given class name and follows given rules
 * @param className of the elements to remove
 * @param condition function that returns a boolean with true meaning it should be removed
 */
export function removeAllElementWithClassNamesIf(className: ClassName, condition: (elem: Element) => boolean) {
  var elems = document.querySelectorAll('.' + getClassNameString(className));
  elems.forEach((elem: Element) => {
    if (condition(elem)) {
      elem.remove();
    }
  });

}

/**
 *
 * @param className of the class name to check against Element
 * @param elem element to check
 * @returns a boolean, with true meaning it contains that class name
 */
export function doesElementHaveClassName(className: ClassName, elem: Element): boolean {
  return elem.classList.contains(getClassNameString(className));
}

/**
 *
 * @param className of the elements to change
 * @param onclick void function to set the onclick function to
 * @param index optional, determining specific element
 */
export function changeOnClickFuncOfElementWithClassNames(className: ClassName, onclick: () => void, index: number = -1) {
  var elements = document.querySelectorAll<HTMLElement>('.' + getClassNameString(className));
  if (index == -1) {
    elements.forEach((elem) => elem.onclick = onclick);
  } else {
    elements[index].onclick = onclick;
  }
}

/**
 * Scrolls to the first element with the given class names
 * @param classNames of the element to scroll to
 */
export function scrollToFirstElementWithClassNames(classNames: ClassName[]) {
  var elements = document.getElementsByClassName(convertClassNamesToString(classNames));
  if (elements.length > 0) {
    elements[0].scrollIntoView();
  }
}

//* Private

/**
 *
 * @param className of the class to be turned to a string
 * @returns string variant of the class name
 */
function getClassNameString(className: ClassName): string {
  var output: string;

  switch (className) {
    case ClassName.today: {
      output = "today";
      break;
    }
    case ClassName.selected: {
      output = "selected";
      break;
    }
    case ClassName.otherMonth: {
      output = "otherMonth";
      break;
    }
    case ClassName.daysRow: {
      output = "daysRow";
      break;
    }
    case ClassName.monthDisplay: {
      output = "monthDisplay";
      break;
    }
    case ClassName.event: {
      output = "event";
      break;
    }
    case ClassName.delete: {
      output = "delete";
      break;
    }
    case ClassName.previewMD: {
      output = "previewMD";
      break;
    }
    case ClassName.settings: {
      output = "settings";
      break;
    }
    case ClassName.none: {
      output = "";
      break;
    }
    default: {
      console.log("Unknown class name used!");
      output = "";
      break;
    }
  }

  return output;
}

/**
 *
 * @param classNames list of class names to be turned into string so it can be added to object class name
 * @returns string variant to be added to the class name of an object
 */
function convertClassNamesToString(classNames: ClassName[]): string {
  var output = "";
  for (var name of classNames) {
    output += getClassNameString(name) + " ";
  }

  return output.slice(0, -1);
}