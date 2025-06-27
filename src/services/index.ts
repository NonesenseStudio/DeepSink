import axios from "axios";
import { notification } from "@/utils";
import { refreshToken } from "@/services/user.ts";

const mode = import.meta.env.MODE;
const baseUrl =
  mode === "development" ? "/api" : import.meta.env.VITE_TARGET_URL;
const token = localStorage.getItem("access_token");
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.params) {
      config.params = {}; // 如果没有参数对象，则创建一个
    }
    return config;
  },
  async (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    const refresh_token = localStorage.getItem("refresh_token");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenResponse = await refreshToken(
          refresh_token as string,
        );
        const newAccessToken = refreshTokenResponse.access_token;
        localStorage.setItem("access_token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        notification.error({
          content: "登录已过期，请重新登录",
          duration: 3000,
        });
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // 重定向到登录页面
        return Promise.reject(refreshError);
      }
    }
    notification.error({
      content: error.response.data.error || "未知错误",
      duration: 3000,
    });
    console.error(`Error with request to ${originalRequest.url}:`, error);
    return Promise.reject(error);
  },
);

const instance = {
  // 创建一个方法来发送请求
  request: async (method: any, url: string, options = {}) => {
    try {
      // 发送请求
      const response = await axiosInstance({
        method: method,
        url: url,
        ...options,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  get: (url: string, options?: any) => instance.request("get", url, options),
  post: (url: string, data?: any, options: any = null) =>
    instance.request("post", url, { data, ...options }),
  put: (url: string, data: any, options?: any) =>
    instance.request("put", url, { data, ...options }),
  delete: (url: string, options?: any) =>
    instance.request("delete", url, options),
};

export default instance;
