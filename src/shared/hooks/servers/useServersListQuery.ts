import { useQuery } from "@tanstack/react-query";
import ServersService from "@/shared/api/services/server.service";
import { ServerModel, EncryptedServerModel } from "@/shared/types/server.type";

export function useServersQuery() {
  return useQuery<ServerModel[]>({
    queryKey: ["servers"],
    queryFn: async () => {
      const encryptedServers = (await ServersService.getList()).data;

      const decryptedServers = await Promise.all(
        encryptedServers.map(async (srv: EncryptedServerModel) => {
          const { data } = await ServersService.decryptServer(srv);

          return {
            ...data,
            id: srv.id,
            is_monitoring_enabled: srv.is_monitoring_enabled,
            is_server_enabled: srv.is_server_enabled,
            created_at: srv.created_at,
          };
        })
      );

      return decryptedServers;
    },
    refetchInterval:  60 * 1000,
  });
}
