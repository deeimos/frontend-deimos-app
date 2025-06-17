import { getCookie } from "cookies-next";
export function useAuth() {
  const token = typeof window !== "undefined" ? getCookie("access_token")?.toString() || null : null;
  return { accessToken: token };
}
