import { styled } from "@/styled-system/jsx";

export const FieldWrapper = styled("div", {
  base: {
    p: "4",
    border: "1px solid token(colors.gray.200)",
    borderRadius: "lg",
    bg: "white",
    shadow: "sm",
    display: "flex",
    flexDirection: "column",
    gap: "3",
  },
});
