// src/components/builder/SortableField.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormField } from "@/store/formStore";
import { cx } from "@/styled-system/css";
import { Button } from "../ui/Button";

interface Props {
  field: FormField;
  onEdit: () => void;
  onDelete: () => void;
}

export const SortableField = ({ field, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cx(
        "flex items-center justify-between p-2 mb-2 rounded bg-gray.100 hover:bg-gray.200",
        "cursor-grab"
      )}
      {...attributes}
      {...listeners}
    >
      <div>
        <strong>{field.label}</strong>{" "}
        <span className="text-sm text-gray.500">({field.type})</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={onEdit}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" color="red" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
