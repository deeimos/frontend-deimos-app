import { EncryptedCreateServerModel, EncryptedServerModel, ServerModel } from "../../types/server.type";
import getApiHeaders from "../../utils/getApiHeaders";
import { api } from "../api";

export default class ServerService {
  static async getList(token?: string) {
    return api.get<EncryptedServerModel[]>(`/server/list`, { ...getApiHeaders(token) });
  }
  static async Get(id: string, token?: string) {
    return api.get<EncryptedServerModel>(`/server`, { params: { id }, ...getApiHeaders(token) });
  }
  static async Create(data: EncryptedCreateServerModel, token: string) {
    return api.post(`/server/create`, data, { ...getApiHeaders(token) });
  }
  static async Update(data: EncryptedServerModel, token: string) {
    return api.put(`/server/update`, data, { ...getApiHeaders(token) });
  }
  static async Delete(id: string, token: string) {
    return api.put(`/server/delete`, { params: { id }, ...getApiHeaders(token) });
  }
  static async encryptServer(data: ServerModel) {
    return api.post<EncryptedServerModel>("/encrypt", data);
  }
  static async decryptServer(data: EncryptedServerModel) {
    return api.post<ServerModel>("/decrypt", data);
  }
}
