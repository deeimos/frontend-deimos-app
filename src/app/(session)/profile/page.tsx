"use client";

import { Box, Heading, Text, Stack, Skeleton } from "@chakra-ui/react";
import { SwitchRoot, SwitchControl, SwitchLabel, SwitchHiddenInput } from "@chakra-ui/react";
import useSessionQuery from "@/shared/hooks/useSessionQuery";
import { useHideSensitive } from "@/shared/hooks/useHideSensitive";
import { parseUTC } from "@/shared/utils/parseUTC";

export default function UserProfilePage() {
  const { data: user, isLoading, error } = useSessionQuery();
  const [hideSensitive, setHideSensitive] = useHideSensitive();

  if (isLoading) {
    return (
      <Box maxW="md" mx="auto" mt={16}>
        <Stack spaceY={4}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box maxW="md" mx="auto" mt={16} textAlign="center">
        <Text color="red.500">Не удалось загрузить данные пользователя.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={16} p={6} borderWidth="1px" borderRadius="lg" bg="bg.primary">
      <Heading size="lg" mb={4}>
        Профиль пользователя
      </Heading>
      <Stack spaceY={4}>
        <Text>
          <strong>Имя:</strong> {user.name}
        </Text>
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text>
          <strong>Создан:</strong> {parseUTC(user.created_at).toLocaleString()}
        </Text>
        <SwitchRoot checked={!!hideSensitive} onCheckedChange={(e) => setHideSensitive(e.checked)}>
          <SwitchHiddenInput />
          <SwitchControl />
          <SwitchLabel>Скрывать чувствительные данные</SwitchLabel>
        </SwitchRoot>
      </Stack>
    </Box>
  );
}
