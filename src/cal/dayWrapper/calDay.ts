import { ElementID, focusHTMLElementFromIDList, getAllInnerHTMLFrom } from "../../gui/elementID";
import { createButton } from "../../gui/creation";
import { removeAllChildren, GUIElement, appendChildToElement, appendChildToBeginningOfElement } from "../../gui/guiElement";
import { CalEvent } from "./calEvent"
import { ClassName, appendChildToElementWithClassNames, removeClassNameFromElementsWith, addClassNameToElementWith, removeAllElementWithClassNamesIf, doesElementHaveClassName, changeOnClickFuncOfElementWithClassNames } from "../../gui/className";

export class CalDay {
	private date: Date;
	private events: CalEvent[];
	private numOfEvents: number;
	private selectedEvent: number;

	constructor(date: Date) {
		this.date = date;
		this.events = [];
		this.selectedEvent = 0;
	}

	//* Static functions
	/**
	 * Creates CalDay from a given json string
	 * @param json in string form to be parsed
	 * @returns CalDay
	 */
	public static getDayFromJSON(json: string): CalDay {
		var obj = JSON.parse(json);
		var day: CalDay = new CalDay(new Date(obj["date"]));
		day.selectedEvent = obj["selectedEvent"];

		// Goes through events
		for (var key in obj["events"]) {
			day.events.push(CalEvent.getEventFromJSON(JSON.stringify(obj["events"][key])));
		}

		return day;
	}

	//* Getters
	/**
	 *
	 * @returns whether there are no events
	 */
	public isEmpty(): boolean {
		return this.events.length == 0
	}

	/**
	 *
	 * @returns the date for this day
	 */
	public getDate(): Date {
		return this.date;
	}

	//* Selected Event
	/**
	 * Safely sets the selected event and updates the divs (without losing focus)
	 * @param selected index of the new selected event
	 */
	public setSelectedEvent(selected: number): void {
		if (selected != this.selectedEvent) {
			if (selected < 0) selected = 0;
			else if (selected > this.events.length) selected = this.events.length;

			removeClassNameFromElementsWith([ClassName.event, ClassName.selected], ClassName.selected);
			this.selectedEvent = selected;
			addClassNameToElementWith([ClassName.event], ClassName.selected, selected);

			console.log("Selected Event: " + this.selectedEvent);
		}
	}

	/**
	 * Loops selected event index around and renders the new list (note: this means the user loses focus)
	 * @param changeBy amount to change selected event by (can be negative)
	 */
	public changeSelectedEventBy(changeBy: number): void {
		this.selectedEvent = this.loopIndex(this.selectedEvent, changeBy, this.events.length);
		this.render();
		console.log("Selected index: " + this.selectedEvent);
		focusHTMLElementFromIDList(ElementID.eventStartTime, this.selectedEvent);
	}

	//* Events
	/**
	 * Removes event and updates selected event if needed
	 * @param index of the event to remove
	 */
	public removeEvent(index: number): void {
		this.events.splice(index, 1);

		if (this.selectedEvent > this.events.length) {
			this.selectedEvent = this.events.length;
		}

		this.render(); // Re-renders list which also gets rid of indexing issues
	}

	/**
	 * Sorts events from the start time
	 */
	public sortEvents(): void {
		var currentSelectedEvent = this.events[this.selectedEvent];

		this.events.sort((a: CalEvent, b: CalEvent): number => {
			// TODO: allow key works to be sorted and empty startTimes should be at the end
			if (a.getStartTime() < b.getStartTime()) {
				return -1;
			} else if (a.getStartTime() > b.getStartTime()) {
				return 1;
			} else {
				return 0;
			}
		});

		this.selectedEvent = this.events.findIndex((value: CalEvent) => value === currentSelectedEvent);
		this.rerenderWithoutLosingFocus();
	}

	//* Rendering
	/**
	 * Renders the whole events list again, meaning user will lose focus if typing, however must happen for rendering new day
	 */
	public render(): void {
		removeAllChildren(GUIElement.day);

		this.events.forEach((e, i) => {
			var div = e.getDiv(i == this.selectedEvent, this.getOnEventClickFunction(i));
			div.appendChild(this.createDeleteButton(i));

			appendChildToElement(GUIElement.day, div);
		});

		this.renderLastEmptyEvent(this.selectedEvent == this.events.length);
	}

