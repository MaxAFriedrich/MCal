import * as Setter from "./setter";

////Setter.theme("mainLight.css")

/**
 * all of the main fetures of the settings modal
 */
enum SettingProperty {
  none,
  close="SetClose",
  wrapper="modalSettings",
  content="settingsContent"
}

/**
 * global bool for display of modal, false=hidden
 */
var toggleDisplay: boolean = false;

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
export function toggle() {
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
  document.getElementById(SettingProperty.close).addEventListener("click", toggle);

  let pathInpt = document.getElementById("SetPath")as HTMLInputElement;
  let lightTheme = document.getElementById("setThemeLight")as HTMLInputElement;
  let darkTheme = document.getElementById("setThemeDark")as HTMLInputElement;
  let currentPath: string = Setter.getPath();
  let currentTheme: string = Setter.getTheme();

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
