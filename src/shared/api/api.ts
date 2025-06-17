import axios from "axios";
import { getCookie } from "cookies-next";
import AuthService from "./services/auth.service";
import TokenService from "./services/token.service";


export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const backendApi = axios.create({
  baseURL: "/backend-api",
  withCredentials: true,
});

backendApi.interceptors.request.use((config) => {
  if (!config.headers.Authorization && typeof window !== "undefined") {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

backendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const refreshToken = getCookie("refresh_token") as string;
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await AuthService.Refresh(refreshToken);
        TokenService.setTokens(data);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return backendApi.request(originalRequest);
      } catch (e) {
        TokenService.removeTokens();
        console.error("Ошибка при обновлении токена:", e);
      }
    }

    return Promise.reject(error);
  }
);
