import { EncryptedCreateServerModel, EncryptedServerModel, ServerModel, ServerFormValues } from "../../types/server.type";
import getApiHeaders from "../../utils/getApiHeaders";
import { api, backendApi } from "../api";

export default class ServerService {
  static async getList(token?: string) {
    return backendApi.get<EncryptedServerModel[]>(`/server/list`, { ...getApiHeaders(token) });
  }
  static async Get(id: string, token?: string) {
    return backendApi.get<EncryptedServerModel>(`/server`, { params: { id }, ...getApiHeaders(token) });
  }
  static async Create(data: EncryptedCreateServerModel) {
    return backendApi.post(`/server/create`, data);
  }
  static async Update(data: EncryptedServerModel) {
    return backendApi.put(`/server/update`, data);
  }
  static async Delete(id: string) {
    return backendApi.put(`/server/delete`, { params: { id }});
  }
  static async encryptServer(data: ServerFormValues) {
    return api.post<EncryptedServerModel>("/encrypt", data);
  }
  static async decryptServer(data: EncryptedServerModel) {
    return api.post<ServerModel>("/decrypt", data);
  }
}
