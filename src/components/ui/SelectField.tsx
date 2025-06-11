import { styled } from "../../../styled-system/jsx";
import React from "react";

const StyledLabel = styled("label", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    fontSize: "sm",
    fontWeight: "medium",
    color: "gray.700",
  },
});

// Styled <select>
const StyledSelect = styled("select", {
  base: {
    px: 3,
    py: 2,
    border: "1px solid token(colors.inputBorder)",
    rounded: "md",
    fontSize: "md",
    outline: "none",
    bg: "white",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
    backgroundPosition: "right 0.5rem center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "1.5em 1.5em",
    paddingRight: "2.5rem",
    transition: "all 0.2s",
    _focus: {
      borderColor: "inputBorderFocus",
      boxShadow: "0 0 0 1px token(colors.primary.500)",
    },
    _disabled: {
      bg: "gray.100",
      cursor: "not-allowed",
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        borderColor: "error.500",
        _focus: {
          boxShadow: "0 0 0 1px token(colors.error.500)",
        },
      },
    },
  },
  defaultVariants: {
    state: "default",
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
  error?: string;
}

export function SelectField({
  id,
  value,
  onChange,
  label,
  required,
  placeholder,
  options,
  error,
}: SelectInputProps) {
  return (
    <div>
      <StyledLabel htmlFor={id}>
        {label}
        {required && (
          <span style={{ color: "var(--colors-error-500)", marginLeft: "4px" }}>
            *
          </span>
        )}
        <StyledSelect
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          state={error ? "error" : "default"}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </StyledSelect>
      </StyledLabel>
      {error && (
        <div
          style={{
            color: "var(--colors-error-500)",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
