import { ElementID, focusHTMLElementFromIDList, getAllInnerHTMLFrom } from "../../gui/elementID";
import { createButton } from "../../gui/creation";
import { removeAllChildren, GUIElement, appendChildToElement, appendChildToBeginningOfElement } from "../../gui/guiElement";
import { CalEvent, createEventBar } from "./calEvent"
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

	private getOnEventClickFunction(index: number): () => void {
		return () => this.setSelectedEvent(index);
	}

	private renderLastEmptyEvent(isSelected: boolean) {
		var newDiv = createEventBar(isSelected, this.getOnEventClickFunction(this.events.length))
		appendChildToElement(GUIElement.day, newDiv);
	}

	public sortEvents(): void {
		var currentSelectedEvent = this.events[this.selectedEvent];

		this.events.sort((a: CalEvent, b: CalEvent): number => {
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

	public render(): void {
		removeAllChildren(GUIElement.day);

		this.events.forEach((e, i) => {
			var div = e.getDiv(i == this.selectedEvent, this.getOnEventClickFunction(i));
			div.appendChild(this.createDeleteButton(i));

			appendChildToElement(GUIElement.day, div);
		});

		this.renderLastEmptyEvent(this.selectedEvent == this.events.length);
	}

	public removeEvent(index: number): void {
		this.events.splice(index, 1);
		if (this.selectedEvent > this.events.length) {
			this.selectedEvent = this.events.length;
		}
		this.render(); // Re-renders list which also gets rid of indexing issues
	}

	public getDate(): Date {
		return this.date;
	}

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
				appendChildToElementWithClassNames([ClassName.event], this.createDeleteButton(lastElemIndex), lastElemIndex);

				this.renderLastEmptyEvent(false);
			}
		}

		this.sortEvents();
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