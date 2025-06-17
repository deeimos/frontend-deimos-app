import { Box, Code, IconButton, HStack, Clipboard } from "@chakra-ui/react";

export default function CopyableCodeBlock({ code }: { code: string }) {
  return (
    <Box position="relative" p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
      <HStack justify="space-between">
        <Code p={2} borderRadius="md" fontSize="sm" whiteSpace="pre-wrap" width="90%" display="block" overflowX="auto">
          {code}
        </Code>
        <Box position="absolute" top={2} right={2} zIndex={1}>
          <Clipboard.Root value={code} timeout={1200}>
            <Clipboard.Trigger asChild>
              <IconButton aria-label="Скопировать" variant="ghost" size="sm">
                <Clipboard.Indicator></Clipboard.Indicator>
              </IconButton>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </Box>
      </HStack>
    </Box>
  );
}
