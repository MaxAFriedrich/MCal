// pass in interfaces
import * as Gui from "./gui/gui";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";

//* main innit funct
function init() {
  //TODO get the location to save files and do it proply
  var notesFile: string = "MCal.html";
  var dayFile: string = "MCal.json";

  // set gui html
  //TODO call to read cal file
  Gui.setHTML(Gui.DOMElement.note, Rw.read(notesFile));

  //event listeners
  Gui.addElementEventListener(Gui.DOMElement.day, "input", () => {
    Cal.temp();
    //TODO call to write cal to file
  });
  Gui.addElementEventListener(Gui.DOMElement.select, "input", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.DOMElement.date, "blur", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.DOMElement.note, "input", () => {
    //TODO figure out the md preview
    ////Gui.getHTML(Gui.DOMElement.note)=Note.markdownParser
    Rw.write(Gui.getHTML(Gui.DOMElement.note), notesFile);
  });

  Cal.init();
}
init();

//* event handelling
var eventStack: string[] = [];
export function eventCheck() {
  return eventStack;
}
