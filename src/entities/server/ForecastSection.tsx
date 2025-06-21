import { useForecastQuery } from "@/shared/hooks/servers/useForecastQuery";
import { ForecastAvailabilityChart } from "@/shared/ui/charts/ForecastAvailabilityChart";
import { Box, Text, Skeleton, SkeletonText } from "@chakra-ui/react";

interface IForecastSection {
  serverId?: string;
  isLoading: boolean;
  hasForecast: boolean;
  isEnabled: boolean;
}

const ForecastSkeleton = () => {
  return (
    <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" bg="bg.primary" height="100%" mt={6}>
      <SkeletonText noOfLines={1} mb={2} width="70%" />
      <Skeleton height="180px" mb={4} />
      <SkeletonText noOfLines={1} width="90%" />
    </Box>
  );
};
export function ForecastSection({ serverId, isLoading, hasForecast, isEnabled }: IForecastSection) {
  if (!hasForecast || !isEnabled) return <Box height="100%" />;
  if (!serverId) return <ForecastSkeleton />;

  const { data: forecast, isLoading: isForecastLoading, error } = useForecastQuery(serverId);
  if (isLoading || isForecastLoading) return <ForecastSkeleton />;

  if (error || !forecast) {
    return (
      <Text color="red.500" mt={3}>
        Не удалось получить прогноз
      </Text>
    );
  }

  const nextForecast = forecast.forecasts[0];
  const threshold = 0.95;
  const isAvailable = nextForecast.availability_probability >= threshold;

  return (
    <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" bg="bg.primary" height="100%" mt={6}>
      <Text mb={2} fontWeight="bold" fontSize="lg" color="text.secondary">
        Прогноз доступности на 12 часов
      </Text>
      <ForecastAvailabilityChart data={forecast.forecasts} />
      <Text mt={4}>
        Вероятность доступности сервера через 1 час{" "}
        <span style={{ color: isAvailable ? "#1dc94c" : "#ef4444", fontWeight: 600 }}>
          {(nextForecast.availability_probability * 100).toFixed(2)}%
        </span>
      </Text>
    </Box>
  );
}
