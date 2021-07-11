import * as Rw from "../rw/rw";

/**
 * initialises a JSON that can be used to store all the settings in RAM
 */
const settingJson = JSON.parse(Rw.read(Rw.File.settings));

/**
 * write the JSON to a file
 */
function saveJson() {
  Rw.write(JSON.stringify(settingJson), Rw.File.settings);
}

/**
 * sets the CSS theme using DOM and the name of the CSS file
 * @param themeName name of theme file
 */
export function theme(themeName : string) {
  settingJson.theme = themeName;
  saveJson();
  var style = document.getElementById("mainCSS")as HTMLLinkElement;
  style.href = themeName;
}

/**
 *  sets the path of where all user data is saved
 * @param value path string
 */
export function path(value : string) {
  settingJson.path = value;
  saveJson();
  //TODO make it do something usefull
}

/**
 * get the theme from JSON
 * @returns theme CSS file name as string from JSON
 */
export function getTheme() {
    let x:string=settingJson.theme;
  return x;
}

/**
 * get the user settings from JSON
 * @returns string of path to user settings
 */
export function getPath() {
  return settingJson.path;
}
