import { CalEvent } from "../../cal/dayWrapper/calEvent";
import { ClassName } from "../className";
import { Display } from "./display";

export class CalDisplay implements Display {
	private id: string;
	private elements: HTMLDivElement;

	// Implementation:
	constructor() {
		this.id = "dayWrapper";
	}

	public setID(newID: string): void {
		this.id = newID;
	}

	public getID(): string {
		return this.id;
	}

	public getElementToRender(): HTMLElement {
		return new HTMLElement();
	}

	// Custom for CalDay rendering:

	public clearAll(): void {
		// Do something
	}

	public renderCalEventAtEnd(event: CalEvent, isSelected: boolean, delFunc: () => void): void {
		// Do something
	}

	public renderCalEventAtBeginning(event: CalEvent, isSelected: boolean, delFunc: () => void): void {
		// Do something
	}

	public removeAllElementsExceptSelected(): void {
		// Do something
	}

	public updateDeleteButtonIndexOfSelected(newFunc: () => void): void {
		// Do something
	}

	public updateCalEvents(events: CalEvent[]): void {
		// Do something
	}

	public focusClassNameOfSelectedElem(className: ClassName): void {
		// Do something
	}

	public changeSelectedElement(from: number, to: number, shouldFocus: boolean): void {
		// Do something
	}
}