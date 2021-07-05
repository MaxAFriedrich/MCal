// pass in interfaces
import * as Gui from "./gui/gui";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";

//TODO get the location to save files and do it proply
var notesFile: string = "MCal.html";
var dayFile: string = "MCal.json";

//* main innit funct
function init() {
  //add preview MD button to menu bar
  Gui.appendChildToElement(Gui.DOMElement.menu, Gui.createButton("Preview", previewMDInit, "previewMD", "previewMD"));

  // set gui html
  //TODO call to read cal file
  // TODO: Check if file exists first
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
  document.addEventListener("keydown", keyPressed);
}
init();

/**
 * function that runs when the previewMD toggle run
 */
function previewMDInit() {
  let [toWrite, toDisplay, value] = Note.previewMDClick(Gui.getText(Gui.DOMElement.note), Gui.getHTML(Gui.DOMElement.note), Rw.read(notesFile));
  Rw.write(toWrite, notesFile);
  Gui.setHTML(Gui.DOMElement.note, toDisplay);
  //TODO add function to gui
  var previewMDElm = document.getElementById("previewMD")as HTMLInputElement;
  previewMDElm.value = value;
}

//* event handelling
var eventStack: string[] = [];
export function eventCheck() {
  return eventStack;
}

/**
 * check when key press
 * @param e key code
 */
function keyPressed(e : any) {
  console.log(e)
  if (e.ctrlKey) {
    switch (e.key) {
      case "`":
        previewMDInit();
        break
      case "ArrowRight":
        //next_day();
        break;
      case "ArrowLeft":
        // previous_day();
        break;
      case "ArrowUp":
        //change_selected_event(-1);
        break;
      case "ArrowDown":
        //change_selected_event(1);
        break;
      default:
    }
  }
}
