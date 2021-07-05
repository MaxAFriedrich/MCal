// import Color = require("color");
import { ClassName, createDiv, createSpan } from "../../gui/gui";

// const DEFAULT_COLOUR: Color = Color.rgb(0, 0, 0);
const DEFAULT_COLOUR: string = "#FFFFFF"

// TODO: Needs to be changed to put further up the hierarchy
function pullDay() {

}

export class CalEvent {
	private description: string;
	private startTime: string;
	private endTime: string;
	private colour: string;
	private notes: string;

	constructor(description: string, startTime: string, endTime: string, colour: string = DEFAULT_COLOUR, notes: string = "") {
		this.description = description;
		this.startTime = startTime;
		this.endTime = endTime;
		this.colour = colour;
		this.notes = notes;
	}

	public getDiv(isSelected: boolean): HTMLDivElement {
		var classNames = [ClassName.event].concat((isSelected ? [ClassName.selected] : []))
		var myDiv = createDiv(classNames);
		myDiv.appendChild(createSpan("startTime", "12:00PM", "true", false, this.startTime));
		myDiv.appendChild(createSpan("endTime", "1:00PM", "true", false, this.endTime));
		myDiv.appendChild(createSpan("contents", "Event Description", "true", false, this.description, pullDay));

		return myDiv;
	}
}