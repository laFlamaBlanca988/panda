import { useFormStore } from "@/store/formStore";
import type { FormField } from "@/types/form";
import { VStack } from "../../../styled-system/jsx";
import { TextField } from "../ui/TextField";
import { CheckboxField } from "../ui/CheckboxField";
import { SelectField } from "../ui/SelectField";

interface Props {
  field: FormField;
  errors: Record<string, boolean>;
}

export const FormFieldRenderer = ({ field, errors }: Props) => {
  const updateField = useFormStore((state) => state.updateField);

  const handleChange = (value: string | boolean) => {
    updateField(field.id, { value });
  };

  return (
    <VStack alignItems="start" gap="1">
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span>*</span>}
      </label>

      {field.type === "text" && (
        <TextField
          id={field.id}
          value={field.value as string}
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}

      {field.type === "checkbox" && (
        <CheckboxField
          id={field.id}
          checked={Boolean(field.value)}
          onChange={(e) => handleChange(e.target.checked)}
          label={field.label}
          required={field.required}
        />
      )}

      {field.type === "select" && (
        <SelectField
          id={field.id}
          label={field.label}
          options={field.options}
          placeholder={field.placeholder}
          required={field.required}
          value={field.value as string}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}

      {errors[field.id] && <span>This field is required</span>}
    </VStack>
  );
};
