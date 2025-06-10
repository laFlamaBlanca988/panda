import { styled } from "@/styled-system/css";

export const Button = styled("button", {
  base: {
    px: "4",
    py: "2",
    borderRadius: "md",
    fontWeight: "semibold",
    bg: "blue.500",
    color: "white",
    _hover: {
      bg: "blue.600",
    },
    _active: {
      bg: "blue.700",
    },
    _disabled: {
      bg: "gray.300",
      cursor: "not-allowed",
    },
    transition: "all 0.2s ease-in-out",
  },
});
