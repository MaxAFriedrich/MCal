import * as Selector from "./dateSelector"
import * as DayWrapper from "./dayWrapper/dayWrapper"

export function temp(){
  console.log("change to cal ocoured")
}

export function init() {
  Selector.init();
  DayWrapper.init();
}

export function dateDisplay() {

}