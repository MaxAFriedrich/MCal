import * as Rw from "../rw/rw";

const settingJson = JSON.parse(Rw.read(Rw.File.settings));

function saveJson() {
  Rw.write(JSON.stringify(settingJson), Rw.File.settings);
}
export function test(toPrint : string) {
  console.log(toPrint);
}

export function theme(themeName : string) {
  settingJson.theme = themeName;
  saveJson();
  var style = document.getElementById("mainCSS")as HTMLLinkElement;
  style.href = themeName;
}
export function path(value : string) {
  settingJson.path = value;
  saveJson();
  //TODO make it do something usefull
}

export function getTheme() {
    let x:string=settingJson.theme;
  return x;
}

export function getPath() {
  return settingJson.path;
}
