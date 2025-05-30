import { EncryptedCreateServerModel, EncryptedServerModel, ServerModel } from "../../types/server.type";
import getApiHeaders from "../../utils/getApiHeaders";
import { api, backendApi } from "../api";

export default class ServerService {
  static async getList(token?: string) {
    return backendApi.get<EncryptedServerModel[]>(`/server/list`, { ...getApiHeaders(token) });
  }
  static async Get(id: string, token?: string) {
    return backendApi.get<EncryptedServerModel>(`/server`, { params: { id }, ...getApiHeaders(token) });
  }
  static async Create(data: EncryptedCreateServerModel, token: string) {
    return backendApi.post(`/server/create`, data, { ...getApiHeaders(token) });
  }
  static async Update(data: EncryptedServerModel, token: string) {
    return backendApi.put(`/server/update`, data, { ...getApiHeaders(token) });
  }
  static async Delete(id: string, token: string) {
    return backendApi.put(`/server/delete`, { params: { id }, ...getApiHeaders(token) });
  }
  static async encryptServer(data: ServerModel) {
    return api.post<EncryptedServerModel>("/encrypt", data);
  }
  static async decryptServer(data: EncryptedServerModel) {
    return api.post<ServerModel>("/decrypt", data);
  }
}
