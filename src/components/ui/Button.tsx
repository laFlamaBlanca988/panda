import { styled } from "../../../styled-system/jsx";
import type { ReactNode } from "react";

const StyledButton = styled("button", {
  base: {
    px: 4,
    py: 2,
    rounded: "md",
    fontWeight: "semibold",
    transition: "all 0.2s ease",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.8,
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.500",
        color: "white",
        _hover: { bg: "primary.600" },
        _active: { bg: "primary.700" },
      },
      outline: {
        bg: "transparent",
        color: "primary.500",
        border: "1px solid",
        borderColor: "primary.500",
        _hover: { bg: "primary.50" },
      },
      ghost: {
        bg: "transparent",
        color: "gray.700",
        _hover: { bg: "gray.100" },
      },
      secondary: {
        bg: "gray.100",
        color: "gray.800",
        _hover: { bg: "gray.200" },
      },
      danger: {
        bg: "error.500",
        color: "white",
        _hover: { bg: "error.600" },
      },
      success: {
        bg: "success.500",
        color: "white",
        _hover: { bg: "success.600" },
      },
    },
    size: {
      sm: { px: 3, py: 1, fontSize: "sm" },
      md: { px: 4, py: 2, fontSize: "md" },
      lg: { px: 6, py: 3, fontSize: "lg" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = "solid",
  size = "md",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
