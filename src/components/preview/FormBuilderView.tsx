// src/components/builder/BuilderPanel.tsx
import { useEffect } from "react";
import { styled } from "styled-system/jsx";
import { useFormStore } from "@/store/formStore";
import { useUIStore } from "@/store/uiStore";
import { Heading } from "@/components/ui/Heading";
import { FieldTypeSelector } from "../builder/FieldTypeSelector";
import { FieldList } from "../builder/FieldList";
import { FieldEditor } from "../builder/FieldEditor";

const PanelContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "lg",
    overflow: "hidden",
    bg: "white",
  },
});

const ContentContainer = styled("div", {
  base: {
    display: "flex",
    flexGrow: 1,
    p: 4,
    overflow: "hidden",
  },
});

const LeftPanel = styled("div", {
  base: {
    p: 4,
    bg: "gray.50",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
});

const RightPanel = styled("div", {
  base: {
    p: 4,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    overflow: "auto",
    bg: "gray.50",
  },
});

const ScrollableArea = styled("div", {
  base: {
    overflowY: "auto",
    py: 4,
    flexGrow: 1,
  },
});

const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8",
    marginTop: "4",
    height: "200px",
    borderRadius: "md",
    border: "2px dashed",
    borderColor: "gray.200",
    color: "gray.500",
    textAlign: "center",
  },
});

export function FormBuilderView() {
  const fields = useFormStore((s) => s.fields);
  const { selectedFieldId, setSelectedFieldId } = useUIStore();

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  useEffect(() => {
    if (!selectedFieldId && fields.length > 0) {
      setSelectedFieldId(fields[0].id);
    } else if (
      selectedFieldId &&
      !fields.find((f) => f.id === selectedFieldId)
    ) {
      setSelectedFieldId(null);
    }
  }, [fields, selectedFieldId, setSelectedFieldId]);

  return (
    <PanelContainer>
      <FieldTypeSelector />
      {selectedField ? (
        <ContentContainer>
          <LeftPanel>
            <Heading level="h3" size="md" variant="primary">
              Fields
            </Heading>
            <ScrollableArea>
              <FieldList />
            </ScrollableArea>
          </LeftPanel>

          <RightPanel>
            <>
              <Heading level="h3" size="md" variant="primary">
                Field Settings
              </Heading>
              <FieldEditor field={selectedField} />
            </>
          </RightPanel>
        </ContentContainer>
      ) : (
        <EmptyState>
          <p>Select a field to edit its properties</p>
          <p>or add a new field from the options above</p>
        </EmptyState>
      )}
    </PanelContainer>
  );
}
