import { useFormStore } from "@/store/formStore";
import type { FormField } from "@/types/form";
import { VStack } from "../../../styled-system/jsx";
import { TextField } from "../ui/TextField";
import { CheckboxField } from "../ui/CheckboxField";
import { SelectField } from "../ui/SelectField";

interface Props {
  field: FormField;
  errors: Record<string, boolean>;
  validateField: (
    id: string,
    value: string | boolean,
    required: boolean
  ) => void;
}

export const FormFieldRenderer = ({ field, errors, validateField }: Props) => {
  const updateField = useFormStore((state) => state.updateField);

  const handleChange = (value: string | boolean) => {
    updateField(field.id, { value });
    validateField(field.id, value, field.required);
  };

  return (
    <VStack alignItems="start" gap="1">
      {field.type === "text" && (
        <TextField
          id={field.id}
          value={field.value as string}
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(e.target.value)}
          error={errors[field.id] ? "This field is required" : undefined}
        />
      )}

      {field.type === "checkbox" && (
        <CheckboxField
          id={field.id}
          checked={Boolean(field.value)}
          onChange={(e) => handleChange(e.target.checked)}
          label={field.label}
          error={errors[field.id] ? "This field is required" : undefined}
        />
      )}

      {field.type === "select" && (
        <SelectField
          id={field.id}
          label={field.label}
          options={field.options}
          placeholder={field.placeholder}
          value={field.value as string}
          onChange={(e) => handleChange(e.target.value)}
          error={errors[field.id] ? "This field is required" : undefined}
        />
      )}
    </VStack>
  );
};
