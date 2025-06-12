import { styled, Box } from "styled-system/jsx";
import React from "react";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  error?: string;
}

const StyledLabel = styled("label", {
  base: {
    display: "flex",
    gap: 3,
    alignItems: "center",
    cursor: "pointer",
    color: "gray.700",
  },
});

const StyledCheckbox = styled("input", {
  base: {
    w: 4,
    h: 4,
    rounded: "sm",
    border: "1px solid token(colors.inputBorder)",
    cursor: "pointer",
    accentColor: "primary.500",
    _checked: {
      bg: "primary.500",
      borderColor: "primary.500",
    },
    _focus: {
      boxShadow: "0 0 0 2px token(colors.primary.100)",
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        borderColor: "error.500",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export function CheckboxField({
  id,
  checked,
  onChange,
  label,
  required,
  error,
}: CheckboxFieldProps) {
  return (
    <Box>
      <StyledLabel htmlFor={id}>
        <StyledCheckbox
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          state={error ? "error" : "default"}
        />
        {label}
        {required && (
          <span
            style={{ color: "var(--colors-error-500)", marginLeft: "4px" }}
          ></span>
        )}
      </StyledLabel>
      {error && (
        <div
          style={{
            color: "var(--colors-error-500)",
            fontSize: "14px",
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          {error}
        </div>
      )}
    </Box>
  );
}
