// import Color = require("color");
import { ClassName, ElementID, createDiv, createSpan } from "../../gui/creation";

// const DEFAULT_COLOUR: Color = Color.rgb(0, 0, 0);
const DEFAULT_COLOUR: string = "#FFFFFF"

// TODO: Needs to be changed to put further up the hierarchy
function pullDay() {

}

export function createEventBar(isSelected: boolean = false, startTime: string = "", endTime: string = "", description: string = "", onBlurFunc: () => void = () => { }) {
	var classNames = [ClassName.event].concat((isSelected ? [ClassName.selected] : []))
	var myDiv = createDiv(classNames);
	myDiv.appendChild(createSpan(ElementID.eventStartTime, "12:00PM", "true", false, startTime));
	myDiv.appendChild(createSpan(ElementID.eventEndTime, "1:00PM", "true", false, endTime));
	myDiv.appendChild(createSpan(ElementID.eventContents, "Event Description", "true", false, description, onBlurFunc));

	return myDiv;
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
		return createEventBar(isSelected, this.startTime, this.endTime, this.description, pullDay);
	}
}