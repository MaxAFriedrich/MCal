import * as Setter from "./setter";

////Setter.theme("mainLight.css")

enum SettingProperty {
  none,
  close,
  wrapper,
  content
}
var toggleDisplay: boolean = false;

/**
 * Converts a given ID into a string
 * @param id of the element to convert
 * @returns string variant of the ID
 */
function getIDString(id : SettingProperty): string {
  var output: string;

  switch (id) {
    case SettingProperty.close:
      {
        output = "SetClose";
        break;
      }
    case SettingProperty.wrapper:
      {
        output = "modalSettings";
        break;
      }
    case SettingProperty.content:
      {
        output = "settingsContent";
        break;
      }
    case SettingProperty.none:
      {
        output = "";
        break;
      }
    default:
      {
        console.log("Unknown element ID");
        output = "";
        break;
      }
  }

  return output;
}

export function Open() {
  document.getElementById(getIDString(SettingProperty.wrapper)).style.display = "block";
}
export function Close() {
  document.getElementById(getIDString(SettingProperty.wrapper)).style.display = "none";
}

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

function initGui() {
  document.getElementById(getIDString(SettingProperty.close)).addEventListener("click", toggle);

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
