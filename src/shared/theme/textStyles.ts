import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  heading: {
    description: "Заголовок раздела",
    value: {
      fontSize: "xl",
      fontWeight: "bold",
      lineHeight: "short",
    },
  },
  body: {
    description: "Основной текст",
    value: {
      fontSize: "md",
      fontWeight: "normal",
      lineHeight: "base",
    },
  },
});
