"use client";

import { Box, Grid, Skeleton, Heading } from "@chakra-ui/react";
import { CpuUsageChart } from "@/shared/ui/charts/CpuUsageChart";
import { MemoryUsageChart } from "@/shared/ui/charts/MemoryUsageChart";
import { NetworkTrafficChart } from "@/shared/ui/charts/NetworkTrafficChart";
import { LoadAverageChart } from "@/shared/ui/charts/LoadAverageChart";
import { ServerMetricModel } from "@/shared/types/server.type";

const MIN_METRICS_COUNT = 2;

interface IMonitoringSection {
  isLoading: boolean;
  isEnabled: boolean;
  metrics: ServerMetricModel[];
  connected: boolean;
}

const MonitoringSkeleton = () => (
  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt="8">
    <Skeleton height="260px" />
    <Skeleton height="260px" />
    <Skeleton height="260px" />
    <Skeleton height="260px" />
  </Grid>
);

export default function MonitoringSection({ isLoading, isEnabled, metrics, connected }: IMonitoringSection) {
  if (!isEnabled) return <Grid height="100%" />;

  if (isLoading || !connected || metrics.length < MIN_METRICS_COUNT) return <MonitoringSkeleton />;

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt="6">
      <Box p={3} borderWidth="1px" bg="bg.primary" borderRadius="2xl" boxShadow="md">
        <Heading size="md" mb={2} color="text.secondary">
          Нагрузка процессора
        </Heading>
        <CpuUsageChart data={metrics} />
      </Box>
      <Box p={3} borderWidth="1px" bg="bg.primary" borderRadius="2xl" boxShadow="md">
        <Heading size="md" mb={2} color="text.secondary">
          Использование ОЗУ
        </Heading>
        <MemoryUsageChart data={metrics} />
      </Box>
      <Box p={3} borderWidth="1px" bg="bg.primary" borderRadius="2xl" boxShadow="md">
        <Heading size="md" mb={2} color="text.secondary">
          Сетевой трафик
        </Heading>
        <NetworkTrafficChart data={metrics} />
      </Box>
      <Box p={3} borderWidth="1px" bg="bg.primary" borderRadius="2xl" boxShadow="md">
        <Heading size="md" mb={2} color="text.secondary">
          Средняя нагрузка
        </Heading>
        <LoadAverageChart data={metrics} />
      </Box>
    </Grid>
  );
}
