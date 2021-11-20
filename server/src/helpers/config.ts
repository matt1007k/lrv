require("dotenv").config();
export const PORT = process.env.PORT || 4500;
export const API_URL = process.env.API_URL || `http://localhost:${PORT}`;
export const SECRET_KEY =
  process.env.TOKEN_SECRET_KEY || "dfsdfsdfsdfssdfseljgaourter";
export const STORAGE_URL = `${API_URL}/storage/`;
export const MAIL_HOST = process.env.MAIL_HOST;
export const WEB_URL = process.env.WEB_URL;
