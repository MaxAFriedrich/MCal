import fs = require("fs");
import path = require("path");

export enum File {
    calEvents,
    notes
}

/**
 * Writes given contents to a file
 * @param toWrite contents to write to a file
 * @param file the file to be edited
 */
export function write(toWrite: string, file: File): void {
    fs.writeFileSync(getFilepath(file), toWrite, "utf-8");
}

/**
 * Reads contents of the file (if it doesn't exist, it creates a new one with the starting contents)
 * @param file to be read
 * @returns contents of the file
 */
export function read(file: File): string {
    makeFileExist(file);
    return fs.readFileSync(getFilepath(file), "utf8");
}

//* Private

/**
 * Checks if the file exists, if it doesn't it creates that file and writes the starting value to it
 * @param file to make exist
 */
function makeFileExist(file: File): void {
    var filepath = getFilepath(file);
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, getFileStartContents(file))
    }
}

/**
 *
 * @param file to get the filepath from
 * @returns the filepath of the file
 */
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

/**
 * Returns starting contents that makes sure that all other systems work fine
 * @param file to get the starting contents
 * @returns the starting contents
 */
function getFileStartContents(file: File): string {
    switch (file) {
        case File.calEvents: {
            return "[]";
        }
        case File.notes: {
            return "";
        }
        default: {
            console.log("Unknown file!");
            return "";
        }
    }
}