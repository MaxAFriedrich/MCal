// pass in interfaces
import * as Gui from "./gui/guiElement";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";
import * as Input from "./input/input";
import { addAttributeToElementWithID, ElementID } from "./gui/elementID";

//* main innit funct
function init() {
  Input.init(); // Should be first to be initialised
  Cal.init(Rw.read(Rw.File.calEvents));

  //add preview MD button to menu bar
  Gui.appendChildToElement(Gui.GUIElement.menu, Gui.Creation.createButton("Preview", previewMDInit, [Gui.Creation.ClassName.previewMD], Gui.Creation.ElementID.previewMD));

  // set gui html
  Gui.setHTML(Gui.GUIElement.note, Rw.read(Rw.File.notes));

  //event listeners
  Gui.addElementEventListener(Gui.GUIElement.day, "input", () => {
    Cal.eventChanged();
    Rw.write(Cal.getSaveFileString(), Rw.File.calEvents);
  });
  Gui.addElementEventListener(Gui.GUIElement.date, "change", () => {
    Cal.selectedDayChanged();
  });
  Gui.addElementEventListener(Gui.GUIElement.note, "input", () => {
    Rw.write(Gui.getHTML(Gui.GUIElement.note), Rw.File.notes);
  });
  // TODO: make these consitant ?

  // Key callback added
  Input.addCommandKey([Input.CommandKey.ctrl], '`', previewMDInit);
}
init();

/**
 * function that runs when the previewMD toggle run
 */
function previewMDInit() {
  let [toWrite, toDisplay, value] = Note.previewMDClick(Gui.getText(Gui.GUIElement.note), Gui.getHTML(Gui.GUIElement.note), Rw.read(Rw.File.notes));
  Rw.write(toWrite, Rw.File.notes);
  Gui.setHTML(Gui.GUIElement.note, toDisplay);
  addAttributeToElementWithID(ElementID.previewMD, "value", value);
}

//* event handelling
var eventStack: string[] = [];
export function eventCheck() {
  return eventStack;
}