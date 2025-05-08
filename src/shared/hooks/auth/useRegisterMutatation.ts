"use client";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/shared/api/services/auth.service";
import { RegisterType, UserType } from "@/shared/types/user.type";
import { useRouter } from "next/navigation";
import TokenService from "@/shared/api/services/token.service";

export function useRegister(options?: {
  onSuccess?: (creds: UserType) => void;
  onError?: (error: unknown) => void;
}) {
  const router = useRouter();

  const request = async (creds: RegisterType) => {
    const { data } = await AuthService.Register(creds);
    TokenService.setTokens(data);
  };

  return useMutation<void, unknown, RegisterType>({
    mutationFn: request,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: options?.onError,
  });
}
