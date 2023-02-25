import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import preload from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import svgr from "vite-plugin-svgr";
import pkg from "./package.json";

let preloadHasReady = false;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });

  const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;

  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    plugins: [
      react(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: "electron/main.ts",
        },
        {
          entry: "electron/preload.ts",
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload();
          },
        },
      ]),
      // Preload scripts
      preload({
        entry: ["electron/preload/index.ts"],
        vite: {
          build: {
            minify: false,
            outDir: "dist-electron/preload",
          },
        },
        onstart(args) {
          if (preloadHasReady) {
            args.reload();
          } else {
            preloadHasReady = true;
            args.startup();
          }
        },
      }),
      // Use Node.js API in the Renderer process
      renderer({
        nodeIntegration: true,
      }),
      svgr(),
    ],
    server: !!process.env.VSCODE_DEBUG
      ? (() => {
          const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
          return {
            host: url.hostname,
            port: +url.port,
          };
        })()
      : undefined,
    clearScreen: false,
  };
});
