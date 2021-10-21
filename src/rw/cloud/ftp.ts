import ftp = require("basic-ftp");
import nodePath = require("path");
import { livePath } from "../path";
import * as Rw from "../rw"
import * as Cal from "../../cal/cal"
import * as Gui from "../../gui/guiElement"
import fs = require("fs");
import { endSync } from "../sync";


export async function ftpSync(host: string, port: number, user: string, password: string, secure: boolean, remotePath: string): Promise<void> {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  try {
    await client.access({
      host: host,
      port: port,
      user: user,
      password: password,
      secure: secure
    });
    await client.cd(remotePath);

    const remoteFiles = await client.list();
    const fileNames = ["MCal.json", "MCal.html"];
    let remoteAvailable = false;
    for (let i = 0; i < remoteFiles.length; i++) {
      for (let j = 0; j < fileNames.length; j++) {
        if (remoteFiles[i].name == fileNames[j]) {
          remoteAvailable=true;
          const remoteDate = new Date(remoteFiles[i].modifiedAt).valueOf();
          const localDate = new Date(fs.statSync(nodePath.join(livePath, fileNames[j])).mtimeMs).valueOf();
          if (remoteDate > localDate) {
            await client.downloadTo(nodePath.join(livePath, fileNames[j]), fileNames[j]);
            Cal.init(Rw.read(Rw.File.calEvents));
            Gui.setHTML(Gui.GUIElement.note, Rw.read(Rw.File.notes));
          }
          else if (remoteDate < localDate) {
            await client.uploadFrom(nodePath.join(livePath, fileNames[j]), fileNames[j]);
          }
          else if (remoteDate == localDate) {
            console.log("Error: both files are the same - " + fileNames[j]);
          }
          break;
        }
      }
    }
    if (!remoteAvailable){
      await client.uploadFrom(nodePath.join(livePath, fileNames[0]), fileNames[0]);
      await client.uploadFrom(nodePath.join(livePath, fileNames[1]), fileNames[1]);
    }
    endSync(true);
  }
  catch (err) {
    console.log(err);
    endSync(false);
  }
  client.close();
}