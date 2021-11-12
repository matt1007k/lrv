const config = {
  API_URL_BASE: import.meta.env.VITE_API_URL || "http://localhost:4500",
  API_URL: import.meta.env.VITE_API_URL + "/api" || "http://localhost:4500/api",
};

export default config;
