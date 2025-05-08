import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticTokens = defineSemanticTokens({
  colors: {
    "bg.primary": {
      value: {
        _light: "{colors.white}",
        _dark: "{colors.gray.950}",
      },
    },
    "bg.secondary": {
      value: {
        _light: "{colors.gray.50}",
        _dark: "{colors.gray.700}",
      },
    },
    "bg.accent": {
      value: {
        _light: "{colors.gray.100}",
        _dark: "{colors.whiteAlpha.400}",
      },
    },
    "text.primary": {
      value: {
        _light: "{colors.gray.900}",
        _dark: "{colors.whiteAlpha.900}",
      },
    },
    "text.secondary": {
      value: {
        _light: "{colors.gray.600}",
        _dark: "{colors.gray.400}",
      },
    },
    "accent": {
      value: {
        _light: "{colors.brand.500}",
        _dark: "{colors.brand.400}",
      },
    },
  },
});
