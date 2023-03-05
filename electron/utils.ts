import { BrowserWindow } from "electron";

let win: BrowserWindow | null = null;

export function init({ mainWin }: { mainWin: BrowserWindow }) {
  win = mainWin;
  listenForInput(win.webContents);
}

export function backToHome() {
  win.webContents.send("back-to-home");
}

export function listenForInput(contents: Electron.WebContents) {
  contents.on("before-input-event", (e, input) => {
    switch (input.code) {
      case "ContextMenu":
        backToHome();
        break;
    }
  });
}
