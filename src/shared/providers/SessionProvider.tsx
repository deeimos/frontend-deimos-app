import { cookies } from "next/headers";
import { ReactNode } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { TokensType, UserInfoType } from "../types/user.type";

interface Props {
  children: ReactNode;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUser = async (token: string) => {
  const res = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("User fetch failed");
  return res.json() as Promise<UserInfoType>;
};

const refresh = async (token: string) => {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });
  if (!res.ok) throw new Error("Refresh failed");
  return res.json() as Promise<TokensType>;
};


export async function SessionProvider({ children }: Props) {
  const appCookies = await cookies();
  const accessToken = appCookies.get("access_token")?.value;
  const refreshToken = appCookies.get("refresh_token")?.value;

  let user = null;
  let refreshedAccess = accessToken;

  if (accessToken) {
    try {
      user = await getUser(accessToken);
    } catch {
      console.log("invalid access token");
    }
  }

  if (!user && refreshToken) {
    try {
      const refreshed = await refresh(refreshToken);
      refreshedAccess = refreshed.access_token;
      user = await getUser(refreshedAccess);
    } catch {
      console.log("invalid refresh token");
    }
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => Promise.resolve(user),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
