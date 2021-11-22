import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    ipcRenderer: typeof Electron.ipcRenderer;
  }
}

console.log("Coming from preload");

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
