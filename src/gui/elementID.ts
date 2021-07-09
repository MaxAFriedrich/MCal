
export enum ElementID {
	none = "",
	eventStartTime = "startTime",
	eventEndTime = "endTime",
	eventDeleteButton = "delete",
	eventContents = "contents",
	previewMD = "previewMD",
}

/**
 * Gives a given element an id
 * @param id to be set to the element
 * @param elem element to be given the id
 */
export function setElementID(id: ElementID, elem: HTMLElement): void {
	elem.id = id;
}

/**
 * Focuses an element with a given ID and
 * @param id of the elements
 * @param index of the element in the list of elements with that id to be focused
 */
export function focusHTMLElementFromIDList(id: ElementID, index: number): void {
	document.querySelectorAll<HTMLElement>('#' + id)[index].focus();
}

/**
 * Returns a list of all the inner HTML inside each element
 * @param id of the elements to get the inner HTML
 * @returns a list of the innerHTML of the elements with ID given
 */
export function getAllInnerHTMLFrom(id: ElementID): string[] {
	var elements = document.querySelectorAll<HTMLElement>('#' + id);
	var output: string[] = [];
	elements.forEach((elem) => {
		output.push(elem.innerHTML);
	});

	return output;
}

/**
 * Sets an attribute to element with given id
 * @param id of the element to add the attribute to
 * @param attributeName
 * @param attributeValue
 */
export function addAttributeToElementWithID(id: ElementID, attributeName: string, attributeValue: string): void {
	document.getElementById(id).setAttribute(attributeName, attributeValue);
}

/**
 * Removes all the elements with given class name and follows given rules
 * @param id of the elements to remove
 * @param condition function that returns a boolean with true meaning it should be removed
 */
export function removeAllElementWithIDIf(id: ElementID, condition: (elem: Element) => boolean) {
  var elems = document.querySelectorAll('#' + id);
  elems.forEach((elem: Element) => {
    if (condition(elem)) {
      elem.remove();
    }
  });
}

/**
 *
 * @returns object storing index and class names of the focused element
 */
export function getIndexAndIDOfFocusedElement(): { index: number, id: ElementID } {
  var element = document.activeElement;
	if (element.id != "") {
		var elementsWithID = document.querySelectorAll("#" + element.id);

		var index = -1;
		for (var i = 0; i < elementsWithID.length; i++) {
			if (elementsWithID[i] === element) {
				index = i;
				break;
			}
		}

		const maybeID = element.id as ElementID;
		var id: ElementID = maybeID == null ? ElementID.none : maybeID;

		return { index: index, id: id };
	}
	return { index: -1, id: ElementID.none };
}