"use client";

import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  isInvalid?: boolean;
  children: ReactNode;
};

export const Field = ({ label, error, isInvalid, children }: FieldProps) => (
  <FormControl isInvalid={isInvalid} mb={4}>
    <FormLabel fontSize="medium">{label}</FormLabel>
    {children}
    {isInvalid && (
      <FormErrorMessage fontSize="small" color="red">
        {error}
      </FormErrorMessage>
    )}
  </FormControl>
);
