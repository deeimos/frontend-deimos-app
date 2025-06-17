import { AxiosError } from "axios";

export function getErrorMesage(error: unknown): string | undefined {
  const err = error as AxiosError<{ message?: string }>;
  return err.response?.data?.message;
}
