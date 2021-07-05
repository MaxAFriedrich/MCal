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

export function addClassNameToElement(className: ClassName, element: HTMLElement): void {
	if (element.className != "")
		element.className += " ";
	element.className += getClassNameString(className)
}

export function addClassNamesToElement(classNames: ClassName[], element: HTMLElement): void {
	if (element.className != "")
		element.className += " ";
	element.className += convertClassNamesToString(classNames);
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