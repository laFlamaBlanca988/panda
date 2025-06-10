// src/components/builder/FieldList.tsx
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormStore } from "@/store/formStore";
import { SortableField } from "./SortableField";
import { useUIStore } from "@/store/uiStore";

export const FieldList = () => {
  const { fields, moveField, deleteField } = useFormStore();
  const { setSelectedFieldId } = useUIStore();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = fields.findIndex((f) => f.id === active.id);
        const newIndex = fields.findIndex((f) => f.id === over.id);
        moveField(oldIndex, newIndex);
      }}
    >
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {fields.map((field) => (
          <SortableField
            key={field.id}
            field={field}
            onEdit={() => setSelectedFieldId(field.id)}
            onDelete={() => deleteField(field.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
