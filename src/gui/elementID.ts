export enum ElementID {
  none = "",
  eventStartTime = "startTime",
  eventEndTime = "endTime",
  eventDeleteButton = "delete",
  eventContents = "contents",
  previewMD = "previewMD",
  settings = "settings",
  settingsContent = "settingsContent",
  search = "search",
  searchContent = "searchContent",
  searchField = "searchField",
  searchResults = "searchResults",
  modalWrapper = "modalSettings",
  twirlButton = "twirlButton",
  notesDiv = "notesDiv",
  repeatEvent = "repeatEvent",
  copyEvent = "copyEvent",
  colorPalet = "colorPalet",
  colorClick = "colorClick",
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
  document.querySelectorAll<HTMLElement>("#" + id)[index].focus();
}

/**
 * Returns a list of all the inner HTML inside each element
 * @param id of the elements to get the inner HTML
 * @returns a list of the innerHTML of the elements with ID given
 */
export function getAllInnerHTMLFrom(id: ElementID): string[] {
  const elements = document.querySelectorAll<HTMLElement>("#" + id);
  const output: string[] = [];
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
export function addAttributeToElementWithID(
  id: ElementID,
  attributeName: string,
  attributeValue: string
): void {
  document.getElementById(id).setAttribute(attributeName, attributeValue);
}

/**
 * Removes all the elements with given class name and follows given rules
 * @param id of the elements to remove
 * @param condition function that returns a boolean with true meaning it should be removed
 */
export function removeAllElementWithIDIf(
  id: ElementID,
  condition: (elem: Element) => boolean
): void {
  const elems = document.querySelectorAll("#" + id);
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
export function getIndexAndIDOfFocusedElement(): {
  index: number;
  id: ElementID;
} {
  const element = document.activeElement;
  if (element.id != "") {
    const elementsWithID = document.querySelectorAll("#" + element.id);

    let index = -1;
    for (let i = 0; i < elementsWithID.length; i++) {
      if (elementsWithID[i] === element) {
        index = i;
        break;
      }
    }

    const maybeID = element.id as ElementID;
    const id: ElementID = maybeID == null ? ElementID.none : maybeID;

    return { index: index, id: id };
  }
  return { index: -1, id: ElementID.none };
}

export function getIDOfFocusedElement(): ElementID {
  const element = document.activeElement;

  const maybeID = element.id as ElementID;
  const id: ElementID = maybeID == null ? ElementID.none : maybeID;

  return id;
}

/**
 * set display of settings pannel
 * @param value display or block
 */
export function settingsDisp(value: string): void {
  document.getElementById(ElementID.settingsContent).style.display = value;
}
/**
 * set disaply of search pannel
 * @param value display or block
 */
export function searchDisp(value: string): void {
  document.getElementById(ElementID.searchContent).style.display = value;
}

/**
 * Open the modal using DOM
 */
export function modalOpen(): void {
  document.getElementById(ElementID.modalWrapper).style.display = "block";
}

/**
 * Close the modal using DOM
 */
export function modalClose(): void {
  document.getElementById(ElementID.modalWrapper).style.display = "none";
}


/**
 * global bool for display of each modal
 */
let showSettings = true;
let showSearch = true;



/**
 * Function to either open or close the modal depending on above globals
 */
export function toggleSettings(): void {
  if (showSearch) {
    if (showSettings) {
      modalOpen();
      settingsDisp("block");
      searchDisp("none");
    } else {
      modalClose();
      settingsDisp("block");
      searchDisp("none");
    }
    showSettings = !showSettings;
  }
}


export function toggleSearch(): void {
  if (showSettings) {
    const searchField = document.getElementById(ElementID.searchField);
    if (showSearch) {
      settingsDisp("none");
      searchDisp("block");
      modalOpen();
      searchField.innerText = "";
      searchField.focus();
    } else {
      settingsDisp("block");
      searchDisp("none");
      modalClose();
    }
    showSearch = !showSearch;
  }
}

export function appendDivToParent(elmID: ElementID, newDiv: HTMLDivElement): void {
  document.getElementById(elmID).parentNode.appendChild(newDiv);
}