"use client";

import { Box, Text, VStack, SkeletonText, Heading } from "@chakra-ui/react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAccumulatedMetrics } from "@/shared/hooks/metrics/useAccumulatedMetrics";
import { ServerMetricModel } from "@/shared/types/server.type";

interface ISystemInfo {
  isLoading: boolean;
  isEnabled: boolean;
  metrics: ServerMetricModel[];
  connected: boolean;
}

function formatBytesGB(bytes: number) {
  return bytes ? `${bytes.toFixed(2)} ГБ` : "—";
}

function formatUptime(sec: number) {
  if (!sec || sec < 0) return "—";
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  return `${days > 0 ? days + "д " : ""}${hours}ч ${mins}м`;
}

export default function SystemInfo({ isLoading, isEnabled, metrics, connected }: ISystemInfo) {
  if (!isEnabled) return <Box height="100%" />;

  if (isLoading || !connected || !metrics || !metrics.length) {
    return (
      <Box p={6}  borderWidth="1px" borderRadius="lg" boxShadow="md" bg="bg.primary" height="100%">
        <SkeletonText noOfLines={1} width="60%" mb={2} />
        <SkeletonText noOfLines={1} width="40%" mb={2} />
        <SkeletonText noOfLines={1} width="80%" mb={2} />
        <SkeletonText noOfLines={1} width="50%" mb={2} />
        <SkeletonText noOfLines={1} width="30%" mb={2} />
      </Box>
    );
  }

  const latest = metrics[metrics.length - 1];
  // временно, потом название поменяется
  const totalGB = latest.disk_usage || 0;
  const freeGB = latest.disk_write || 0;
  const usedGB = totalGB && freeGB ? Math.max(totalGB - freeGB, 0) : null;
  return (
    <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" bg="bg.primary" height="100%">
      <Heading
        as="h2"
        size="xl"
        color="text.secondary"
        minW={0}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        Информация о системе:
      </Heading>
      <VStack align="start" spaceY={3} mt={3}>
        <Text>
          <strong>Ядер ЦП:</strong> {latest.cpu_core_count || "—"}
        </Text>
        {latest.temperature > 0 && (
          <Text>
            <strong>Частота процессора:</strong> {latest.temperature.toFixed(0)} МГц
          </Text>
        )}
        <Text>
          <strong>Объем ОЗУ:</strong> {formatBytesGB(latest.total_memory)}
        </Text>
        <Text>
          <strong>Использовано ПЗУ:</strong>{" "}
          {usedGB !== null && totalGB ? `${usedGB.toFixed(1)} ГБ / ${totalGB.toFixed(1)} ГБ` : "—"}
        </Text>
        <Text>
          <strong>Время работы:</strong> {formatUptime(latest.uptime_seconds)}
        </Text>
        <Text>
          <strong>Активные процессы:</strong> {latest.process_count ?? "—"}
        </Text>
      </VStack>
    </Box>
  );
}
