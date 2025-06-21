"use client";

import {
  Box,
  Heading,
  Text,
  Stack,
  Skeleton,
  SkeletonText,
  VStack,
  Badge,
  Button,
  LinkBox,
  LinkOverlay,
  Status,
  useDisclosure,
} from "@chakra-ui/react";
import { useServersQuery } from "@/shared/hooks/servers/useServersListQuery";
import AddEditModal from "@/entities/server/AddEditModal";
import NextLink from "next/link";
import { parseUTC } from "@/shared/utils/parseUTC";
import HiddenText from "@/shared/ui/HiddenText";
import { useHideSensitive } from "@/shared/hooks/useHideSensitive";
import { Tooltip } from "@/shared/ui/tooltip";
import { FiPlus } from "react-icons/fi";

export default function ServersPage() {
  const [hideSensitive] = useHideSensitive();
  const { open, onOpen, onClose } = useDisclosure();
  const { data: servers, isLoading } = useServersQuery();

  return (
    <Box maxW="6xl" mx="auto" py={8} px={4}>
      <Box mb={6} display="flex" justifyContent="space-between">
        <Heading>Список серверов</Heading>
        <Tooltip
          content="Чтобы добавить сервер отключите скрытие чувствительных данных в профиле"
          disabled={!hideSensitive}
          showArrow
          openDelay={0}
          closeDelay={50}
        >
          <Button
            size="sm"
            variant="solid"
            onClick={onOpen}
            disabled={hideSensitive}
            zIndex={1}
            flexShrink={0}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FiPlus size={18} />
            Добавить
          </Button>
        </Tooltip>
      </Box>
      <Stack spaceY={3}>
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
                borderRadius="xl"
                boxShadow="sm"
                bg="bg.primary"
                _hover={{ bg: "bg.accent", cursor: "pointer" }}
              >
                <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="start">
                  <VStack align="start" spaceY={1}>
                    <LinkOverlay as={NextLink} href={`/server/${server.id}`}>
                      <Text fontWeight="bold">{server.display_name}</Text>
                    </LinkOverlay>
                    <Text fontSize="sm" color="text.primary">
                      <HiddenText>
                        {server.ip}:{server.port}
                      </HiddenText>
                    </Text>
                    <Text fontSize="sm" color="text.primary">
                      Добавлен: {parseUTC(server.created_at).toLocaleString()}
                    </Text>
                  </VStack>

                  <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="start">
                    <Badge px={2} py={1} borderRadius="md">
                      <Status.Root colorPalette={server.is_monitoring_enabled ? "green" : "red"}>
                        <Status.Indicator />{" "}
                        {server.is_monitoring_enabled ? "Прогнозирование включено" : "Прогнозирование выключено"}
                      </Status.Root>
                    </Badge>
                    <Badge px={2} py={1} borderRadius="md">
                      <Status.Root colorPalette={server.is_server_enabled ? "green" : "red"}>
                        <Status.Indicator />{" "}
                        {server.is_server_enabled ? "Есть подключение к серверу" : "Сервер недоступен"}
                      </Status.Root>
                    </Badge>
                  </Stack>
                </Stack>
              </LinkBox>
            ))}
      </Stack>
      <AddEditModal isOpen={open} onClose={onClose} />
    </Box>
  );
}
