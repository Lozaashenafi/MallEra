import axios from "axios";
import getAuth from "./authHeader";
const serverURL = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL: serverURL,
  withCredentials: true,
});

// Set the token in the request headers
instance.interceptors.request.use(async (config) => {
  const data = await getAuth();
  console.log(data.token);
  const token = data.token;
  if (token) {
    config.headers = {
      "x-access-token": token,
    };
  }
  return config;
});

export default instance;
