import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { semanticTokens } from "./semanticTokens";
import { textStyles } from "./textStyles";
import { globalCss } from "./globalCss";

const config = defineConfig({
  theme: {
    tokens,
    semanticTokens,
    textStyles,
  },
  globalCss,
});

export const system = createSystem(defaultConfig, config);
