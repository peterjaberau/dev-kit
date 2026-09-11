import { create } from "zustand"
import { getGlobalSettings, saveRegionState, setWatcherEnabled, setSuppressedAutoOpenPanels } from "../lib/commands"
import type { GlobalSettings, RegionPlacement } from "../lib/types"

interface SettingsStore {
  settings: GlobalSettings | null
  init: () => Promise<void>
  setRegionPlacement: (placement: RegionPlacement) => Promise<void>
  setWatcherEnabled: (enabled: boolean) => Promise<void>
  setSuppressedAutoOpenPanels: (panels: string[]) => Promise<void>
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,

  async init() {
    if (get().settings) return
    const settings = await getGlobalSettings()
    set({ settings })
  },

  async setRegionPlacement(placement: RegionPlacement) {
    const s = get().settings
    await saveRegionState(
      placement,
      s?.global_region_size_top ?? null,
      s?.global_region_size_left ?? null,
      s?.global_dock_collapsed ?? false,
    )
    if (s) {
      set({ settings: { ...s, global_region_placement: placement } })
    }
  },

  async setWatcherEnabled(enabled) {
    await setWatcherEnabled(enabled)
    const s = get().settings
    if (s) {
      set({ settings: { ...s, watcher_enabled: enabled } })
    }
  },

  async setSuppressedAutoOpenPanels(panels) {
    await setSuppressedAutoOpenPanels(panels)
    const s = get().settings
    if (s) set({ settings: { ...s, suppressed_auto_open_panels: panels } })
  },
}))
