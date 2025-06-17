import { LoginForm } from "@/features/auth/LoginForm";
import { cookies } from "next/headers";
import { Box } from "@chakra-ui/react";

export default async function Home() {
  const appCookies = await cookies();
  const callbackUrl = appCookies.get("callbackUrl")?.value ?? "/";
  return (
    <Box maxW="400px" mx="auto" p={6} border="none" minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginForm callbackUrl={callbackUrl} />
    </Box>
  );
}
