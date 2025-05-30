import { UserInfoType } from "../../types/user.type";
import getApiHeaders from "../../utils/getApiHeaders";
import { backendApi } from "../api";

export default class UserService {
  static async getUser(token?: string) {
    return backendApi.get<UserInfoType>(`/user/me`, { ...getApiHeaders(token) });
  }
}
