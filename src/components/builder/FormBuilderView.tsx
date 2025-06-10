// components/builder/FormBuilderView.tsx
import { VStack, HStack, Box, Text } from "@/styled-system/jsx";
import { useFormStore } from "@/store/formStore";
import type { FieldType } from "@/types/form";
import { Button } from "@/components/ui/Button";
import { FieldEditor } from "./FieldEditor";
import { FieldList } from "./FieldList";

export const FormBuilderView = () => {
  const addField = useFormStore((s) => s.addField);

  const handleAdd = (type: FieldType) => () => addField(type);

  return (
    <VStack gap="6" align="start">
      <Text fontSize="xl" fontWeight="semibold">
        🛠 Dodaj polja
      </Text>
      <HStack gap="3">
        <Button onClick={handleAdd("text")}>+ Text</Button>
        <Button onClick={handleAdd("checkbox")}>+ Checkbox</Button>
        <Button onClick={handleAdd("select")}>+ Select</Button>
      </HStack>

      <Box width="full">
        <FieldList />
      </Box>
    </VStack>
  );
};
