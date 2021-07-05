import { removeAllChildren, DOMElement, createButton, appendChildToElement, createDiv, createSpan, ClassName } from "../../gui/gui";
import { CalEvent } from "./calEvent"

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
		removeAllChildren(DOMElement.day);

		this.events.forEach((e, i) => {
			var div = e.getDiv(i == this.selectedEvent);
			var deleteFunc = ((day: CalDay, index: number) => {
				return function () {
					day.removeEvent(index);
				}
			})(this, i);
			div.appendChild(createButton("Delete", deleteFunc, [ClassName.delete]));

			appendChildToElement(DOMElement.day, div);
		});

		var classNames = [ClassName.event].concat(this.selectedEvent == this.events.length ? [ClassName.selected] : [])
		var newDiv = createDiv(classNames);
		newDiv.appendChild(createSpan("startTime", "12:00PM", "true", false));
		newDiv.appendChild(createSpan("endTime", "1:00PM", "true", false));
		newDiv.appendChild(createSpan("contents", "Event Description", "true", false));
		appendChildToElement(DOMElement.day, newDiv);
	}

	public removeEvent(index: number): void {
		delete this.events[index];
		this.render();
	}
}