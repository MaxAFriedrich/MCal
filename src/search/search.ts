import * as Elm from "../gui/elementID";
import { createDiv, ClassName } from "../gui/creation";
import { days } from "../cal/dayWrapper/dayWrapper";
import { selectDate } from "../cal/dateSelector";
/**
 * all of the main fetures of the settings modal
 */
enum SettingProperty {
  none,
  close = "SerClose"
}
const searchField = document.getElementById(Elm.ElementID.searchField);
/**
 * runs on program start and makes sure that all eliments have the correct content and sets the settings as necessary for the gui
 */
export function initGui(): void {
  document.getElementById(SettingProperty.close).addEventListener("click", Elm.toggleSearch);
  searchField.addEventListener("keyup", searcher);
}

/**
 * searches all of the events and checks if they meet the criteteria, if they do they are added to the modal
 */
function searcher(): void {
  // TODO improve as per TODO
  const search = searchField.innerText;
  if (search.length > 0) {
    document.getElementById("searchResults").innerHTML = "";
    for (const i of days) {
      const [tempDate, tempArray] = i.getEventDesc();
      let run = false;
      let tempList = "<h3>" + tempDate.toDateString() + "</h3><ul>";
      for (const j of tempArray) {
        if (j.toLowerCase().includes(search)) {
          tempList += "<li>" + j + "</li>";
          run = true;
        }
      }
      if (run) {
        const tempDiv = createDiv([ClassName.resultDay], () => {
          selectDate(tempDate);
          Elm.toggleSearch();
        });
        tempDiv.innerHTML = tempList + "</ul>";
        // TODO move
        document.getElementById("searchResults").appendChild(tempDiv);
      }
    }
  }
}
