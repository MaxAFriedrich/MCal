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
  previewMD
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
 * @param index of the element you are wanting to append to
 * @param elem element that should be added
 */
export function appendChildToElementWithClassName(className: ClassName, index: number, elem: HTMLElement): void {
  document.getElementsByClassName(getClassNameString(className))[index].appendChild(elem);
}

/**
 * Removes a class name from elements with given set of class names
 * @param classNames of the elements to remove class name from
 * @param classNameToRemove
 * @param index optional to determine a specific element in the list
 */
export function removeClassNameFromElementsWith(classNames: ClassName[], classNameToRemove: ClassName, index: number = null): void {
  var elements = document.getElementsByClassName(convertClassNamesToString(classNames));
  if (index == null) {
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
export function addClassNameToElementWith(classNames: ClassName[], classNameToAdd: ClassName, index: number = null): void {
  var elements = document.getElementsByClassName(convertClassNamesToString(classNames));
  if (index == null) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add(getClassNameString(classNameToAdd));
    }
  } else {
    elements[index].classList.add(getClassNameString(classNameToAdd));
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