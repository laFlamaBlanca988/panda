import React from "react";
import { useFormStore } from "@/store/formStore";
import { FormFieldRenderer } from "@/components/shared/FormFieldRenderer";
import Button from "../ui/Button";

export const LivePreviewView = () => {
  const fields = useFormStore((state) => state.fields);

  const [errors, setErrors] = React.useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    fields.forEach((field) => {
      if (field.required) {
        const inputField = document.querySelector(
          `input[name="${field.id}"]`
        ) as HTMLInputElement;
        if (!inputField || !inputField.value) {
          newErrors[field.id] = true;
        }
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {fields.map((field) => (
          <FormFieldRenderer key={field.id} field={field} errors={errors} />
        ))}
        <Button>Submit</Button>
      </div>
    </form>
  );
};
