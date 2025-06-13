import React from "react";
import { styled, Box } from "styled-system/jsx";
import { FiChevronDown } from "react-icons/fi";

const SelectWrapper = styled("div", {
  base: {
    position: "relative",
    width: "100%",
  },
});

const StyledLabel = styled("label", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    fontWeight: "medium",
    color: "gray.700",
  },
});

const StyledSelect = styled("select", {
  base: {
    width: "100%",
    px: 3,
    py: 2,
    pr: "2.5rem", // leave space for icon
    border: "1px solid",
    borderColor: "inputBorder", // use semantic token directly
    rounded: "md",
    fontSize: "md",
    outline: "none",
    bg: "formBg", // semantic token for bg (white)
    appearance: "none", // hide native arrow
    transition: "border-color 0.2s, box-shadow 0.2s",
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

const DropdownIcon = styled(FiChevronDown, {
  base: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "gray.500",
  },
});

const ErrorMessage = styled("div", {
  base: {
    color: "error.500",
    fontSize: "14px",
    mt: 1,
  },
});

const RequiredMark = styled("span", {
  base: {
    color: "error.500",
    ml: 1,
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
    <Box>
      <StyledLabel htmlFor={id}>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
        <SelectWrapper>
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
          <DropdownIcon size={20} />
        </SelectWrapper>
      </StyledLabel>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Box>
  );
}
