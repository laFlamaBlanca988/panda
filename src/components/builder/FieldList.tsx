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
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-system/jsx";

const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8",
    marginTop: "4",
    height: "200px",
    borderRadius: "md",
    border: "2px dashed",
    borderColor: "gray.200",
    color: "gray.500",
    textAlign: "center",
  },
});

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
        <AnimatePresence mode="popLayout">
          {fields.length > 0 ? (
            fields.map((field) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <SortableField
                  field={field}
                  onEdit={() => setSelectedFieldId(field.id)}
                  onDelete={() => deleteField(field.id)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState>
              <p>No fields added yet</p>
              <p>Use the options above to add form fields</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  );
};
