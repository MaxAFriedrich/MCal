import * as Path from "../rw/path";
import * as Rw from "../rw/rw";

/**
 * initialises a JSON that can be used to store all the settings in RAM
 */
const settingJson = JSON.parse(Rw.read(Rw.File.settings));

/**
 * write the JSON to a file
 */
function saveJson(): void {
  Rw.write(JSON.stringify(settingJson), Rw.File.settings);
}

/**
 * sets the CSS theme using DOM and the name of the CSS file
 * @param themeName name of theme file
 */
export function theme(themeName: string): void {
  settingJson.theme = themeName;
  saveJson();
  const style = document.getElementById("mainCSS") as HTMLLinkElement;
  style.href = themeName;
}

/**
 *  sets the path of where all user data is saved
 * @param value path string
 */
export function path(value: string): void {
  Path.setLivePath(value);
  Path.setPathFile(value);
  //TODO reload content from new source
  //?Any solutions?
}

/**
 * get the theme from JSON
 * @returns theme CSS file name as string from JSON
 */
export function getTheme(): string {
  const x: string = settingJson.theme;
  return x;
}
