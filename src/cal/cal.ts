import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"
import { addCommandKey } from "../input/inputCallback";

export function temp(){
  console.log("change to cal ocoured")
}

export function init() {
  DayWrapper.init();
  Selector.init(dateDisplay);
  dateDisplay();

}

//* Private
function dateDisplay() {
  var selectedDay = Selector.getSelectedDay();
  Selector.displaySelector();
  DayWrapper.display(selectedDay);
}