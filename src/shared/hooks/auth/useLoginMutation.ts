"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/shared/api/services/auth.service";
import { LoginType, UserType } from "@/shared/types/user.type";
import { useRouter } from "next/navigation";
import TokenService from "@/shared/api/services/token.service";
import { deleteCookie } from "cookies-next";

export function useLogin(options?: { onSuccess?: (creds: UserType) => void; onError?: (error: unknown) => void, callbackUrl: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const request = async (creds: LoginType) => {
    const { data } = await AuthService.Login(creds);
    TokenService.setTokens(data);

    queryClient.setQueryData(["user"], {
      id: data.id,
      email: data.email,
      name: data.name,
      created_at: data.created_at,
    });
  };

  return useMutation<void, unknown, LoginType>({
    mutationFn: request,
    onSuccess: () => {
      deleteCookie("callbackUrl", { path: "/" });
      const redirectTo = options?.callbackUrl || "/";
      router.replace(redirectTo);
    },
    onError: options?.onError,
  });
}
