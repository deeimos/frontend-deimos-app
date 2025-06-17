import { useMutation, useQueryClient } from "@tanstack/react-query";
import ServersService from "@/shared/api/services/server.service";
import { ServerFormValues, ServerModel } from "@/shared/types/server.type";

export function useAddServerMutation(options?: { onSuccess?: () => void; onError?: (error: unknown) => void }) {
  const queryClient = useQueryClient();

  return useMutation<
    ServerModel,
    unknown,
    ServerFormValues
  >({
    mutationFn: async (payload) => {
      const encrypted = await ServersService.encryptServer(payload);
      const { data } = await ServersService.Create({...encrypted.data, is_monitoring_enabled: payload.is_monitoring_enabled });
      await queryClient.invalidateQueries({ queryKey: ["server"] });
      await queryClient.invalidateQueries({ queryKey: ["servers"] });
      return data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
