// pass in interfaces
import * as Gui from "./gui/guiElement";
import * as Cal from "./cal/cal";
import * as Note from "./note/note";
import * as Rw from "./rw/rw";
import * as Input from "./input/input";
import { addAttributeToElementWithID, ElementID, toggleSettings, toggleSearch } from "./gui/elementID";
import * as Settings from "./setting/gui";
import * as Search from "./search/search";

//* main innit funct
function init(): void {
  Input.init(); // Should be first to be initialised
  Cal.init(Rw.read(Rw.File.calEvents));
  Settings.initGui();
  Search.initGui();
  //add settings button to menmu bar
  Gui.appendChildToElement(
    Gui.GUIElement.menuDay,
    Gui.Creation.createButton(
      "Settings",
      toggleSettings,
      [Gui.Creation.ClassName.settings],
      Gui.Creation.ElementID.settings
    )
  );
  //add search button to menmu bar
  Gui.appendChildToElement(
    Gui.GUIElement.menuDay,
    Gui.Creation.createButton(
      "Search",
      toggleSearch,
      [Gui.Creation.ClassName.search],
      Gui.Creation.ElementID.search
    )
  );

  //add preview MD button to menu bar
  Gui.appendChildToElement(
    Gui.GUIElement.menuNote,
    Gui.Creation.createButton(
      "Preview",
      previewMDInit,
      [Gui.Creation.ClassName.previewMD],
      Gui.Creation.ElementID.previewMD
    )
  );

  // set gui html
  Gui.setHTML(Gui.GUIElement.note, Rw.read(Rw.File.notes));

  //event listeners
  Gui.addElementEventListener(Gui.GUIElement.day, "input", () => {
    Cal.eventChanged();
    saveCalendar();
  });
  Gui.addElementEventListener(Gui.GUIElement.day, "pasted", () => {
    Cal.eventPasted();
    saveCalendar();
  });
  Gui.addElementEventListener(Gui.GUIElement.day, "eventDeleted", () => {
    saveCalendar();
  });
  Gui.addElementEventListener(Gui.GUIElement.date, "change", () => {
    Cal.selectedDayChanged();
  });
  Gui.addElementEventListener(Gui.GUIElement.note, "input", () => {
    Rw.write(Gui.getHTML(Gui.GUIElement.note), Rw.File.notes);
  });

  // Key callback added
  Input.addCommandKey([Input.CommandKey.ctrl], "`", previewMDInit);
  Input.addCommandKey([Input.CommandKey.ctrl], ",", toggleSettings);
  Input.addCommandKey([Input.CommandKey.ctrl], "f", toggleSearch);
}
init();

/**
 * Saves the calendar
 */
function saveCalendar(): void {
  Rw.write(Cal.getSaveFileString(), Rw.File.calEvents);
}

/**
 * function that runs when the previewMD toggle run
 */
function previewMDInit(): void {
  const [toWrite, toDisplay, value] = Note.previewMDClick(
    Gui.getText(Gui.GUIElement.note),
    Gui.getHTML(Gui.GUIElement.note),
    Rw.read(Rw.File.notes)
  );
  Rw.write(toWrite, Rw.File.notes);
  Gui.setHTML(Gui.GUIElement.note, toDisplay);
  addAttributeToElementWithID(ElementID.previewMD, "value", value);
}

//* event handelling
const eventStack: string[] = [];
export function eventCheck(): string[] {
  return eventStack;
}
