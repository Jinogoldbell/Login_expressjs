import axios from "axios";

// Vite's dev server proxies "/api" to the Express backend (see vite.config.js),
// so this works in dev without any extra configuration.
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
