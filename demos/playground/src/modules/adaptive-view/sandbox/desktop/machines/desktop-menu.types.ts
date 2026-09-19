export type TabMenuBuiltin =
  | "separator"
  | "close"
  | "closeOthers"
  | "closeAll"
  | "closeLeft"
  | "closeRight"
  | "maximize"
export type TabGroupMenuBuiltin = "rename" | "colorPicker" | "collapse" | "close" | "separator"
export type OverflowMode = "dropdown" | "wrap"

export type TabMenuTemplate =
  | TabMenuBuiltin
  | { kind: "overflow"; mode: OverflowMode }
  | { kind: "docking" }
  | { kind: "membership"; createLabel: string; prompt: string }

export type TabGroupMenuTemplate =
  | TabGroupMenuBuiltin
  | {
      kind: "command"
      label: string
      eventType: "onFloatGroup" | "onPopoutGroup" | "onDissolveTabGroup"
    }

export type MenuCommand = {
  kind: "command"
  label: string
  event: { type: string; params: Record<string, unknown> }
  prompt?: string
}
export type MenuRenderer =
  | { kind: "renderer"; renderer: "float" | "popout" | "edgeAutoHide" }
  | { kind: "renderer"; renderer: "overflow"; mode: OverflowMode; active: boolean }
export type MenuItem<T extends string> = T | MenuCommand | MenuRenderer
