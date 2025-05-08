import { LoginType, RegisterType, UserType, TokensType } from "../../types/user.type";
import { api } from "../api";

export default class AuthService {
  static async Login(data: LoginType) {
    return api.post<UserType>(`/auth/login`, data);
  }
  static async Register(data: RegisterType) {
    return api.post(`/auth/register`, data);
  }
  static async Refresh(refreshToken: string) {
    return api.post<TokensType>(`/auth/refresh`, { refresh_token: refreshToken });
  }
}
