import { defineConfig } from "vite";
import path from "path";
import typescript from "@rollup/plugin-typescript";
console.log(path.resolve(__dirname, "./src"));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SubtitleMerger",
      fileName: (format) => `${format}/index.js`,
    },
  },
  plugins: [
    typescript({
      target: "es5",
      sourceMap: true,
      rootDir: path.resolve(__dirname, "src"),
      declaration: true,
      declarationDir: path.resolve(__dirname, "dist/types"),
      exclude: path.resolve(__dirname, "node_modules/**"),
      allowSyntheticDefaultImports: true,
    }),
  ],
});
