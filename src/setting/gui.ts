import * as Setter from "./setter";
import * as Path from "../rw/path";
import * as Elm from "../gui/elementID"
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
 * runs on program start and makes sure that all eliments have the correct content and sets the settings as necessary for the gui
 */
export function initGui():void {
  document
    .getElementById(SettingProperty.close)
    .addEventListener("click", Elm.toggleSettings);

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