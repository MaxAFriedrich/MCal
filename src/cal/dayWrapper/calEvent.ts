// import Color = require("color");
import {
  ClassName,
  ElementID,
  createDiv,
  createSpan,
} from "../../gui/creation";

// const DEFAULT_COLOUR: Color = Color.rgb(0, 0, 0);
const DEFAULT_COLOUR = "#FFFFFF";

export class CalEvent {
  private description: string;
  private startTime: string;
  private endTime: string;
  private colour: string;
  private notes: string;

  constructor(
    description: string,
    startTime: string,
    endTime: string,
    colour: string = DEFAULT_COLOUR,
    notes = ""
  ) {
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.colour = colour;
    this.notes = notes;
  }

  //* Static
  /**
   * Creates CalEvent from the given json
   * @param json string to be parsed
   * @returns CalEvent
   */
  public static getEventFromJSON(json: string): CalEvent {
    const obj = JSON.parse(json);

    return new CalEvent(
      obj["description"],
      obj["startTime"],
      obj["endTime"],
      obj["colour"],
      obj["notes"]
    );
  }

  /**
   *
   * @param isSelected whether it should be selected
   * @param onDivClick function to attach to the div
   * @param startTime
   * @param endTime
   * @param description
   * @param colour of the div
   * @param notes
   * @returns div for the event (excluding delete button)
   */
  public static createBar(
    isSelected = false,
    onDivClick?: () => void,
    startTime = "",
    endTime = "",
    description = "",
    colour = DEFAULT_COLOUR,
    notes = ""
  ): HTMLDivElement {
    // TODO: Selected should show notes panel and should change colour depending on the parameter
    const classNames = [ClassName.event].concat(
      isSelected ? [ClassName.selected] : []
    );
    let myDiv: HTMLDivElement;
    if (onDivClick != null) {
      myDiv = createDiv(classNames, onDivClick);
    } else {
      myDiv = createDiv(classNames);
    }
    myDiv.appendChild(
      createSpan(ElementID.eventStartTime, "12:00PM", "true", false, startTime)
    );
    myDiv.appendChild(
      createSpan(ElementID.eventEndTime, "1:00PM", "true", false, endTime)
    );
    myDiv.appendChild(
      createSpan(
        ElementID.eventContents,
        "Event Description",
        "true",
        false,
        description
      )
    );

    return myDiv;
  }

  //* Getters and setters
  /**
   *
   * @param isSelected whether the event should be selected
   * @param onDivClick function to be called when the div is clicked
   * @returns Div for this event
   */
  public getDiv(isSelected: boolean, onDivClick: () => void): HTMLDivElement {
    return CalEvent.createBar(
      isSelected,
      onDivClick,
      this.startTime,
      this.endTime,
      this.description,
      this.colour,
      this.notes
    );
  }

  /**
   *
   * @returns The start time of the event
   */
  public getStartTime(): string {
    return this.startTime;
  }

  /**
   *
   * @param desc to set
   */
  public setDescription(desc: string): void {
    this.description = desc;
  }

  /**
   *
   * @param time to set to event start time
   */
  public setStartTime(time: string): void {
    this.startTime = time;
  }

  /**
   *
   * @param time to set to event end time
   */
  public setEndTime(time: string): void {
    this.endTime = time;
  }
}

