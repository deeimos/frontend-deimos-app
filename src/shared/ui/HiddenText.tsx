import { Text } from "@chakra-ui/react";
import { useHideSensitive } from "@/shared/hooks/useHideSensitive";
import React from "react";

export default function HiddenText({ children }: { children: React.ReactNode }) {
  const [hideSensitive] = useHideSensitive();
  if (hideSensitive)
    return (
      <Text as="span" color="gray.400">
        ••••••••••
      </Text>
    );
  return <Text as="span">{children}</Text>;
  //   return (
  //     <Text
  //       as="span"
  //       filter={hideSensitive ? "blur(6px)" : "none"}
  //       transition="filter 0.2s"
  //       userSelect={hideSensitive ? "none" : "text"}
  //       px={1}
  //       py={0.5}
  //       borderRadius="md"
  //       bg={hideSensitive ? "gray.200" : "transparent"}
  //       cursor="default"
  //       pointerEvents={hideSensitive ? "none" : "auto"}
  //       title={hideSensitive ? "Скрыто по настройкам профиля" : ""}
  //     >
  //       {children}
  //     </Text>
  //   );
}
