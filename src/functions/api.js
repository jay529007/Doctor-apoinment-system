import axios from "axios";

const api = axios.create({
  baseURL: "https://json-lldi.onrender.com/api",
  // baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is due to network issues or server is down
    if (!error.response) {
      console.error("Network error or server is down:", error.message);
      // You can add retry logic here if needed
    }
    
    return Promise.reject(error);
  }
);

export default api;
