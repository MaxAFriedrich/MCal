//TODO pass in interfaces
import * as Gui from "./gui/gui";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
 import * as Rw from "./rw/rw";

//* main innit funct
function init() {
  Gui.setHTMLDay('<input type="text">');
}
init();

//* event handelling
var eventStack: string[] = [];
export function eventCheck() {
  return eventStack;
}

//! could not get it work with getter
//?it would be possible to pass the correct Gui.getHTML getter to the pertinent function ect.
// this iin effect become the main function but with a bit of imagination!
document.getElementById("day-wrapper").addEventListener("input", () => {
  Cal.temp();
});
document.getElementById("select-wrapper").addEventListener("input", () => {
  Cal.temp();
});
document.getElementById("start_dt").addEventListener("blur", () => {
  Cal.temp();
});
document.getElementById("notes-wrapper").addEventListener("input", () => {
  Note.temp();
  Rw.write(Gui.getHTMLNote());
});
