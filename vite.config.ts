import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@vencord/api"],
  },
});
