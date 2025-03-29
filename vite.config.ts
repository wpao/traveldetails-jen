import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // atau gunakan '0.0.0.0' jika perlu
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "edad-66-96-225-72.ngrok-free.app" // Tambahkan domain dari error message
    ]
  }
})
// https://edad-66-96-225-72.ngrok-free.app