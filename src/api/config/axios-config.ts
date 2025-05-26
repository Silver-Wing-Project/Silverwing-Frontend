import axios from 'axios';
import { ApiError } from "@/api/config/api-error";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here if needed
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error.response;
    if (errorResponse) {
      const { status, data } = errorResponse;
      throw new ApiError(
        status,
        data?.message || `Request failed with status: ${status}`,
        data?.error || 'API Error'
      );
    } else if (error.request) {
      throw new ApiError(0, 'No response received from server', '');
    } else {
      throw new ApiError(0, error.message, '');
    }
  }
);

export default axiosInstance;