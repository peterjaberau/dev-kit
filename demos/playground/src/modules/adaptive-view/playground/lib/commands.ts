import { LayoutDocument } from "./types"

export const invoke: any = (cmd: any, input: any) => {}

/**
 * Layout machine commands
 */
export const loadLayout = (name: string) => invoke("load_layout", { name })

export const listLayouts = (name: string) => invoke("list_layouts", { name })

export const saveLayout = (name: string, contents: LayoutDocument) => invoke("save_layout", { name, contents })

export const renameLayout = (oldName: string, newName: string) => invoke("rename_layout", { oldName, newName })

export const deleteLayout = (name: string) => invoke("delete_layout", { name })

// --- settings ---

export const getGlobalSettings = () => invoke("get_global_settings")

export const saveRegionState = (
  placement: import("./types").RegionPlacement,
  sizeTop: number | null,
  sizeLeft: number | null,
  collapsed: boolean,
) => invoke("save_region_state", { placement, sizeTop, sizeLeft, collapsed })

export const setWatcherEnabled = (enabled: boolean) => invoke("set_watcher_enabled", { enabled })

export const setSuppressedAutoOpenPanels = (panels: string[]) => invoke("set_suppressed_auto_open_panels", { panels })
