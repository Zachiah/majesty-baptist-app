import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import windiPlugin from "vite-plugin-windicss";
import {resolve} from "path";

const outDirRenderer = resolve(__dirname, "./app/renderer");


export default defineConfig({
  plugins: [windiPlugin(),solidPlugin()],

  // This line makes vite output relative paths instead of absolute paths.
  base: "./",

  build: {
    // This line sets the outdir to the outdir recognized by electron
    outDir: outDirRenderer,

    // Empty out dir before build
    emptyOutDir: true,
    
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
