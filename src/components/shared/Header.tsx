import { useRef, useState } from "react";
import { useFormStore } from "@/store/formStore";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";
import { FiSave, FiUpload, FiX, FiCode } from "react-icons/fi";
import { BiUndo, BiRedo, BiReset } from "react-icons/bi";
import { Box, Flex } from "styled-system/jsx";
import Button from "@/components/ui/Button";
import { H1 } from "../ui/Heading";

export const Header = () => {
  const { fields, exportFields, importFields, undo, redo, reset } =
    useFormStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportedJson, setExportedJson] = useState("");
  const exportIsDisabled = fields.length === 0;

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === "string") {
          const json = JSON.parse(result);
          importFields(json);
          toast.success("Form configuration imported successfully!");
        }
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleExport = () => {
    const json = exportFields();
    setExportedJson(json);
    setIsExportOpen(true);
  };

  const handleDownload = () => {
    const blob = new Blob([exportedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form-config.json";
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Form configuration downloaded!");
    setIsExportOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(exportedJson)
      .then(() => {
        toast.success("JSON copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <Box
      py="4"
      px="6"
      bg="gray.100"
      borderBottom="1px solid"
      borderColor="gray.200"
      width="100%"
    >
      <Flex justify="space-between" align="center">
        <H1>Form Builder</H1>

        <Flex gap="3">
          <Button onClick={reset}>
            <BiReset /> Reset
          </Button>
          <Button onClick={undo}>
            <BiUndo /> Undo
          </Button>
          <Button onClick={redo}>
            <BiRedo /> Redo
          </Button>
          <Button onClick={handleImportClick}>
            <FiUpload /> Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button disabled={exportIsDisabled} onClick={handleExport}>
            <FiSave /> Export
          </Button>
        </Flex>
      </Flex>

      <Dialog.Root open={isExportOpen} onOpenChange={setIsExportOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 50,
            }}
          />
          <Dialog.Content
            style={{
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              color: "black",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              maxWidth: "500px",
              maxHeight: "85vh",
              padding: "25px",
              zIndex: 51,
              overflow: "auto",
            }}
          >
            <Dialog.Title
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Export Form Configuration
            </Dialog.Title>

            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
                maxHeight: "300px",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              {exportedJson}
            </pre>

            <Flex gap="3" justify="flex-end">
              <Button onClick={copyToClipboard}>
                <FiCode /> Copy JSON
              </Button>
              <Button onClick={handleDownload}>
                <FiSave /> Download
              </Button>
              <Dialog.Close asChild>
                <Button>
                  <FiX /> Close
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Box>
  );
};
