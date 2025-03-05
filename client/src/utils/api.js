import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use();

const nPoint = import.meta.env.VITE_API_URL;

export default api;

export { nPoint };
