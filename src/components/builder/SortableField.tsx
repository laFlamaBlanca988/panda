// src/components/builder/SortableField.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormField } from "@/types/form";
import { styled } from "styled-system/jsx";
import { useUIStore } from "@/store/uiStore";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaGripVertical } from "react-icons/fa6";

interface SortableFieldProps {
  field: FormField;
  onEdit: () => void;
  onDelete: () => void;
}

const FieldCard = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    p: 3,
    mb: 2,
    border: "1px solid",
    borderColor: "border",
    borderRadius: "md",
    bg: "white",
    transition: "all 0.2s ease",
    _hover: {
      borderColor: "primary.300",
    },
  },
  variants: {
    selected: {
      true: {
        borderColor: "primary.500",
        borderWidth: "2px",
        bg: "primary.50",
        boxShadow: "0 0 0 1px token(colors.primary.300)",
      },
    },
    dragging: {
      true: {
        opacity: 0.5,
        bg: "gray.50",
      },
    },
  },
});

const DragHandle = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "grab",
    color: "gray.400",
    marginRight: 3,
    _hover: {
      color: "gray.600",
    },
  },
});

const FieldContent = styled("div", {
  base: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});

const FieldLabel = styled("div", {
  base: {
    fontWeight: "medium",
  },
});

const FieldType = styled("div", {
  base: {
    fontSize: "xs",
    color: "gray.500",
    mt: 0.5,
  },
});

const ActionButtons = styled("div", {
  base: {
    display: "flex",
    gap: 2,
  },
});

const IconButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    border: "none",
    bg: "transparent",
    borderRadius: "md",
    cursor: "pointer",
    color: "gray.500",
    transition: "all 0.2s",
    _hover: {
      bg: "gray.100",
      color: "gray.700",
    },
  },
  variants: {
    danger: {
      true: {
        _hover: {
          bg: "error.50",
          color: "error.600",
        },
      },
    },
  },
});

export function SortableField({ field, onEdit, onDelete }: SortableFieldProps) {
  const { selectedFieldId } = useUIStore();
  const isSelected = selectedFieldId === field.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <FieldCard
      ref={setNodeRef}
      style={style}
      selected={isSelected}
      dragging={isDragging}
      onClick={onEdit} // Make the entire card clickable for better UX
    >
      <DragHandle {...attributes} {...listeners}>
        <FaGripVertical size={20} />
      </DragHandle>

      <FieldContent>
        <FieldLabel>{field.label || `Untitled ${field.type} field`}</FieldLabel>
        <FieldType>
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
          {field.required && " (Required)"}
        </FieldType>
      </FieldContent>

      <ActionButtons>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <FiEdit size={18} />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          danger
        >
          <FiTrash2 size={18} />
        </IconButton>
      </ActionButtons>
    </FieldCard>
  );
}
