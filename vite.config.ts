import { rmSync } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { build } from "esbuild";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import svgr from "vite-plugin-svgr";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });

  await build({
    entryPoints: ["./src/lib/injection/netflix.inline.ts"],
    bundle: true,
    outfile: "./src/lib/injection/netflix.js",
  });

  return {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    plugins: [
      react(),
      svgr(),
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
    ],
    server: process.env.VSCODE_DEBUG
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
