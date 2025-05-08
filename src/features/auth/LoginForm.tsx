"use client";

import { Input, Button, Stack, Box, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormData } from "@/shared/schema/login";
import { useLogin } from "@/shared/hooks/auth/useLoginMutation";
import { ColorModeButton } from "@/shared/ui/color-mode";
import { PasswordInput } from "@/shared/ui/password-input";
import { Field } from "@/shared/ui/Field";
import { validateForm } from "@/shared/utils/validateForm";

interface ILoginForm {
  callbackUrl: string;
}
export const LoginForm = ({callbackUrl}: ILoginForm) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const { mutate } = useLogin({
    callbackUrl,
    onError: (error) => {
      validateForm<LoginFormData>(error, setError);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <Box maxW="md" mx="auto" mt={16} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6} size="lg" textAlign="center">
        Вход в систему
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack>
          <Field label="Email" error={errors.email?.message} isInvalid={!!errors.email}>
            <Input type="email" placeholder="email@example.com" {...register("email")} />
          </Field>

          <Field label="Пароль" error={errors.password?.message} isInvalid={!!errors.password}>
            <PasswordInput type="password" {...register("password")} />
          </Field>

          <Button type="submit" colorScheme="blue" loading={isSubmitting}>
            Войти
          </Button>
        </Stack>
      </form>
      <Box mt="4" textAlign="center">
        <ColorModeButton />
      </Box>
    </Box>
  );
};
