"use client";

import { useParams } from "next/navigation";
import { useServerQuery } from "@/shared/hooks/servers/useServerQuery";
import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Skeleton,
  Stack,
  Status,
  Button,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";
import AddEditServerModal from "@/entities/server/AddEditModal";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAccumulatedMetrics } from "@/shared/hooks/metrics/useAccumulatedMetrics";
import { CpuUsageChart } from "@/shared/ui/charts/CpuUsageChart";
import { MemoryUsageChart } from "@/shared/ui/charts/MemoryUsageChart";
import { NetworkTrafficChart } from "@/shared/ui/charts/NetworkTrafficChart";
import { parseUTC } from "@/shared/utils/parseUTC";

const MIN_METRICS_COUNT = 2;

export default function ServerDetailsPage() {
  const params = useParams();
  const id = params.slug as string;
  const { accessToken } = useAuth();

  const { open, onOpen, onClose } = useDisclosure();
  const { data: server, isLoading } = useServerQuery(id);
  const { metrics, connected } = useAccumulatedMetrics(id, accessToken);

  return (
    <Box maxW="1640px" mx="auto" py={8} px={4}>
      {isLoading || !server ? (
        <Stack spaceY={4}>
          <Skeleton height="32px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="bg.primary">
            <Box mb={4} display="flex" justifyContent="space-between">
              <Heading size="lg">{server.display_name}</Heading>
            </Box>
            <VStack align="start" spaceY={3}>
              <Text>
                <strong>IP:</strong> {server.ip}
              </Text>
              <Text>
                <strong>Порт:</strong> {server.port}
              </Text>
              <Text>
                <strong>Добавлен:</strong> {parseUTC(server.created_at).toLocaleString()}
              </Text>
              <Badge px={2} py={1} borderRadius="md">
                <Status.Root colorPalette={server.is_monitoring_enabled ? "green" : "red"}>
                  <Status.Indicator /> {server.is_monitoring_enabled ? "Мониторинг включен" : "Мониторинг выключен"}
                </Status.Root>
              </Badge>
              <Badge px={2} py={1} borderRadius="md">
                <Status.Root colorPalette={server.is_server_enabled ? "green" : "red"}>
                  <Status.Indicator /> {server.is_server_enabled ? "Есть подключение к серверу" : "Сервер недоступен"}
                </Status.Root>
              </Badge>
              <Button onClick={onOpen}>Редактировать</Button>
            </VStack>

            <AddEditServerModal isOpen={open} onClose={onClose} isEdit defaultValues={server} />
          </Box>

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
