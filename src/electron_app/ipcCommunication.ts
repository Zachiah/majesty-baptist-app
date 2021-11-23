import { App, ipcMain } from "electron";

import { app } from "electron";
import { join } from "path";
import { constants as fsConstants, writeFile, readFile, access } from "fs";
import { promisify } from "util";

const writeFilePromise = promisify(writeFile);
const readFilePromise = promisify(readFile);
const accessPromise = promisify(access);

function checkFileExists(file: string) {
  return accessPromise(file, fsConstants.F_OK)
    .then(() => true)
    .catch(() => false);
}

const writeData = async (data: any, key: string) => {
  // ensure key is alphanumeric and if not throw an error
  if (!key.match(/^[a-zA-Z0-9]+$/)) {
    throw new Error("Invalid key");
  }

  return await writeFilePromise(
    join(app.getPath("userData"), `${key}.json`),
    JSON.stringify(data, null, 2)
  );
};

const readData = async (key: string) => {
  // ensure key is alphanumeric and if not throw an error
  if (!key.match(/^[a-zA-Z0-9]+$/)) {
    throw new Error("Invalid key");
  }

  if (!(await checkFileExists(join(app.getPath("userData"), `${key}.json`)))) {
    return null;
  }
  return JSON.parse(
    (
      await readFilePromise(join(app.getPath("userData"), `${key}.json`))
    ).toString()
  );
};

export default (app: App) => {
  ipcMain.on("get-app-data-path", (event) => {
    event.returnValue = app.getPath("userData");
  });

  ipcMain.on("write-data", async (event,arg) => {
    await writeData(arg.data, arg.key);
    event.reply("write-data-reply", { success: true });
  });

  ipcMain.on("read-data", async (event, arg) => {
    const data = await readData(arg.key);
    event.reply("read-data-reply", { data });
  });
};
