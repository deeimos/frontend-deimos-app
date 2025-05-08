"use client";

import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/shared/ui/Field";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Switch as ChakraSwitch, SwitchRoot, SwitchControl, SwitchLabel, SwitchHiddenInput } from "@chakra-ui/react";

type ServerFormValues = {
  display_name: string;
  ip: string;
  port: string;
  is_monitoring_enabled: boolean;
};

const schema = yup.object({
  display_name: yup.string().required("Введите название сервера"),
  ip: yup.string().required("Введите IP-адрес"),
  port: yup.string().required("Введите порт"),
  is_monitoring_enabled: yup.boolean().required(),
});

interface IServerForm {
  defaultValues?: ServerFormValues;
}
export default function ServerForm({ defaultValues }: IServerForm) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServerFormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: ServerFormValues) => {
    console.log("Отправка данных", data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="md" mx="auto" mt={8}>
      <Stack>
        <Field label="Название сервера" error={errors.display_name?.message} isInvalid={!!errors.display_name}>
          <Input {...register("display_name")} placeholder="My Server" />
        </Field>

        <Field label="IP-адрес" error={errors.ip?.message} isInvalid={!!errors.ip}>
          <Input {...register("ip")} placeholder="127.0.0.1" />
        </Field>

        <Field label="Порт" error={errors.port?.message} isInvalid={!!errors.port}>
          <Input {...register("port")} placeholder="8080" />
        </Field>

        <Controller
          name="is_monitoring_enabled"
          control={control}
          render={({ field }) => (
            <Field label="" error={errors.is_monitoring_enabled?.message} isInvalid={!!errors.is_monitoring_enabled}>
              <SwitchRoot
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              >
                <SwitchHiddenInput onBlur={field.onBlur} />
                <SwitchControl />
                <SwitchLabel>Мониторинг и прогнозирование активны</SwitchLabel>
              </SwitchRoot>
            </Field>
          )}
        />

        <Button type="submit" colorScheme="blue" loading={isSubmitting}>
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
}
