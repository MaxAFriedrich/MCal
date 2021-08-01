import os = require("os");
import nodePath = require("path");
import fs = require("fs");
import {platform} from "process";


/**
 * return the defualt APPDATA folder per OS
 * @returns path as list
 */
function defaultPath(): string {
  const userName: string = os.userInfo().username;
  let defualtReturn: string;
  if (platform == "linux") {
    defualtReturn = nodePath.join("/home", userName, ".config", "MCal");
  } else if (platform == "win32") {
    defualtReturn = nodePath.join("C:", "users", userName, "AppData","Roaming" ,"MCal");
  } else if (platform == "darwin") {
    defualtReturn = nodePath.join("/Users", userName, "Library", "Application Support", "MCal");
  } else {
    defualtReturn = nodePath.join("mcal");
  }
  return defualtReturn;
}

/**
 * if the defualt folder does not exist, create it
 */
function createFolder(): void {
  const dir = defaultPath();
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) {
        console.log("Directory not created.");
        throw err;
      }
      console.log("Directory is created.");
    });
  }
}

/**
 * checks if a path file exists in defualt appdata
 * @returns boolean of wheather the file exists
 */
function pathFileChecker():boolean{
    let exists:boolean;
    if(fs.existsSync(nodePath.join(defaultPath(),"path.txt"))) {
        exists=true;
    } else {
        exists=false;
    }
    return exists;
}

/**
 * returns the path to be used for saving data
 * @returns path string
 */
export function innit(): string {
  const defPath: string = defaultPath();
  let finalPath: string;
  createFolder();
  if (pathFileChecker()){
    finalPath=fs.readFileSync(nodePath.join(defPath,"path.txt"), "utf8");
  }else{
    finalPath = defPath
  }
  console.log("finalPath: "+finalPath)
  return finalPath;
}
/**
 * the path of the folder to save data to
 */
 export let livePath=innit();

 export function setLivePath(value:string):void{
  livePath=value;
 }

/**
 * save the location to save user data in app data
 * @param value new path to save data string
 */
export function setPathFile(value:string):void{
  const defPath: string = defaultPath();
  fs.writeFileSync(nodePath.join(defPath,"path.txt"), value, "utf-8");
}