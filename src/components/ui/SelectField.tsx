import { styled } from "../../../styled-system/jsx";
import React from "react";

// Styled <select>
const StyledSelect = styled("select", {
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

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
}

export function SelectField({
  id,
  value,
  onChange,
  label,
  required,
  placeholder,
  options,
}: SelectInputProps) {
  return (
    <label htmlFor={id}>
      {label}
      <StyledSelect
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </StyledSelect>
    </label>
  );
}
