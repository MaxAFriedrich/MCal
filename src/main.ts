// pass in interfaces
import * as Gui from "./gui/guiElement";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";

//TODO get the location to save files and do it proply
var notesFile: string = "MCal.html";
var dayFile: string = "MCal.json";

//* main innit funct
function init() {
  //add preview MD button to menu bar
  Gui.appendChildToElement(Gui.GUIElement.menu, Gui.Creation.createButton("Preview", previewMDInit, [Gui.Creation.ClassName.previewMD], Gui.Creation.ElementID.previewMD));

  // set gui html
  //TODO call to read cal file
  // TODO: Check if file exists first
  Gui.setHTML(Gui.GUIElement.note, Rw.read(notesFile));

  //event listeners
  Gui.addElementEventListener(Gui.GUIElement.day, "input", () => {
    Cal.temp();
    //TODO call to write cal to file
  });
  Gui.addElementEventListener(Gui.GUIElement.select, "input", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.GUIElement.date, "blur", () => {
    Cal.temp();
  });
  Gui.addElementEventListener(Gui.GUIElement.note, "input", () => {
    Rw.write(Gui.getHTML(Gui.GUIElement.note), notesFile);
  });
  Cal.init();
  //todo make these consitant
  document.addEventListener("keydown", keyPressed);
}
init();

/**
 * function that runs when the previewMD toggle run
 */
function previewMDInit() {
  let [toWrite, toDisplay, value] = Note.previewMDClick(Gui.getText(Gui.GUIElement.note), Gui.getHTML(Gui.GUIElement.note), Rw.read(notesFile));
  Rw.write(toWrite, notesFile);
  Gui.setHTML(Gui.GUIElement.note, toDisplay);
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
  // console.log(e)
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
