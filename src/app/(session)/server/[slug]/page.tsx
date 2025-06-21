"use client";

import { useParams } from "next/navigation";
import { useServerQuery } from "@/shared/hooks/servers/useServerQuery";
import { Box, Skeleton, Stack, Grid, GridItem } from "@chakra-ui/react";
import GeneralInfo from "@/entities/server/GeneralInfo";
import { ForecastSection } from "@/entities/server/ForecastSection";
import MonitoringSection from "@/entities/server/MonitoringSection";
import SystemInfo from "@/entities/server/SystemInfo";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAccumulatedMetrics } from "@/shared/hooks/metrics/useAccumulatedMetrics";

export default function ServerDetailsPage() {
  const params = useParams();
  const id = params.slug as string;

  const { data: server, isLoading } = useServerQuery(id);
  const hasForecast = server ? server.is_monitoring_enabled : true;
  const isEnabled = server ? server.is_server_enabled : true;

  const { accessToken } = useAuth();
  const { metrics, connected } = useAccumulatedMetrics(id, accessToken);

  return (
    <Box maxW="1640px" mx="auto" py={8} px={4}>
      <Grid
        templateColumns={!isEnabled ? { base: "1fr" } : { base: "1fr", xl: "1fr 1fr" }}
        gap={6}
        alignItems="stretch"
      >
        <GridItem height="100%" colSpan={!isEnabled ? 2 : 1}>
          <GeneralInfo server={server} isLoading={isLoading} />
        </GridItem>
        {isEnabled && (
          <GridItem height="100%">
            <SystemInfo isLoading={isLoading} isEnabled={isEnabled} metrics={metrics} connected={connected} />
          </GridItem>
        )}
      </Grid>
      <ForecastSection serverId={server?.id} hasForecast={hasForecast} isEnabled={isEnabled} isLoading={isLoading} />
      <MonitoringSection isEnabled={isEnabled} isLoading={isLoading} metrics={metrics} connected={connected} />
    </Box>
  );
}
