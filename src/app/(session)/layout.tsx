import { Header } from "@/features/sessionLayout/Header";
import { Box, Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Box as="main" pt={6}>
        <Container maxW="7xl">{children}</Container>
      </Box>
    </>
  );
}
