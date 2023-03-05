import { Menu, MenuItem } from "electron";
import { backToHome } from "./utils";

export default function initMenu() {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Electron",
      submenu: [
        {
          role: "front",
          accelerator: process.platform === "darwin" ? "Cmd+W" : "Ctrl+W",
          click: () => backToHome(),
        },
      ],
    }),
  );

  Menu.setApplicationMenu(menu);
}
