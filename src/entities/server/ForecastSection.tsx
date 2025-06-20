import { useForecastQuery } from "@/shared/hooks/servers/useForecastQuery";
import { ForecastAvailabilityChart } from "@/shared/ui/charts/ForecastAvailabilityChart";
import { Box, Text, Skeleton, Stack } from "@chakra-ui/react";

export function ForecastSection({ serverId }: { serverId: string }) {
  const { data: forecast, isLoading, error } = useForecastQuery(serverId);

  if (isLoading) {
    return <Skeleton height={200} />;
  }
  if (error || !forecast) {
    return <Text color="red.500">Не удалось получить прогноз</Text>;
  }


  const nextForecast = forecast.forecasts[0];
  const threshold = 0.95;
  const isAvailable = nextForecast.availability_probability >= threshold;

  return (
    <Box p={6} mt={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="bg.primary">
      <Text mb={2} fontWeight="bold" fontSize="lg">
        Прогноз доступности на ближайший час
      </Text>
      <ForecastAvailabilityChart data={forecast.forecasts} />
      <Text mt={4}>
        Вероятность доступности сервера через 10 минут:{" "}
        <span style={{ color: isAvailable ? "#1dc94c" : "#ef4444", fontWeight: 600 }}>
          {(nextForecast.availability_probability * 100).toFixed(2)}%
        </span>
      </Text>
    </Box>
  );
}
