import { css } from "@/styled-system/css";

export const tabButtonClassttonClass = css({
  px: "3",
  py: "2",
  borderRadius: "md",
  fontWeight: "medium",
  color: "gray.700",
  bg: "gray.100",
  _hover: { bg: "gray.200" },
  _active: { bg: "gray.300" },
  _selected: {
    bg: "blue.100",
    color: "blue.800",
    fontWeight: "semibold",
  },
  transition: "all 0.15s ease-in-out",
});
