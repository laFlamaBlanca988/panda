// components/builder/FormBuilderView.tsx
import { useFormStore } from "@/store/formStore";
import type { FieldType } from "@/types/form";
import { FieldList } from "../builder/FieldList";
import Button from "../ui/Button";
// import { FieldEditor } from "./FieldEditor";

export const FormBuilderView = () => {
  const addField = useFormStore((s) => s.addField);

  const handleAdd = (type: FieldType) => () => addField(type);

  return (
    <div>
      <div>
        <Button onClick={handleAdd("text")}>+ Text</Button>
        <Button onClick={handleAdd("checkbox")}>+ Checkbox</Button>
        <Button onClick={handleAdd("select")}>+ Select</Button>
      </div>

      <div>
        <FieldList />
      </div>
    </div>
  );
};
