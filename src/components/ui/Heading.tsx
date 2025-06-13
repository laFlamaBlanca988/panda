// src/components/ui/Heading.tsx
import { styled } from "../../../styled-system/jsx";
import type { ReactNode } from "react";

// Create individual styled components for each heading level
const H1 = styled("h1", {
  base: {
    fontFamily: "inherit",
    color: "gray.900",
    fontWeight: "bold",
    lineHeight: "1.2",
    m: 0,
  },
  variants: {
    size: {
      xs: { fontSize: "sm" },
      sm: { fontSize: "md" },
      md: { fontSize: "lg" },
      lg: { fontSize: "xl" },
      xl: { fontSize: "2xl" },
      "2xl": { fontSize: "3xl" },
    },
    variant: {
      default: {},
      primary: { color: "primary.700" },
      gradient: {
        bgGradient: "linear(to-r, primary.500, accent.500)",
        bgClip: "text",
        textFillColor: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "lg",
    variant: "default",
  },
});

const H2 = styled("h2", {
  base: {
    fontFamily: "inherit",
    color: "gray.900",
    fontWeight: "bold",
    lineHeight: "1.2",
    m: 0,
  },
  variants: {
    size: {
      xs: { fontSize: "sm" },
      sm: { fontSize: "md" },
      md: { fontSize: "lg" },
      lg: { fontSize: "xl" },
      xl: { fontSize: "2xl" },
      "2xl": { fontSize: "3xl" },
    },
    variant: {
      default: {},
      primary: { color: "primary.700" },
      gradient: {
        bgGradient: "linear(to-r, primary.500, accent.500)",
        bgClip: "text",
        textFillColor: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "lg",
    variant: "default",
  },
});

const H3 = styled("h3", {
  base: {
    fontFamily: "inherit",
    color: "gray.900",
    fontWeight: "bold",
    lineHeight: "1.2",
    m: 0,
  },
  variants: {
    size: {
      xs: { fontSize: "sm" },
      sm: { fontSize: "md" },
      md: { fontSize: "lg" },
      lg: { fontSize: "xl" },
      xl: { fontSize: "2xl" },
      "2xl": { fontSize: "3xl" },
    },
    variant: {
      default: {},
      primary: { color: "primary.700" },
      gradient: {
        bgGradient: "linear(to-r, primary.500, accent.500)",
        bgClip: "text",
        textFillColor: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const H4 = styled("h4", {
  base: {
    fontFamily: "inherit",
    color: "gray.900",
    fontWeight: "bold",
    lineHeight: "1.2",
    m: 0,
  },
  variants: {
    size: {
      xs: { fontSize: "sm" },
      sm: { fontSize: "md" },
      md: { fontSize: "lg" },
      lg: { fontSize: "xl" },
      xl: { fontSize: "2xl" },
      "2xl": { fontSize: "3xl" },
    },
    variant: {
      default: {},
      primary: { color: "primary.700" },
      gradient: {
        bgGradient: "linear(to-r, primary.500, accent.500)",
        bgClip: "text",
        textFillColor: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
  },
});

// Create a union type for heading levels
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Base heading props
interface BaseHeadingProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "primary" | "gradient";
  className?: string;
}

export function Heading({
  level = "h1",
  children,
  size,
  variant,
  ...props
}: BaseHeadingProps & { level?: HeadingLevel }) {
  switch (level) {
    case "h1":
      return (
        <H1 size={size} variant={variant} {...props}>
          {children}
        </H1>
      );
    case "h2":
      return (
        <H2 size={size} variant={variant} {...props}>
          {children}
        </H2>
      );
    case "h3":
      return (
        <H3 size={size} variant={variant} {...props}>
          {children}
        </H3>
      );
    case "h4":
      return (
        <H4 size={size} variant={variant} {...props}>
          {children}
        </H4>
      );
    case "h5":
      return (
        <H3 size={size || "xs"} variant={variant} {...props}>
          {children}
        </H3>
      );
    case "h6":
      return (
        <H4 size={size || "xs"} variant={variant} {...props}>
          {children}
        </H4>
      );
    default:
      return (
        <H1 size={size} variant={variant} {...props}>
          {children}
        </H1>
      );
  }
}

// For convenience, also export the individual heading components
export { H1, H2, H3, H4 };
