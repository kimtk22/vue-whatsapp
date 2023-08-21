import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      vue: path.resolve(`./node_modules/vue`),
      icons: path.relative(__dirname, "node_modules/vue-material-design-icons"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [vue()],
});
