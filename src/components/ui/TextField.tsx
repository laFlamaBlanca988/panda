import { Box, styled } from "styled-system/jsx";
import React from "react";

const StyledLabel = styled("label", {
  base: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "medium",
    color: "gray.700",
    gap: 1,
  },
});

const StyledInput = styled("input", {
  base: {
    px: 3,
    py: 2,
    border: "1px solid token(colors.inputBorder)",
    rounded: "md",
    fontSize: "md",
    outline: "none",
    transition: "all 0.2s",
    _placeholder: {
      color: "gray.400",
    },
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

interface TextFieldProps {
  id: string;
  value: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  id,
  value,
  label,
  required,
  placeholder,
  error,
  onChange,
}: TextFieldProps) {
  return (
    <Box css={{ width: "100%" }}>
      <StyledLabel htmlFor={id}>
        {label}
        {required && (
          <span style={{ color: "var(--colors-error-500)", marginLeft: "4px" }}>
            *
          </span>
        )}
        <StyledInput
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          state={error ? "error" : "default"}
        />
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
    </Box>
  );
}
