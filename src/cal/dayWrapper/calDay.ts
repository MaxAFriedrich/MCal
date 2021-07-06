import { ElementID, focusHTMLElementFromIDList, getAllInnerHTMLFrom } from "../../gui/elementID";
import { createButton } from "../../gui/creation";
import { removeAllChildren, GUIElement, appendChildToElement } from "../../gui/guiElement";
import { CalEvent, createEventBar } from "./calEvent"
import { ClassName, appendChildToElementWithClassName } from "../../gui/className";

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

	public static renderEmptyDay(): void {
		removeAllChildren(GUIElement.day);

		var newDiv = createEventBar(true);
		appendChildToElement(GUIElement.day, newDiv);
	}

	public render(): void {
		removeAllChildren(GUIElement.day);

		this.events.forEach((e, i) => {
			var div = e.getDiv(i == this.selectedEvent);
			div.appendChild(this.createDeleteButton(i));

			appendChildToElement(GUIElement.day, div);
		});

		var newDiv = createEventBar(this.selectedEvent == this.events.length)
		appendChildToElement(GUIElement.day, newDiv);
	}

	public removeEvent(index: number): void {
		this.events.splice(index, 1);
		this.render(); // Re-renders list which also gets rid of indexing issues
	}

	public getDate(): Date {
		return this.date;
	}

	loopIndex(index: number, changeBy: number, arrayLength: number): number {
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

	public changeSelectedEventBy(changeBy: number): void {
		this.selectedEvent = this.loopIndex(this.selectedEvent, changeBy, this.events.length);
		this.render();
		console.log("Selected index: " + this.selectedEvent);
		focusHTMLElementFromIDList(ElementID.eventStartTime, this.selectedEvent);
	}

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
				appendChildToElementWithClassName(ClassName.event, lastElemIndex, this.createDeleteButton(lastElemIndex));

				// Adds new last element to list without re-rendering whole thing (which causes user to lose focus)
				var newDiv = createEventBar(false);
				appendChildToElement(GUIElement.day, newDiv);
			}
		}
	}

	private createDeleteButton(index: number): HTMLInputElement {
		var deleteFunc = ((day: CalDay, index: number) => {
			return function () {
				day.removeEvent(index);
			}
		})(this, index);
		return createButton("Delete", deleteFunc, [ClassName.delete]);
	}
}