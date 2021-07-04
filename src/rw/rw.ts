import fs = require("fs");
import path = require("path");


export function write(toWrite:string,name:string){
    fs.writeFileSync(name, toWrite, "utf-8");
}

export function read(name:string){
    return fs.readFileSync(name, "utf8");
}