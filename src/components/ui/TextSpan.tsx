import { styled } from "../../../styled-system/jsx";
import type { ReactNode } from "react";

type ColorVariant =
  | "default"
  | "light"
  | "disabled"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "gray";

type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type WeightVariant = "light" | "normal" | "medium" | "semibold" | "bold";

const StyledText = styled("span", {
  base: {
    display: "inline",
    lineHeight: "short",
  },
  variants: {
    color: {
      default: { color: "text" },
      light: { color: "textLight" },
      disabled: { color: "textDisabled" },
      primary: { color: "primary.500" },
      secondary: { color: "secondary.500" },
      success: { color: "success.600" },
      error: { color: "errorText" },
      warning: { color: "warningText" },
      gray: { color: "gray.700" },
    },
    size: {
      xs: { fontSize: "xs" },
      sm: { fontSize: "sm" },
      md: { fontSize: "md" },
      lg: { fontSize: "lg" },
      xl: { fontSize: "xl" },
      "2xl": { fontSize: "2xl" },
    },
    weight: {
      light: { fontWeight: "light" },
      normal: { fontWeight: "normal" },
      medium: { fontWeight: "medium" },
      semibold: { fontWeight: "semibold" },
      bold: { fontWeight: "bold" },
    },
  },
  defaultVariants: {
    color: "default",
    size: "sm",
    weight: "normal",
  },
});

interface TextSpanProps {
  children: ReactNode;
  color?: ColorVariant;
  size?: SizeVariant;
  weight?: WeightVariant;
}

export default function TextSpan({
  children,
  color = "default",
  size = "sm",
  weight = "normal",
  ...props
}: TextSpanProps) {
  return (
    <StyledText color={color} size={size} weight={weight} {...props}>
      {children}
    </StyledText>
  );
}
