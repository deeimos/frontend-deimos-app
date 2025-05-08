"use client";

import { useParams } from "next/navigation";
import { useServerQuery } from "@/shared/hooks/servers/useServerQuery";
import { Box, Heading, Text, VStack, Badge, Skeleton, Stack, Status, Button } from "@chakra-ui/react";

export default function ServerDetailsPage() {
  const params = useParams();
  const id = params.slug as string;

  const { data: server, isLoading } = useServerQuery(id);

  return (
    <Box maxW="3xl" mx="auto" py={8} px={4}>
      {isLoading || !server ? (
        <Stack spaceY={4}>
          <Skeleton height="32px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="bg.primary">
          <Box mb={4} display="flex" justifyContent="space-between">
            <Heading size="lg">{server.display_name}</Heading>
            <Button>Редактировать</Button>
          </Box>
          <VStack align="start" spaceY={3}>
            <Text>
              <strong>IP:</strong> {server.ip}
            </Text>
            <Text>
              <strong>Порт:</strong> {server.port}
            </Text>
            <Text>
              <strong>Добавлен:</strong> {new Date(server.created_at).toLocaleString()}
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
          </VStack>
          {/* 
          <ServerForm defaultValues={server} /> */}
        </Box>
      )}
    </Box>
  );
}
