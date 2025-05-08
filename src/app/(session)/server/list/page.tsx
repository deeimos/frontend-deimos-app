"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  Badge,
  Button,
  LinkBox,
  LinkOverlay,
  Status,
} from "@chakra-ui/react";
import { useServersQuery } from "@/shared/hooks/servers/useServersListQuery";
import NextLink from "next/link";

export default function ServersPage() {
  const { data: servers, isLoading } = useServersQuery();

  return (
    <Box maxW="6xl" mx="auto" py={8} px={4}>
      <Box mb={6} display="flex" justifyContent="space-between">
        <Heading >Список серверов</Heading>
        <Button>Добавить</Button>
      </Box>
      <Stack spaceY={4}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
                <Skeleton height="20px" mb={2} />
                <SkeletonText noOfLines={2} spaceY="3" />
              </Box>
            ))
          : servers?.map((server) => (
              <LinkBox
                as="article"
                key={server.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="bg.primary"
                _hover={{ bg: "bg.accent", cursor: "pointer" }}
              >
                <HStack justify="space-between" align="start">
                  <VStack align="start" spaceY={1}>
                    <LinkOverlay as={NextLink} href={`/server/${server.id}`}>
                      <Text fontWeight="bold">{server.display_name}</Text>
                    </LinkOverlay>
                    <Text fontSize="sm" color="text.primary">
                      {server.ip}:{server.port}
                    </Text>
                    <Text fontSize="sm" color="text.primary">
                      Добавлен: {new Date(server.created_at).toLocaleString()}
                    </Text>
                  </VStack>

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
                </HStack>
              </LinkBox>
            ))}
      </Stack>
    </Box>
  );
}
