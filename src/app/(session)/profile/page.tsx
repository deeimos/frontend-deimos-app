"use client";

import { Box, Heading, Text, Stack, Skeleton } from "@chakra-ui/react";
import useSessionQuery from "@/shared/hooks/useSessionQuery";

export default function UserProfilePage() {
  const { data: user, isLoading, error } = useSessionQuery();

  if (isLoading) {
    return (
      <Box maxW="md" mx="auto" mt={16}>
        <Stack  spaceY={4}>
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
      <Stack  spaceY={4}>
        <Text>
          <strong>Имя:</strong> {user.name}
        </Text>
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text>
          <strong>Создан:</strong>{" "}
          {new Intl.DateTimeFormat("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(user.created_at))}
        </Text>
      </Stack>
    </Box>
  );
}
