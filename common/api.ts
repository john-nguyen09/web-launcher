import { ipcRenderer } from "electron";

export interface LaunchWebOptions {
  injectionJS?: string;
  injectionCSS?: string;
}

const api = {
  launchWeb: (url: string, options: LaunchWebOptions) =>
    ipcRenderer.send("launch:web", url, options),
  closeWeb: () => ipcRenderer.send("close:web"),
};

export default api;
