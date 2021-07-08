import fs = require("fs");
import path = require("path");

export enum File {
    calEvents,
    notes
}

export function write(toWrite: string, file: File){
    fs.writeFileSync(getFilepath(file), toWrite, "utf-8");
}

export function read(file: File){
    // TODO: Make sure file exists
    return fs.readFileSync(getFilepath(file), "utf8");
}

//* Private
function getFilepath(file: File): string {
    switch (file) {
        case File.calEvents: {
            return "MCal.json";
        }
        case File.notes: {
            return "MCal.html";
        }
        default: {
            console.log("Unknown file!");
            return "";
        }
    }
}