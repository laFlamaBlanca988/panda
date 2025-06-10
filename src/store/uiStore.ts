import { create } from "zustand";

type ViewTab = "builder" | "preview";

interface UIState {
  activeTab: ViewTab;
  setTab: (tab: ViewTab) => void;

  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "builder",
  setTab: (tab) => set({ activeTab: tab }),

  selectedFieldId: null,
  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
}));
