import { BASE_URL } from "@/constants";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: BASE_URL,
//   withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An unexpected error occurred.";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
