import { LoginType, RegisterType, UserType, TokensType } from "../../types/user.type";
import { backendApi } from "../api";

export default class AuthService {
  static async Login(data: LoginType) {
    return backendApi.post<UserType>(`/auth/login`, data);
  }
  static async Register(data: RegisterType) {
    return backendApi.post(`/auth/register`, data);
  }
  static async Refresh(refreshToken: string) {
    return backendApi.post<TokensType>(`/auth/refresh`, { refresh_token: refreshToken });
  }
}
