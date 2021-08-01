import * as Setter from "./setter";
import * as Path from "../rw/path";

////Setter.theme("mainLight.css")

/**
 * all of the main fetures of the settings modal
 */
enum SettingProperty {
  none,
  close = "SetClose",
  wrapper = "modalSettings",
  content = "settingsContent",
}

/**
 * global bool for display of modal, false=hidden
 */
let toggleDisplay = false;

/**
 * Open the modal using DOM
 */
function Open() {
  document.getElementById(SettingProperty.wrapper).style.display = "block";
}

/**
 * Close the modal using DOM
 */
function Close() {
  document.getElementById(SettingProperty.wrapper).style.display = "none";
}

/**
 * Function to either open or close the modal depending on toggleDisplay
 */
export function toggle(): void {
  if (toggleDisplay) {
    Close();
    toggleDisplay = !toggleDisplay;
  } else {
    Open();
    toggleDisplay = !toggleDisplay;
  }
}
////toggle()

/**
 * runs on program start and makes sure that all eliments have the correct content and sets the settings as necessary for the gui
 */
function initGui() {
  document
    .getElementById(SettingProperty.close)
    .addEventListener("click", toggle);

  const pathInpt = document.getElementById("SetPath") as HTMLInputElement;
  const lightTheme = document.getElementById(
    "setThemeLight"
  ) as HTMLInputElement;
  const darkTheme = document.getElementById("setThemeDark") as HTMLInputElement;
  const currentPath: string = Path.livePath;
  const currentTheme: string = Setter.getTheme();

  lightTheme.addEventListener("click", () => {
    Setter.theme("mainLight.css");
  });
  darkTheme.addEventListener("click", () => {
    Setter.theme("main.css");
  });
  pathInpt.addEventListener("blur", () => {
    Setter.path(pathInpt.value);
  });

  pathInpt.value = currentPath;
  console.log(currentTheme);
  if (currentTheme == "mainLight.css") {
    lightTheme.checked = true;
    darkTheme.checked = false;
    Setter.theme(currentTheme);
  } else {
    lightTheme.checked = false;
    darkTheme.checked = true;
    Setter.theme("main.css");
  }
}
initGui();
