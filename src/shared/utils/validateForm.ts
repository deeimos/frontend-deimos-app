import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { AxiosError } from "axios";

export function validateForm<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  const err = error as AxiosError<Record<string, string>>;
  if (err.response?.data) {
    Object.entries(err.response.data).forEach(([key, message]) => {
      if (typeof message === "string") {
        setError(key as Path<T>, { type: "manual", message });
      }
    });
  }
}
