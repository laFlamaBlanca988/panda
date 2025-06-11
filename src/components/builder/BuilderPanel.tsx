// src/components/builder/BuilderPanel.tsx
import { useEffect } from "react";
import { styled } from "styled-system/jsx";
import { useFormStore } from "@/store/formStore";
import { useUIStore } from "@/store/uiStore";
import { FieldList } from "./FieldList";
import { FieldTypeSelector } from "./FieldTypeSelector";
import { FieldEditor } from "./FieldEditor";
import { Heading } from "@/components/ui/Heading";

const PanelContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
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
    overflow: "hidden",
  },
});

const LeftPanel = styled("div", {
  base: {
    width: "60%",
    borderRight: "1px solid",
    borderColor: "border",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
});

const RightPanel = styled("div", {
  base: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    p: 4,
    bg: "gray.50",
  },
});

const ScrollableArea = styled("div", {
  base: {
    overflowY: "auto",
    p: 4,
    flexGrow: 1,
  },
});

const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    p: 6,
    color: "gray.500",
    textAlign: "center",
  },
});

export function BuilderPanel() {
  const fields = useFormStore((s) => s.fields);
  const { selectedFieldId, setSelectedFieldId } = useUIStore();

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  // Auto-select the first field if none is selected and fields exist
  useEffect(() => {
    if (!selectedFieldId && fields.length > 0) {
      setSelectedFieldId(fields[0].id);
    } else if (
      selectedFieldId &&
      !fields.find((f) => f.id === selectedFieldId)
    ) {
      // If the selected field was deleted, clear selection
      setSelectedFieldId(null);
    }
  }, [fields, selectedFieldId, setSelectedFieldId]);

  return (
    <PanelContainer>
      <FieldTypeSelector />

      <ContentContainer>
        <LeftPanel>
          <ScrollableArea>
            <FieldList />
          </ScrollableArea>
        </LeftPanel>

        <RightPanel>
          {selectedField ? (
            <>
              <Heading level="h3" size="md" variant="primary">
                Field Settings
              </Heading>
              <FieldEditor field={selectedField} />
            </>
          ) : (
            <EmptyState>
              <p>Select a field to edit its properties</p>
              <p>or add a new field from the options above</p>
            </EmptyState>
          )}
        </RightPanel>
      </ContentContainer>
    </PanelContainer>
  );
}
