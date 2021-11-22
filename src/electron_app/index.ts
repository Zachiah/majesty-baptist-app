import { app, BrowserWindow, session } from "electron";
import { join } from "path";
import { pathToFileURL, format as formatUrl } from "url";
import ipcCommunication from "./ipcCommunication";

const isDevelopment = process.env.NODE_ENV === "development";

const preloadPath = join(__dirname, "preload.js");
console.log(preloadPath);

// follow https://www.electronjs.org/docs/latest/tutorial/security#3-enable-context-isolation-for-remote-content
// for a secure approach;

//TODO: 1), 11), 12), 13), 14), 15),
// 16 DONE! Run yarn update often

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    
    webPreferences: {
      // 2) from security
      nodeIntegration: false,
      preload: preloadPath,

      // 3) from security
      contextIsolation: true,

      // 4) from security
      sandbox: true,

      // 6) from security
      webSecurity: true,

      // 8) from security
      allowRunningInsecureContent: false,

      // 9) from security
      experimentalFeatures: false,

      // 10) from security
      //enableBlinkFeatures: "",

    },
    show: false,
  }).once("ready-to-show", () => {
    win.show();
  });
  if (isDevelopment) {
    win.loadURL("http://localhost:3000");
    win.webContents.toggleDevTools();
  } else {
    win.loadURL(
      pathToFileURL(join(__dirname, "./renderer/index.html")).toString()
    );
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('ready', () => {
  // 7) from security
  const csp = isDevelopment ? ["default-src 'self' localhost:*; style-src 'unsafe-inline' *"] : ["default-src 'self'; style-src 'unsafe-inline' *"]
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": csp,
      },
    });
  });
})

ipcCommunication(app);
