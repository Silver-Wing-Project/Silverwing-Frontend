// For base configurations of Axios

import axios from 'axios';

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
  (response) => {
    // You can add any response interceptors here if needed
    return response;
  },
  (error) => {
    // Handle common errors
    const errorResponse = error.response;
    if (errorResponse) {
      // You can handle specific error codes here
      switch (errorResponse.status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized request');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Request failed with status: ${errorResponse.status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;