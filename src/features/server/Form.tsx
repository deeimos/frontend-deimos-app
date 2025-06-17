"use client";

import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { SwitchRoot, SwitchControl, SwitchLabel, SwitchHiddenInput } from "@chakra-ui/react";
import { Field } from "@/shared/ui/Field";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ServerFormValues } from "@/shared/types/server.type";
import { useEffect } from "react";

const schema = yup.object({
  display_name: yup.string().required("Введите название сервера").max(40, "Максимальная длина названия — 40 символов"),
  ip: yup.string().required("Введите IP-адрес или DNS").max(40, "Максимальная длина — 40 символов"),
  port: yup
    .string()
    .required("Введите порт")
    .matches(/^\d+$/, "Порт должен быть целым числом")
    .test("port-range", "Порт должен быть в диапазоне 1–65535", (value) => {
      const n = Number(value);
      return n >= 1 && n <= 65535;
    }),
  is_monitoring_enabled: yup.boolean().required(),
});

interface IServerForm {
  defaultValues?: ServerFormValues;
  isLoading?: boolean;
  generalError?: string;
  onSubmit: (data: ServerFormValues, setError: any) => void;
}

export default function ServerForm({ defaultValues, isLoading, generalError, onSubmit }: IServerForm) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<ServerFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    reset({
      display_name: defaultValues?.display_name || "",
      ip: defaultValues?.ip || "",
      port: defaultValues?.port || "",
      is_monitoring_enabled: defaultValues?.is_monitoring_enabled ?? false,
    });
    clearErrors();
  }, [defaultValues, reset, clearErrors]);

  const handleFormSubmit = (data: ServerFormValues) => {
    onSubmit(data, setError);
  };

  return (
    <Box as="form" id="server-form" onSubmit={handleSubmit(handleFormSubmit)} maxW="md" mx="auto">
      <Stack>
        <Field label="Название сервера" error={errors.display_name?.message} isInvalid={!!errors.display_name}>
          <Input {...register("display_name")} placeholder="My Server" disabled={isLoading} />
        </Field>

        <Field label="IP-адрес (или DNS)" error={errors.ip?.message} isInvalid={!!errors.ip}>
          <Input {...register("ip")} placeholder="127.0.0.1" disabled={isLoading} />
        </Field>

        <Field label="Порт" error={errors.port?.message} isInvalid={!!errors.port}>
          <Input {...register("port")} placeholder="8080" disabled={isLoading} />
        </Field>

        <Controller
          name="is_monitoring_enabled"
          control={control}
          render={({ field }) => (
            <Field label="" error={errors.is_monitoring_enabled?.message} isInvalid={!!errors.is_monitoring_enabled}>
              <SwitchRoot
                name={field.name}
                checked={!!field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
                disabled={isLoading}
              >
                <SwitchHiddenInput onBlur={field.onBlur} ref={field.ref} />
                <SwitchControl />
                <SwitchLabel>Мониторинг и прогнозирование активны</SwitchLabel>
              </SwitchRoot>
            </Field>
          )}
        />
        {generalError && (
          <Text color="red.500" mt={4} textAlign="center">
            {generalError}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
