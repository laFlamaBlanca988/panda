import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";
import type {
  FormField,
  FieldType,
  TextField,
  SelectField,
  CheckboxField,
} from "@/types/form";

interface FormStore {
  fields: FormField[];
  history: FormField[][];
  historyIndex: number;
  addField: (type: FieldType) => void;
  updateField: (
    id: string,
    updatedProps:
      | Partial<TextField>
      | Partial<SelectField>
      | Partial<CheckboxField>
  ) => void;
  deleteField: (id: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  undo: () => void;
  redo: () => void;
  importFields: (json: FormField[]) => void;
  exportFields: () => string;
  reset: () => void;
  persist?: {
    clearStorage?: () => void;
  };
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      fields: [],
      history: [],
      historyIndex: -1,

      addField: (type) => {
        let newField: FormField;

        switch (type) {
          case "text":
            newField = {
              id: nanoid(),
              type: "text",
              label: "New field",
              required: false,
              value: "",
              placeholder: "Enter text",
            };
            break;
          case "select":
            newField = {
              id: nanoid(),
              type: "select",
              label: "New field",
              required: false,
              value: "",
              options: ["Option 1", "Option 2"],
              placeholder: "Select an option",
            };
            break;
          case "checkbox":
            newField = {
              id: nanoid(),
              type: "checkbox",
              label: "New field",
              required: false,
              value: false,
            };
            break;
          default:
            throw new Error(`Unknown field type: ${type}`);
        }
        const updated: FormField[] = [...get().fields, newField];
        set({ fields: updated });
        pushToHistory(updated);
      },

      updateField: (id, updatedProps) => {
        const updated = get().fields.map((f) => {
          if (f.id !== id) return f;

          switch (f.type) {
            case "text":
              return {
                ...f,
                ...updatedProps,
              } as TextField;
            case "select":
              return {
                ...f,
                ...updatedProps,
              } as SelectField;
            case "checkbox":
              return {
                ...f,
                ...updatedProps,
              } as CheckboxField;
            default:
              return f;
          }
        });

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
        if (
          fromIndex < 0 ||
          fromIndex >= updated.length ||
          toIndex < 0 ||
          toIndex >= updated.length
        )
          return;

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
      reset: async () => {
        set(() => ({
          fields: [],
          history: [],
          historyIndex: -1,
        }));

        const state = useFormStore.getState();
        if (state.persist?.clearStorage) {
          state.persist.clearStorage();
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
