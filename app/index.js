var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/electron_app/index.ts
var import_electron2 = __toModule(require("electron"));
var import_path = __toModule(require("path"));
var import_url = __toModule(require("url"));

// src/electron_app/ipcCommunication.ts
var import_electron = __toModule(require("electron"));
var ipcCommunication_default = (app2) => {
  import_electron.ipcMain.on("get-app-data-path", (event) => {
    event.returnValue = app2.getPath("userData");
  });
};

// src/electron_app/index.ts
var isDevelopment = process.env.NODE_ENV === "development";
var preloadPath = (0, import_path.join)(__dirname, "preload.js");
console.log(preloadPath);
function createWindow() {
  const win = new import_electron2.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: preloadPath,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    },
    show: false
  }).once("ready-to-show", () => {
    win.show();
  });
  if (isDevelopment) {
    win.loadURL("http://localhost:3000");
    win.webContents.toggleDevTools();
  } else {
    win.loadURL((0, import_url.pathToFileURL)((0, import_path.join)(__dirname, "./renderer/index.html")).toString());
  }
}
import_electron2.app.whenReady().then(createWindow);
import_electron2.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron2.app.quit();
  }
});
import_electron2.app.on("activate", () => {
  if (import_electron2.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
import_electron2.app.on("ready", () => {
  const csp = isDevelopment ? ["default-src 'self' localhost:*; style-src 'unsafe-inline' *"] : ["default-src 'self'; style-src 'unsafe-inline' *"];
  import_electron2.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": csp
      }
    });
  });
});
ipcCommunication_default(import_electron2.app);
//# sourceMappingURL=index.js.map
