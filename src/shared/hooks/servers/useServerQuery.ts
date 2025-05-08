import { useQuery } from "@tanstack/react-query";
import ServersService from "@/shared/api/services/server.service";
import { ServerModel } from "@/shared/types/server.type";

export function useServerQuery(id: string) {
  return useQuery<ServerModel>({
    queryKey: ["server", id],
    queryFn: async () => {
      const encryptedServer = (await ServersService.Get(id)).data;
      const decrypted = await ServersService.decryptServer(encryptedServer);
      return {
        ...decrypted.data,
        id: encryptedServer.id,
        is_monitoring_enabled: encryptedServer.is_monitoring_enabled,
        is_server_enabled: encryptedServer.is_server_enabled,
        created_at: encryptedServer.created_at,
      };
    },
    refetchInterval: 60 * 1000,
  });
}
