import { styled } from "../../../styled-system/jsx";
import React from "react";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}

const StyledCheckbox = styled("input", {
  base: {
    w: 4,
    h: 4,
    rounded: "sm",
    border: "1px solid token(colors.gray.300)",
    _checked: {
      bg: "brand.500",
      borderColor: "brand.500",
    },
  },
});

export function CheckboxField({
  id,
  checked,
  onChange,
  label,
  required,
}: CheckboxFieldProps) {
  return (
    <label
      htmlFor={id}
      style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
    >
      <StyledCheckbox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
      />
      {label}
    </label>
  );
}
