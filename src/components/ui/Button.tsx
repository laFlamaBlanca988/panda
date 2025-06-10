import { styled } from "../../../styled-system/jsx";

const StyledButton = styled("button", {
  base: {
    bg: "brand.100",
    color: "red.800",
    px: 4,
    py: 2,
    rounded: "md",
    fontWeight: "semibold",
    _hover: {
      bg: "brand.600",
    },
  },
});

export default function Button({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
