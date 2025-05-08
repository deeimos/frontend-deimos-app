import { UserInfoType } from "../../types/user.type";
import getApiHeaders from "../../utils/getApiHeaders";
import { api } from "../api";

export default class UserService {
  static async getUser(token?: string) {
    return api.get<UserInfoType>(`/user/me`, { ...getApiHeaders(token) });
  }
}
