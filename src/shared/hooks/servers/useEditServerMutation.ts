import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServersService from "@/shared/api/services/server.service";
import { ServerFormValues, ServerModel } from "@/shared/types/server.type";

type EditServerPayload = ServerFormValues & { id: string };

export function useEditServerMutation(options?: { onSuccess?: () => void; onError?: (error: unknown) => void }) {
  const queryClient = useQueryClient();

  return useMutation<ServerModel, unknown, EditServerPayload>({
    mutationFn: async ({ id, ...payload }) => {
      const encrypted = await ServersService.encryptServer(payload);
      const { data } = await ServersService.Update({
        ...encrypted.data,
        id,
        is_monitoring_enabled: payload.is_monitoring_enabled,
      });
      await queryClient.invalidateQueries({ queryKey: ["server"] });
      await queryClient.invalidateQueries({ queryKey: ["servers"] });
      return data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
