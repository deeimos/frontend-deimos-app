"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  Status,
  Button,
  useDisclosure,
  Icon,
  IconButton,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { parseUTC } from "@/shared/utils/parseUTC";
import HiddenText from "@/shared/ui/HiddenText";
import { Tooltip } from "@/shared/ui/tooltip";
import { useHideSensitive } from "@/shared/hooks/useHideSensitive";
import { ServerModel } from "@/shared/types/server.type";
import AddEditServerModal from "@/entities/server/AddEditModal";
import { LuPencil } from "react-icons/lu";

interface IGeneralInfo {
  server?: ServerModel;
  isLoading: boolean;
}

export default function GeneralInfo({ server, isLoading }: IGeneralInfo) {
  const [hideSensitive] = useHideSensitive();
  const { open, onOpen, onClose } = useDisclosure();
  if (isLoading || !server) {
    return (
      <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" bg="bg.primary" height="100%">
        <Skeleton height="32px" mb={4} />
        <VStack align="start" spaceY={3} mt={3}>
          <SkeletonText noOfLines={1} width="60%" />
          <SkeletonText noOfLines={1} width="40%" />
          <SkeletonText noOfLines={1} width="80%" />
          <Skeleton height="24px" width="120px" borderRadius="md" />
          <Skeleton height="24px" width="140px" borderRadius="md" />
          <Skeleton height="32px" width="90px" borderRadius="md" />
        </VStack>
      </Box>
    );
  }
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
        {server.display_name}
      </Heading>
      <VStack align="start" spaceY={3} mt={3}>
        <Text>
          <strong>IP (DNS):</strong> <HiddenText>{server.ip}</HiddenText>
        </Text>
        <Text>
          <strong>Порт:</strong> <HiddenText>{server.port}</HiddenText>
        </Text>
        <Text>
          <strong>Добавлен:</strong> {parseUTC(server.created_at).toLocaleString()}
        </Text>
        <Badge px={2} py={1} borderRadius="md">
          <Status.Root colorPalette={server.is_monitoring_enabled ? "green" : "red"}>
            <Status.Indicator />{" "}
            {server.is_monitoring_enabled ? "Прогнозирование включено" : "Прогнозирование выключено"}
          </Status.Root>
        </Badge>
        <Badge px={2} py={1} borderRadius="md">
          <Status.Root colorPalette={server.is_server_enabled ? "green" : "red"}>
            <Status.Indicator /> {server.is_server_enabled ? "Есть подключение к серверу" : "Сервер недоступен"}
          </Status.Root>
        </Badge>

        <Tooltip
          content="Для редактирования отключите скрытие чувствительных данных в профиле"
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
            <LuPencil size={18} />
            Редактировать
          </Button>
        </Tooltip>
        <AddEditServerModal isOpen={open} onClose={onClose} isEdit defaultValues={server} />
      </VStack>
    </Box>
  );
}
