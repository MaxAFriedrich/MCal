import { ElementID, focusHTMLElementFromIDList } from "../../gui/elementID";
import { createButton, ClassName } from "../../gui/creation";
import { removeAllChildren, GUIElement, appendChildToElement } from "../../gui/guiElement";
import { CalEvent, createEventBar } from "./calEvent"

export class CalDay {
	private date: Date;
	private events: CalEvent[];
	private selectedEvent: number;

	constructor(date: Date) {
		this.date = date;
		this.events = [new CalEvent("Test1", "12:00PM", "1:00PM"), new CalEvent("Test2", "1:00PM", "2:00PM")];
		this.selectedEvent = 0;
	}

	public addEvent(event: CalEvent): void {
		// TODO: Add binomial search to put in right position
		this.selectedEvent = this.events.length;
		this.events.push(event);
		this.render();
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
			var deleteFunc = ((day: CalDay, index: number) => {
				return function () {
					day.removeEvent(index);
				}
			})(this, i);
			div.appendChild(createButton("Delete", deleteFunc, [ClassName.delete]));

			appendChildToElement(GUIElement.day, div);
		});

		var newDiv = createEventBar(this.selectedEvent == this.events.length)
		appendChildToElement(GUIElement.day, newDiv);
	}

	public removeEvent(index: number): void {
		delete this.events[index];
		this.render();
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
}