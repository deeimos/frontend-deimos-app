import { LoginForm } from "@/features/auth/LoginForm";
import { cookies } from "next/headers";

export default async function Home() {
  const appCookies = await cookies();
  const callbackUrl = appCookies.get("callbackUrl")?.value ?? "/";
  return (
    <LoginForm callbackUrl={callbackUrl}/>
  );
}
