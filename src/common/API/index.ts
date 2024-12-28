import axios from "axios";
import { GetStoredAuthToken } from "../hooks/token";
 const baseURL =  process.env.NEXT_PUBLIC_URL || "https://ui62646llb.execute-api.us-east-1.amazonaws.com/prod"
 console.log("backend running on"+ baseURL)
const api = axios.create({
  baseURL: `${baseURL}`,
});

api.interceptors.request.use(
  (config) => {
    const jwt = GetStoredAuthToken();
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (
        status === 401 &&
        data.message === "An error occurred - Token Expired"
      ) {
        // Token has expired, redirect to the login page
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
