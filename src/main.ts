//TODO pass in interfaces
import * as Gui from "./gui/gui";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";

//* main innit funct
function init() {
  Gui.setHTML(Gui.DOMElement.day,'<input type="text">');
  Gui.addElementEventListener(Gui.DOMElement.day, "input", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.DOMElement.select, "input", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.DOMElement.date, "blur", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.DOMElement.note, "input", () => {
    Note.temp();
    Rw.write(Gui.getHTML(Gui.DOMElement.note));
  });

  Cal.init();
}
init();

//* event handelling
var eventStack: string[] = [];
export function eventCheck() {
  return eventStack;
}