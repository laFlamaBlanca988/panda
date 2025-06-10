// store/uiStore.ts
import { create } from "zustand";

type ViewTab = "builder" | "preview";

interface UIState {
  activeTab: ViewTab;
  setTab: (tab: ViewTab) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "builder",
  setTab: (tab) => set({ activeTab: tab }),
}));
