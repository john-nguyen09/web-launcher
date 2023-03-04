import { release } from "node:os";
import { join } from "node:path";

import {
  app,
  BrowserView,
  BrowserWindow,
  components,
  ipcMain,
  screen,
  shell,
} from "electron";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main.js       > Electron-Main
// │ └─┬ preload.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname);
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "./preload.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
console.log(process.env.DIST);

async function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;
  win = new BrowserWindow({
    title: "Main window",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      contextIsolation: true,
    },
    width,
    height,
    fullscreen: true,
    kiosk: true,
    frame: false,
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  const view = new BrowserView();
  win.addBrowserView(view);
  view.setBounds({ x: 0, y: height, width: 0, height: 0 });

  ipcMain.on("launch:web", (e, url, { injectionJS, injectionCSS }) => {
    view.setBounds({
      x: 0,
      y: 0,
      width,
      height: height,
    });
    view.webContents.loadURL(url);

    const { webContents: contents } = view;

    contents.openDevTools();
    contents.on("did-finish-load", () => {
      if (injectionCSS) {
        contents.insertCSS(injectionCSS);
      }
      if (injectionJS) {
        contents.executeJavaScript(injectionJS);
      }
    });
  });

  ipcMain.on("close:web", () => {
    view.setBounds({ x: 0, y: height, width: 0, height: 0 });
    view.webContents.loadURL("");
  });
}

app.whenReady().then(async () => {
  await components.whenReady();
  console.log("components ready:", components.status());
  await createWindow();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
