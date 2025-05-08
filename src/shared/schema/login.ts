import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
