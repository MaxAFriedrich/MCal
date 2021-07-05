import { createButton, createDiv, createSpan, ClassName, ElementID } from "../../gui/creation";
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
}