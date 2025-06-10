import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormField } from "@/types/form";
import Button from "../ui/Button";
import { useFormStore } from "@/store/formStore";
import { TextField } from "../ui/TextField";
import { CheckboxField } from "../ui/CheckboxField";
import { SelectField } from "../ui/SelectField";
interface Props {
  field: FormField;
  onEdit: () => void;
  onDelete: () => void;
}

export const SortableField = ({ field, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const updateField = useFormStore((state) => state.updateField);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, { value: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(field.id, { value: e.target.checked });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(field.id, { value: e.target.value });
  };

  const displayPreview = () => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            id={field.id}
            value={field.value}
            label={field.label}
            placeholder={field.placeholder}
            onChange={handleTextChange}
            required={field.required}
          />
        );
      case "checkbox":
        return (
          <CheckboxField
            id={field.id}
            checked={field.value}
            label={field.label}
            onChange={handleCheckboxChange}
            required={field.required}
          />
        );
      case "select":
        return (
          <SelectField
            id={field.id}
            value={field.value}
            label={field.label}
            onChange={handleSelectChange}
            placeholder={field.placeholder}
            options={field.options}
            required={field.required}
          />
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="border p-2 rounded mb-2 bg-white cursor-move"
    >
      <div className="mb-2">
        <strong>{field.label || "Untitled"}</strong>{" "}
        <span className="text-sm text-gray.500">({field.type})</span>
      </div>
      <div className="mb-2">{displayPreview()}</div>
      <div className="flex gap-2">
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};
