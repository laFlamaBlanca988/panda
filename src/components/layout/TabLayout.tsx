// components/layout/TabLayout.tsx
import { useUIStore } from "@/store/uiStore";
import { LivePreviewView } from "@/components/preview/LivePreviewView";
import { FormBuilderView } from "../preview/FormBuilderView";

export const TabLayout = () => {
  const { activeTab, setTab } = useUIStore();

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button
          className={activeTab === "builder" ? "font-bold" : ""}
          onClick={() => setTab("builder")}
        >
          🛠 Builder
        </button>
        <button
          className={activeTab === "preview" ? "font-bold" : ""}
          onClick={() => setTab("preview")}
        >
          👀 Preview
        </button>
      </div>

      <div className="border rounded-lg p-4">
        {activeTab === "builder" && <FormBuilderView />}
        {activeTab === "preview" && <LivePreviewView />}
      </div>
    </div>
  );
};
