import * as Setter from "./setter";
import * as Path from "../rw/path";
import * as Elm from "../gui/elementID"
import { createButton, createDiv, createHeading, createInput } from "../gui/creation";
import { ClassName, scrapeByInputType } from "../gui/className";
import { innitTheme } from "./setter";


/**
 * runs on program start and makes sure that all eliments have the correct content and sets the settings as necessary for the gui
 */
export function initGui(): void {
  const settingsContentChild = createDiv([ClassName.none])
  settingsContentChild.appendChild(createButton("Close", Elm.toggleSettings, [ClassName.none], Elm.ElementID.SetClose));
  settingsContentChild.appendChild(createHeading(4, "Theme"));
  settingsContentChild.appendChild(createButton("Dark", () => { Setter.setTheme("main.css"); }, [ClassName.themeBtnDark]))
  settingsContentChild.appendChild(createButton("Light", () => { Setter.setTheme("mainLight.css"); }, [ClassName.themeBtnLight]))
  settingsContentChild.appendChild(createHeading(4, "Local Data Path"));
  const pathInp = createInput("text", Path.livePath, [ClassName.none], false, 20, Elm.ElementID.filePathInp);
  pathInp.addEventListener("keyup", () => {
    const box  = document.getElementById(Elm.ElementID.filePathInp) as HTMLInputElement;
    Setter.path(box.value);
  })
  settingsContentChild.appendChild(pathInp);
  settingsContentChild.appendChild(createHeading(3, "Remote Storage"));

  settingsContentChild.appendChild(createButton("FTP", () => {
    Setter.setCloudAPIName("FTP");
    try {
      Elm.getDivAndRemove(Elm.ElementID.cloudAPISettings);
    }
    catch {
      console.log("Creating new API.");
    }
    const APISettings = createDiv([ClassName.none]);
    APISettings.id = Elm.ElementID.cloudAPISettings;
    APISettings.addEventListener("keyup", () => {
      const inptData = scrapeByInputType("text",ClassName.cloudAPIInputs);
      const secureBool = stringToBool(inptData[4]);
      Setter.setFTPParams(inptData[0],parseInt(inptData[1]),inptData[2],inptData[3],secureBool,inptData[5])
    });
    const placeholder = ["host", "port", "user", "password", "secure(true/false)", "remote path"];
    const ftpArray: string [] = ftpArrayGen();
    for (let i = 0; i < 6; i++) {
      const temp = createInput("text", ftpArray[i], [ClassName.cloudAPIInputs]);
      temp.placeholder = placeholder[i];
      APISettings.appendChild(temp);
      APISettings.appendChild(document.createElement("br"));
    }
    Elm.appendElmAsChild(Elm.ElementID.settingsContent, APISettings)

  }, [ClassName.cloudAPIBtns]));
  settingsContentChild.appendChild(createButton("None", () => {
    Setter.setCloudAPIName("None");
    try {
      Elm.getDivAndRemove(Elm.ElementID.cloudAPISettings);
    }
    catch {
      console.log("Disabling API.");
    }

  }, [ClassName.cloudAPIBtns]));

  Elm.appendElmAsChild(Elm.ElementID.settingsContent, settingsContentChild);
  if (Setter.getCloudAPIName()=="FTP"){
  const temp = document.getElementsByClassName(ClassName.cloudAPIBtns)[0] as HTMLInputElement;
  temp.click(); 
  }
  if (Setter.getCloudAPIName()=="None"){
  const temp = document.getElementsByClassName(ClassName.cloudAPIBtns)[1] as HTMLInputElement;
  temp.click(); 
  }

  innitTheme();
}

// *Private*
function boolToString(value: boolean): string {
  let out: string;
  if (value) {
    out = "true";
  }
  else {
    out = "false";
  }
  return out;
}

function stringToBool(value: string): boolean {
  let out: boolean;
  if (value=="true".toLowerCase()) {
    out = true;
  }
  else {
    out = false;
  }
  return out;
}

function ftpArrayGen():string []{
  const ftpJson = Setter.getFTPParams();
  let secureString = boolToString(ftpJson.secure);
  let portString = String(ftpJson.port);
  if (ftpJson.host==undefined){
      secureString = "";
      portString = "";
  }
  const ftpArray: string[] = [ftpJson.host, portString, ftpJson.user, ftpJson.password, secureString, ftpJson.path]
  for (let i = 0; i<ftpArray.length;i++){
    if (ftpArray[i]==undefined){
      ftpArray[i]="";
    }
  }
  return ftpArray;
}