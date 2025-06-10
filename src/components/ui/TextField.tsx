import { styled } from "../../../styled-system/jsx";
import React from "react";

const StyledInput = styled("input", {
  base: {
    px: 3,
    py: 2,
    border: "1px solid token(colors.gray.300)",
    rounded: "md",
    fontSize: "md",
    outline: "none",
    _focus: {
      borderColor: "brand.500",
      boxShadow: "0 0 0 1px token(colors.brand.500)",
    },
  },
});

interface TextFieldProps {
  id: string;
  value: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  id,
  value,
  label,
  required,
  placeholder,
  onChange,
}: TextFieldProps) {
  return (
    <label
      htmlFor={id}
      style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
    >
      {label}
      <StyledInput
        id={id}
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}
