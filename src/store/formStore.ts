// src/store/formStore.ts
import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

export type FieldType = "text" | "checkbox" | "select";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormStore {
  fields: FormField[];
  history: FormField[][];
  historyIndex: number;
  addField: (type: FieldType) => void;
  updateField: (id: string, updated: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  undo: () => void;
  redo: () => void;
  importFields: (json: FormField[]) => void;
  exportFields: () => string;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      fields: [],
      history: [],
      historyIndex: -1,

      addField: (type) => {
        const newField: FormField = {
          id: nanoid(),
          type,
          label: "New field",
          required: false,
          placeholder: type === "text" ? "Enter text" : undefined,
          options: type === "select" ? ["Option 1", "Option 2"] : undefined,
        };
        const updated = [...get().fields, newField];
        set({ fields: updated });
        pushToHistory(updated);
      },

      updateField: (id, updatedProps) => {
        const updated = get().fields.map((f) =>
          f.id === id ? { ...f, ...updatedProps } : f
        );
        set({ fields: updated });
        pushToHistory(updated);
      },

      deleteField: (id) => {
        const updated = get().fields.filter((f) => f.id !== id);
        set({ fields: updated });
        pushToHistory(updated);
      },

      moveField: (fromIndex, toIndex) => {
        const updated = [...get().fields];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        set({ fields: updated });
        pushToHistory(updated);
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({ fields: history[newIndex], historyIndex: newIndex });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({ fields: history[newIndex], historyIndex: newIndex });
        }
      },

      importFields: (json) => {
        set({ fields: json });
        pushToHistory(json);
      },

      exportFields: () => {
        return JSON.stringify(get().fields, null, 2);
      },
    }),
    {
      name: "form-storage",
      partialize: (state) => ({ fields: state.fields }), // optional persist strategy
    }
  )
);

function pushToHistory(fields: FormField[]) {
  const { history, historyIndex } = useFormStore.getState();
  const newHistory = [...history.slice(0, historyIndex + 1), fields];
  useFormStore.setState({
    history: newHistory,
    historyIndex: newHistory.length - 1,
  });
}
