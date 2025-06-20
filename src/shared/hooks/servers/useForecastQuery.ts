import { useQuery } from "@tanstack/react-query";
import ServersService from "@/shared/api/services/server.service";
import { ServerForecast } from "@/shared/types/server.type";

export function useForecastQuery(id: string) {
  return useQuery<ServerForecast>({
    queryKey: ["serverForecast", id],
    queryFn: async () => {
      const forecast = (await ServersService.forecast(id)).data;
      return forecast;
    },
    refetchInterval: 60 * 1000,
  });
}
