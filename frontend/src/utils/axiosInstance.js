import axios from "axios";

const apiBase =
    import.meta?.env?.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && window.__API_BASE__) ||
  "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});
