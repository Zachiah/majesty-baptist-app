import { ipcRenderer, contextBridge } from "electron";




const appDataPath = ipcRenderer.sendSync("get-app-data-path");

const readData = (key: string) => {
  ipcRenderer.send("read-data", { key });

  return new Promise<any>((resolve, reject) => {
    ipcRenderer.once("read-data-reply", (event, data) => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.data);
      }
    });
  });
};
const writeData = (key: string, data: any) => {
  ipcRenderer.send("write-data", { key, data });

  return new Promise<any>((resolve, reject) => {
    console.log(ipcRenderer);
    ipcRenderer.once("write-data-reply", (event, data) => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.data);
      }
    });
  });
};



console.log("Coming from preload");

const worldElectron = {
  appDataPath,
  readData,
  writeData
}

declare global {
  interface Window {
    electron: typeof worldElectron;
  }
}

contextBridge.exposeInMainWorld("electron", worldElectron);