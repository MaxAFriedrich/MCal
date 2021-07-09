
export enum ElementID {
	none,
	eventStartTime,
	eventEndTime,
	eventContents,
	previewMD
}

/**
 * Gives a given element an id
 * @param id to be set to the element
 * @param elem element to be given the id
 */
export function setElementID(id: ElementID, elem: HTMLElement): void {
	elem.id = getIDString(id);
}

/**
 * Focuses an element with a given ID and
 * @param id of the elements
 * @param index of the element in the list of elements with that id to be focused
 */
export function focusHTMLElementFromIDList(id: ElementID, index: number): void {
	document.querySelectorAll<HTMLElement>('#' + getIDString(id))[index].focus();
}

/**
 * Returns a list of all the inner HTML inside each element
 * @param id of the elements to get the inner HTML
 * @returns a list of the innerHTML of the elements with ID given
 */
export function getAllInnerHTMLFrom(id: ElementID): string[] {
	var elements = document.querySelectorAll<HTMLElement>('#' + getIDString(id));
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
	document.getElementById(getIDString(id)).setAttribute(attributeName, attributeValue);
}

//* Private

/**
 * Converts a given ID into a string
 * @param id of the element to convert
 * @returns string variant of the ID
 */
function getIDString(id: ElementID): string {
	var output: string;

	switch (id) {
		case ElementID.eventContents: {
			output = "contents";
			break;
		}
		case ElementID.eventStartTime: {
			output = "startTime";
			break;
		}
		case ElementID.eventEndTime: {
			output = "endTime";
			break;
		}
		case ElementID.previewMD: {
			output = "previewMD";
			break;
		}
		case ElementID.none: {
			output = "";
			break;
		}
		default: {
			console.log("Unknown element ID");
			output = "";
			break;
		}
	}

	return output;
}