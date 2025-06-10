// components/builder/FieldEditor.tsx
// Update the import path if the file is located elsewhere, for example:
import type { FormField } from "../../types/form";
// Or, if the file does not exist, create 'src/types/form.ts' and define 'FormField' there.
import { useFormStore } from "../../store/formStore";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Button } from "@/components/ui/Button";
import { HStack, VStack, Input, Text, Checkbox } from "@/styled-system/jsx";

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
      <VStack gap="3" align="start">
        <Input
          type="text"
          value={field.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          placeholder="Label"
        />

        <Checkbox
          checked={field.required}
          onChange={(e) => handleUpdate({ required: e.target.checked })}
        >
          Required
        </Checkbox>

        {/* Specific field types */}
        {field.type === "text" && (
          <Input
            type="text"
            value={field.placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate({ label: e.target.value })
            }
            placeholder="Placeholder"
          />
        )}

        {field.type === "select" && (
          <Input
            type="text"
            value={field.options.join(", ")}
            onChange={(e) =>
              handleUpdate({
                options: e.target.value.split(",").map((o) => o.trim()),
              })
            }
            placeholder="Options (comma separated)"
          />
        )}

        <HStack justify="space-between" width="full">
          <Text fontSize="sm" color="gray.500">
            Type: {field.type}
          </Text>
          <Button
            onClick={() => deleteField(field.id)}
            bg="red.500"
            _hover={{ bg: "red.600" }}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </FieldWrapper>
  );
};
