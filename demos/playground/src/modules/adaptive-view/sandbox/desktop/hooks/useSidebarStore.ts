import { create } from 'zustand';

export type SidebarTabId = string;

export type QualityFilter = {
  topic?: string;
  query?: string;
};

interface SidebarState {
  tab: SidebarTabId;
  /** `panelId` whose settings are shown in the Settings tab (follows DockView's active panel). */
  activePanelId: string | null;
  setTab: (tab: SidebarTabId) => void;
  setActivePanelId: (panelId: string | null) => void;
  /** Convenience: switch to the Settings tab and set `activePanelId` in one go. */
  openSettingsFor: (panelId: string) => void;
}

/**
 * Global UI store for the left Sidebar. Hoisted out of `Sidebar.tsx` so that
 * - the panel tab header's gear button can call `openSettingsFor(panelId)`;
 * - DockView's "active panel changed" event can seed `activePanelId` without
 *   drilling a React prop through every layer.
 */
export const useSidebarStore = create<SidebarState>((set) => ({
  tab: 'topics',
  activePanelId: null,
  setTab: (tab) => set({ tab }),
  setActivePanelId: (panelId) => set({ activePanelId: panelId }),
  openSettingsFor: (panelId) => set({ tab: 'settings', activePanelId: panelId }),
}));
