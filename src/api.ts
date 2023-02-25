import { ipcRenderer } from "electron";

const api = {
  launchWeb: (url: string) => ipcRenderer.send("launch:web", url),
  closeWeb: () => ipcRenderer.send("close:web"),
};

export default api;
