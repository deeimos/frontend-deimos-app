"use client";

import { useParams } from "next/navigation";
import { useServerQuery } from "@/shared/hooks/servers/useServerQuery";
import { Box, Text, Skeleton, Stack, Grid } from "@chakra-ui/react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAccumulatedMetrics } from "@/shared/hooks/metrics/useAccumulatedMetrics";
import { CpuUsageChart } from "@/shared/ui/charts/CpuUsageChart";
import { MemoryUsageChart } from "@/shared/ui/charts/MemoryUsageChart";
import { NetworkTrafficChart } from "@/shared/ui/charts/NetworkTrafficChart";
import { useForecastQuery } from "@/shared/hooks/servers/useForecastQuery";
import GeneralInfo from "@/entities/server/GeneralInfo";
import { ForecastSection } from "@/entities/server/ForecastSection";
import { useEffect } from "react";

const MIN_METRICS_COUNT = 2;

export default function ServerDetailsPage() {
  const params = useParams();
  const id = params.slug as string;
  const { accessToken } = useAuth();

  const { data: server, isLoading: isServerLoading } = useServerQuery(id);
  const { metrics, connected } = useAccumulatedMetrics(id, accessToken);

  return (
    <Box maxW="1640px" mx="auto" py={8} px={4}>
      {isServerLoading || !server ? (
        <Stack spaceY={4}>
          <Skeleton height="32px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <GeneralInfo server={server} />
          {server.is_monitoring_enabled && <ForecastSection serverId={server.id} />}
          {connected && metrics.length >= MIN_METRICS_COUNT ? (
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt="8">
              <CpuUsageChart data={metrics} />
              <MemoryUsageChart data={metrics} />
              <NetworkTrafficChart data={metrics} />
            </Grid>
          ) : (
            <Text>Сбор данных...</Text>
          )}
        </>
      )}
    </Box>
  );
}
