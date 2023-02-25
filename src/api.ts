import { ipcRenderer } from "electron";

const api = {
  launchWeb: (url: string) => ipcRenderer.send("launch:web", url),
};

export default api;
