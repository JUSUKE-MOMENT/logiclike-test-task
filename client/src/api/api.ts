import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.error || "Server error");
    } else if (error.request) {
      throw new Error("Network error - please check your connection");
    } else {
      throw new Error("Request configuration error");
    }
  }
);
