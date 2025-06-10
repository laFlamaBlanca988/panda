import { styled } from "@/styled-system/jsx";

export const TabButton = styled("button", {
  base: {
    px: "3",
    py: "2",
    borderRadius: "md",
    fontWeight: "medium",
    color: "gray.700",
    bg: "gray.100",
    transition: "all 0.15s ease-in-out",
    _hover: { bg: "gray.200" },
    _active: { bg: "gray.300" },
  },
  variants: {
    selected: {
      true: {
        bg: "blue.100",
        color: "blue.800",
        fontWeight: "semibold",
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
  },
});
