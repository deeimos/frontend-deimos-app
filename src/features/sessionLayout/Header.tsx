"use client";

import { Box, Flex, Text, Spacer, HStack, Avatar, Menu, Skeleton, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useSessionQuery from "@/shared/hooks/useSessionQuery";
import { ColorModeIcon, useColorMode } from "@/shared/ui/color-mode";
import { FiLogOut, FiUser } from "react-icons/fi";
import NextLink from "next/link";
import TokenService from "@/shared/api/services/token.service";

export function Header() {
  const { data: user, isLoading } = useSessionQuery();
  const router = useRouter();
  const { toggleColorMode, colorMode } = useColorMode();

  const handleLogout = () => {
    TokenService.removeTokens();
    router.replace("/auth/login");
  };

  return (
    <Box as="header" bg="bg.primary" color="text.primary" px={6} py={2} boxShadow="sm">
      <Flex align="center">
        <Link
          as={NextLink}
          href="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          DeimosCloud
        </Link>
        <Spacer />
        {isLoading ? (
          <Skeleton height="40px" width="120px" borderRadius="full" />
        ) : (
          user && (
            <Menu.Root>
              <Menu.Trigger>
                <HStack
                  bg="bg.secondary"
                  _hover={{ bg: "bg.accent" }}
                  color="accent"
                  pr={3}
                  pl={1}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  gap={2}
                  cursor={"pointer"}
                >
                  <Avatar.Root>
                    <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                  </Avatar.Root>
                  <Text maxW="100px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {user.name}
                  </Text>
                </HStack>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="theme" onClick={toggleColorMode} cursor={"pointer"}>
                    <ColorModeIcon /> {colorMode === "light" ? "Тёмная" : "Светла"} тема
                  </Menu.Item>
                  <Menu.Item value="profile" cursor={"pointer"}>
                    <Link
                      as={NextLink}
                      href="/profile"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      _hover={{ textDecoration: "none" }}
                      _focus={{ boxShadow: "none", outline: "none" }}
                    >
                      <FiUser size={16} /> Профиль
                    </Link>
                  </Menu.Item>
                  <Menu.Item value="logout" onClick={handleLogout} cursor={"pointer"}>
                    <FiLogOut size={16} /> Выйти
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          )
        )}
      </Flex>
    </Box>
  );
}
