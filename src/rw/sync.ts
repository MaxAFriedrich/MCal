import { getCloudAPIName, getFTPParams } from "../setting/setter";
import { setStyleByClass, ClassName } from "../gui/className";
import { ftpSync } from "./cloud/ftp";

export function syncInit():void{
    const syncAPI = getCloudAPIName();
    if (syncAPI=="FTP"){
        setStyleByClass(ClassName.sync,0,"animation: rotation 2s infinite linear;");
        const temp = getFTPParams();
        ftpSync(temp.host, temp.port, temp.user, temp.password, temp.secure, temp.path);
    }
    else{
        endSync(false);
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