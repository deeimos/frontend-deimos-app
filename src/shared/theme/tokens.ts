import { defineTokens } from "@chakra-ui/react";

export const tokens = defineTokens({
  colors: {
    brand: {
      50: { value: "#e6f2ff" },
      100: { value: "#bfdeff" },
      200: { value: "#99caff" },
      300: { value: "#73b5ff" },
      400: { value: "#4da1ff" },
      500: { value: "#268dff" },
      600: { value: "#0079e6" },
      700: { value: "#0061b3" },
      800: { value: "#004980" },
      900: { value: "#00314d" },
    },
  },
  fonts: {
    body: { value: "Inter, sans-serif" },
    heading: { value: "Inter, sans-serif" },
  },
  fontSizes: {
    sm: { value: "0.875rem" },
    md: { value: "1rem" },
    lg: { value: "1.125rem" },
    xl: { value: "1.25rem" },
  },
  fontWeights: {
    normal: { value: "400" },
    medium: { value: "500" },
    bold: { value: "700" },
  },
  radii: {
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "16px" },
    full: { value: "9999px" },
  },
  spacing: {
    1: { value: "4px" },
    2: { value: "8px" },
    3: { value: "12px" },
    4: { value: "16px" },
    5: { value: "20px" },
    6: { value: "24px" },
  },
});
