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
export function setTheme(themeName: string): void {
  if (themeName != undefined)
    settingJson.theme = themeName;
  else {
    themeName = settingJson.theme = "main.css";
  }
  saveJson();
  const style = document.getElementById("mainCSS") as HTMLLinkElement;
  style.href = themeName;
}

export function innitTheme(): void {
  const style = document.getElementById("mainCSS") as HTMLLinkElement;
  if (settingJson.theme == undefined)
    settingJson.theme = "main.css";
  style.href = settingJson.theme;;
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

export function setCloudAPIName(name: string): void {
  settingJson.cloudAPIName = name;
  saveJson();
}

export function getCloudAPIName(): string {
  return settingJson.cloudAPIName;
}


export function getFTPParams(): {
  host: string;
  port: number;
  user: string;
  password: string;
  secure: boolean;
  path: string;
} {
  const out = {
    "host": settingJson.ftpHost,
    "port": settingJson.ftpPort,
    "user": settingJson.ftpUser,
    "password": settingJson.ftpPassword,
    "secure": settingJson.ftpSecure,
    "path": settingJson.ftpPath
  };
  return out;
}

export function setFTPParams(
  host: string,
  port: number,
  user: string,
  password: string,
  secure: boolean,
  path: string,
): void {
  settingJson.ftpHost = host;
  settingJson.ftpPort = port;
  settingJson.ftpUser = user;
  settingJson.ftpPassword = password;
  settingJson.ftpSecure = secure;
  settingJson.ftpPath = path;
  saveJson();
}