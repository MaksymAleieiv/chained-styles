import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    web: "src/web/index.ts",
    native: "src/native/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
