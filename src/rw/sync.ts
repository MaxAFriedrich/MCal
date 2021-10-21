import { setStyleByClass, ClassName } from "../gui/className";
import { ftpSync } from "./cloud/ftp";

export function syncInit():void{
    //TODO confir with settings
    const syncAPI = "ftp";
    if (syncAPI=="ftp"){
        setStyleByClass(ClassName.sync,0,"animation: rotation 2s infinite linear;");
        ftpSync("192.168.1.12", 8001, "pc", "12345", false, "/device/Documents/testData/");
    }
}

export function endSync(success:boolean):void{
    if (success){
        setStyleByClass(ClassName.sync,0,"animation: unset;");
    }
    else{
        setStyleByClass(ClassName.sync,0,"animation: unset;-webkit-mask-image: url('./icons/sync_problem_black_24dp.svg');mask-image: url('./icons/sync_problem_black_24dp.svg');");
    }
}