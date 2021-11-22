import { App, ipcMain } from "electron";

export default (app: App) => {
  ipcMain.on("get-app-data-path", (event) => {
    event.returnValue = app.getPath("userData");
  });
};