	/**
	 * Renders the list of events, while making sure the user does not lose focus
	 * NOTE: The current day must already have been rendered for this to work properly
	 */
	public rerenderWithoutLosingFocus(): void {
		removeAllElementWithClassNamesIf(ClassName.event, (elem: Element) => !doesElementHaveClassName(ClassName.selected, elem));

		removeAllElementWithClassNamesIf(ClassName.delete, (elem: Element) => doesElementHaveClassName(ClassName.selected, elem.parentElement));

		appendChildToElementWithClassNames([ClassName.event, ClassName.selected], this.createDeleteButton(this.selectedEvent), 0);
		changeOnClickFuncOfElementWithClassNames(ClassName.event, this.getOnEventClickFunction(this.selectedEvent), 0)

		for (var i = this.selectedEvent - 1; i >= 0; i--) {
			var div = this.events[i].getDiv(false, this.getOnEventClickFunction(i));
			div.appendChild(this.createDeleteButton(i));
			appendChildToBeginningOfElement(GUIElement.day, div);
		}

		for (var i = this.selectedEvent + 1; i < this.events.length; i++) {
			var div = this.events[i].getDiv(false, this.getOnEventClickFunction(i));
			div.appendChild(this.createDeleteButton(i));
			appendChildToElement(GUIElement.day, div);
		}

		this.renderLastEmptyEvent(false);
	}

	//* Saving
	/**
	 * Extracts information from HTML on page, updating the stored events
	 */
	public extractFromHTML(): void {
		var startTimes = getAllInnerHTMLFrom(ElementID.eventStartTime);
		var endTimes = getAllInnerHTMLFrom(ElementID.eventEndTime);
		var contents = getAllInnerHTMLFrom(ElementID.eventContents);

		if (startTimes.length != this.events.length + 1 || endTimes.length != this.events.length + 1 || contents.length != this.events.length + 1) {
			console.log("Events list HTML does not match with CalDay events!");

		} else {
			this.events.forEach((event, i) => {
				event.setStartTime(startTimes[i]);
				event.setEndTime(endTimes[i]);
				event.setDescription(contents[i]);
			});

			// Checks for the last element (the one that is added post rendering)
			var lastElemIndex = this.events.length
			if (startTimes[lastElemIndex] != "" || endTimes[lastElemIndex] != "" || contents[lastElemIndex] != "") {
				console.log("Adding event!");
				this.events.push(new CalEvent(contents[lastElemIndex], startTimes[lastElemIndex], endTimes[lastElemIndex]));

				// Adds delete button for element without re-rendering whole thing
				appendChildToElementWithClassNames([ClassName.event], this.createDeleteButton(lastElemIndex), lastElemIndex);

				this.renderLastEmptyEvent(false);
			}
		}

		this.sortEvents();
	}

	//* Private
	/**
	 * Loops a given index
	 * @param index to change
	 * @param changeBy amount to change index by
	 * @param arrayLength array length that the index refers to
	 * @returns new index, that refers to one element in the array (or the array length itself)
	 */
	private loopIndex(index: number, changeBy: number, arrayLength: number): number {
		if (arrayLength < 0) {
			console.log("Incorrect usage of CalDay.loopIndex()!");
			return index;
		}

		var newIndex = (index + changeBy) % (arrayLength + 1);

		if (newIndex < 0) {
			return newIndex + (arrayLength + 1);
		} else {
			return newIndex;
		}
	}

	/**
	 * Creates and returns the delete button
	 * @param index of the event to delete with the press of the button
	 * @returns Button that can be used to delete event at the given index
	 */
	private createDeleteButton(index: number): HTMLInputElement {
		var deleteFunc = ((day: CalDay, index: number) => {
			return function () {
				day.removeEvent(index);
			}
		})(this, index);
		return createButton("Delete", deleteFunc, [ClassName.delete]);
	}

	/**
	 * Returns function needed to be attached to event div
	 * @param index of the event to attach event to
	 * @returns onclick function to attach to the event div
	 */
	private getOnEventClickFunction(index: number): () => void {
		return () => this.setSelectedEvent(index);
	}

	/**
	 * Adds the last empty event that is used for creating a new event to the end of the div
	 * @param isSelected whether the last event should be selected
	 */
	private renderLastEmptyEvent(isSelected: boolean) {
		var newDiv = CalEvent.createBar(isSelected, this.getOnEventClickFunction(this.events.length))
		appendChildToElement(GUIElement.day, newDiv);
	}

}