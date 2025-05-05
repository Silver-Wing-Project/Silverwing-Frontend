import axiosInstance from '@/api/config/axios-config';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClientResponse, ErrorResponse } from '@/types/clientResponse.type';
import { ApiError } from '@/api/config/api-error';

export class BaseClient {
  base: string | undefined;

  constructor(base: string = process.env.NEXT_PUBLIC_SERVER_URL!) {
    this.base = base;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    if (!this.base) {
      throw new Error("Base URL is not defined");
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${this.base}/${endpoint}`,
      withCredentials: true,
      ...options,
    };

    // Add default headers if none are provided
    if (!config.headers) {
      config.headers = {
        "Content-Type": "application/json",
      };
    }

    if (method !== "GET" && method !== "DELETE" && body != null) {
      config.data = body;
    }

    try {
      const response: AxiosResponse<T> = await axiosInstance(config);

      // Check content type - similar to fetch implementation
      const contentType = String(response.headers["content-type"] || "");
      if (contentType && contentType.includes("application/json")) {
        return { data: response.data };
      } else {
        return { data: {} as T };
      }
    } catch (error) {
      console.error("An error occurred", error);
      if (error instanceof AxiosError && error.response) {
        const errorData: ErrorResponse = error.response.data;
        throw new ApiError(
          errorData.statusCode || error.response.status,
          errorData.message || error.message,
          errorData.error || "API Error"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  // Utility methods to make API calls more convenient

  async get<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "GET", undefined, options);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "POST", data, options);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "PUT", data, options);
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "PATCH", data, options);
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "DELETE", undefined, options);
  }
}