
export enum ElementID {
	none,
	eventStartTime,
	eventEndTime,
	eventContents,
	previewMD
}

export function setElementID(id: ElementID, elem: HTMLElement): void {
	elem.id = getIDString(id);
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