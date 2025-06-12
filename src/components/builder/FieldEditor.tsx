import type { FormField } from "@/types/form";
import { useFormStore } from "@/store/formStore";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { TextField } from "@/components/ui/TextField";
import { CheckboxField } from "@/components/ui/CheckboxField";
import { styled } from "styled-system/jsx";
import { FiType, FiCheckSquare, FiList, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";

const EditorContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    width: "100%",
  },
});

const FieldTypeHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    marginBottom: 4,
    padding: 2,
    borderRadius: "md",
    backgroundColor: "primary.50",
    color: "primary.600",
    fontWeight: "medium",
  },
});

interface Props {
  field: FormField;
}

export const FieldEditor = ({ field }: Props) => {
  const updateField = useFormStore((s) => s.updateField);

  const handleUpdate = (updates: Partial<FormField>) => {
    updateField(field.id, updates);
  };

  const getFieldIcon = () => {
    switch (field.type) {
      case "text":
        return <FiType size={20} />;
      case "checkbox":
        return <FiCheckSquare size={20} />;
      case "select":
        return <FiList size={20} />;
      default:
        return <FiAlertTriangle size={20} />;
    }
  };

  return (
    <FieldWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FieldTypeHeader>
          {getFieldIcon()}
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
        </FieldTypeHeader>
      </motion.div>

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
      </EditorContainer>
    </FieldWrapper>
  );
};
