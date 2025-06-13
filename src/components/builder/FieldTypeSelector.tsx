// src/components/builder/FieldTypeSelector.tsx
import { useFormStore } from "@/store/formStore";
import { styled } from "styled-system/jsx";
import { Heading } from "@/components/ui/Heading";
import { FiType, FiCheckSquare, FiList } from "react-icons/fi";
import type { FieldType } from "@/types/form";

const TypeSelectorContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    p: 4,
    borderBottom: "1px solid",
    borderColor: "border",
    bg: "gray.50",
  },
});

const TypesGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 3,
  },
});

const TypeCard = styled("button", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    p: 3,
    borderRadius: "md",
    bg: "white",
    border: "1px solid",
    borderColor: "gray.200",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
    fontSize: "sm",
    color: "gray.700",
    fontWeight: "medium",
    _hover: {
      borderColor: "primary.300",
      bg: "primary.50",
      transform: "translateY(-2px)",
      shadow: "sm",
    },
  },
});

const IconWrapper = styled("div", {
  base: {
    fontSize: "xl",
    color: "primary.500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "primary.50",
    p: 3,
    borderRadius: "full",
    mb: 1,
  },
});

export function FieldTypeSelector() {
  const addField = useFormStore((s) => s.addField);

  const handleAddField = (type: FieldType) => {
    addField(type);
  };

  return (
    <TypeSelectorContainer>
      <Heading level="h3" size="md">
        Add Field
      </Heading>

      <TypesGrid>
        <TypeCard onClick={() => handleAddField("text")}>
          <IconWrapper>
            <FiType size={24} />
          </IconWrapper>
          Text Field
        </TypeCard>

        <TypeCard onClick={() => handleAddField("checkbox")}>
          <IconWrapper>
            <FiCheckSquare size={24} />
          </IconWrapper>
          Checkbox
        </TypeCard>

        <TypeCard onClick={() => handleAddField("select")}>
          <IconWrapper>
            <FiList size={24} />
          </IconWrapper>
          Select
        </TypeCard>
      </TypesGrid>
    </TypeSelectorContainer>
  );
}
