import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // change output directory (choose either 'build' or 'dist')
    outDir: "dist", // ✅ updated from second config
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"],
  },
});
