import { styled } from "styled-system/jsx";

export const FieldWrapper = styled("div", {
  base: {
    p: "4",
    border: "1px solid token(colors.border)",
    borderRadius: "lg",
    bg: "formBg",
    shadow: "sm",
    display: "flex",
    flexDirection: "column",
    gap: "3",
    _hover: {
      borderColor: "gray.300",
    },
    transition: "all 0.2s ease",
  },
  variants: {
    state: {
      default: {},
      selected: {
        borderColor: "primary.500",
        bg: "fieldSelectedBg",
        shadow: "0 0 0 1px token(colors.primary.500)",
      },
      error: {
        borderColor: "error.500",
        shadow: "0 0 0 1px token(colors.error.500)",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
