"use client";

import { Box, Heading, Text, VStack, Badge, Status, Button, useDisclosure } from "@chakra-ui/react";
import { parseUTC } from "@/shared/utils/parseUTC";
import HiddenText from "@/shared/ui/HiddenText";
import { Tooltip } from "@/shared/ui/tooltip";
import { useHideSensitive } from "@/shared/hooks/useHideSensitive";
import { ServerModel } from "@/shared/types/server.type";
import AddEditServerModal from "@/entities/server/AddEditModal";

interface IGeneralInfo {
  server: ServerModel;
}

export default function GeneralInfo({ server }: IGeneralInfo) {
  const [hideSensitive] = useHideSensitive();
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="bg.primary">
      <Box mb={4} display="flex" justifyContent="space-between">
        <Heading size="lg">{server.display_name}</Heading>
      </Box>
      <VStack align="start" spaceY={3}>
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
            <Status.Indicator /> {server.is_monitoring_enabled ? "Прогнозирование включено" : "Прогнозирование выключено"}
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
          <Button onClick={onOpen} disabled={hideSensitive}>
            Редактировать
          </Button>
        </Tooltip>

        <AddEditServerModal isOpen={open} onClose={onClose} isEdit defaultValues={server} />
      </VStack>
    </Box>
  );
}
