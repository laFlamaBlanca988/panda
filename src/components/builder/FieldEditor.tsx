// src/components/builder/FieldEditor.tsx
import type { FormField } from "@/types/form";
import { useFormStore } from "@/store/formStore";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import Button from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { CheckboxField } from "@/components/ui/CheckboxField";
import { styled } from "styled-system/jsx";

const EditorContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    width: "100%",
  },
});

const FieldTypeIndicator = styled("div", {
  base: {
    fontSize: "sm",
    color: "gray.500",
    marginBottom: "2",
  },
});

const ActionsContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4",
    width: "100%",
  },
});

interface Props {
  field: FormField;
}

export const FieldEditor = ({ field }: Props) => {
  const updateField = useFormStore((s) => s.updateField);
  const deleteField = useFormStore((s) => s.deleteField);

  const handleUpdate = (updates: Partial<FormField>) => {
    updateField(field.id, updates);
  };

  return (
    <FieldWrapper>
      <EditorContainer>
        <TextField
          id={`field-label-${field.id}`}
          label="Field Label"
          value={field.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          placeholder="Enter field label"
        />

        <CheckboxField
          id={`field-required-${field.id}`}
          label="Required Field"
          checked={field.required}
          onChange={(e) => handleUpdate({ required: e.target.checked })}
        />

        {/* Type-specific settings */}
        {field.type === "text" && (
          <TextField
            id={`field-placeholder-${field.id}`}
            label="Placeholder Text"
            value={field.placeholder}
            onChange={(e) => handleUpdate({ placeholder: e.target.value })}
            placeholder="Enter placeholder text"
          />
        )}

        {field.type === "checkbox" && (
          <CheckboxField
            id={`field-default-${field.id}`}
            label="Default Value"
            checked={field.value}
            onChange={(e) => handleUpdate({ value: e.target.checked })}
          />
        )}

        {field.type === "select" && (
          <TextField
            id={`field-options-${field.id}`}
            label="Options (comma separated)"
            value={field.options.join(", ")}
            onChange={(e) =>
              handleUpdate({
                options: e.target.value.split(",").map((o) => o.trim()),
              })
            }
            placeholder="Option 1, Option 2, Option 3"
          />
        )}

        <ActionsContainer>
          <FieldTypeIndicator>Type: {field.type}</FieldTypeIndicator>
          <Button onClick={() => deleteField(field.id)}>Delete</Button>
        </ActionsContainer>
      </EditorContainer>
    </FieldWrapper>
  );
};
