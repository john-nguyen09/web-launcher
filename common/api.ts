import { ipcRenderer } from "electron";

export interface LaunchWebOptions {
  injectionJS?: string;
  injectionCSS?: string;
  userAgent?: string;
}

const api = {
  launchWeb: (url: string, options: LaunchWebOptions) =>
    ipcRenderer.send("launch:web", url, options),
  closeWeb: () => ipcRenderer.send("close:web"),
  onBackToHome: (callback: () => void) => ipcRenderer.on("back-to-home", callback),
  log: (message: string) => ipcRenderer.send("log:message", message),
};

export default api;
