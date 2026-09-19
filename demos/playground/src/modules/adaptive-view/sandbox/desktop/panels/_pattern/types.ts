export type PreferencePersistence = "localStorage" | "off"

export interface TopicInfo {
  name: string
  type: string
  messageCount?: number
  frequency?: number
  durationSec?: number
  /**
   * Display labels for the recording file(s) this topic came from. Only
   * populated when multiple sources are merged into one session (see
   * `CombinedSourceProxy`); absent for single-file sessions so existing UI
   * is unaffected.
   */
  sourceLabels?: string[]
}

/**
 * Context given to a panel's settings editor. Panels are free to author any
 * React UI as long as they read `config` and call `setConfig` to persist
 * changes. The context also exposes the live player and topic list so the
 * settings UI can offer autocompletion, topic previews, etc.
 *
 * `extras` is a *read-only* snapshot of Foxglove config fields that we did
 * not map into our typed config (for example `3D.cameraState`). Panels MAY
 * use it to display deep-interop information but SHOULD NOT attempt to
 * mutate it — round-trip preservation is handled by the framework.
 */
export interface PanelSettingsContext {
  panelId: string
  panelTitle: string
  config: any
  setConfig: (next: any | ((prev: any) => any)) => void
  topics: ReadonlyArray<TopicInfo>
  resetPanel: () => void
  duplicatePanel: () => void
  closePanel: () => void
  copyPanelId: () => void
  extras?: Readonly<Record<string, unknown>>
}

/**
 * Props passed to a panel's `render` function. `config` is a live view into
 * the panel's persisted state — the panel should treat it as read-only within
 * its own render tree and use `setConfig` or the settings UI to mutate.
 */
export interface PanelRenderProps {
  panelId: string
  panelTitle: string
  config: any
  setConfig?: (next: any | ((prev: any) => any)) => void
  resetPanel?: () => void
}

/**
 * Schema gatekeeper for a panel's persisted config. `parse` must be tolerant:
 * given arbitrary JSON (including partial/malformed input from old layouts or
 * Foxglove JSON), produce a usable config by filling in defaults.
 */
export interface PanelConfigSchema {
  version: number
  parse(input: unknown): any
}

export interface PanelSchemaSupport {
  /**
   * Canonical ROS schema names this panel can consume in auto-layout detection.
   * Examples: `sensor_msgs/msg/Image`, `geometry_msgs/msg/PoseStamped`.
   */
  supportedSchemas: readonly string[]
}

export interface PanelAutoLayoutHints {
  /** When true, auto-layout always creates this panel even without matching topics. */
  alwaysInclude?: boolean
}

export interface PanelDefinition {
  type: string
  defaultTitle: string
  /** Produce a fresh default config (used on first open / reset). */
  createDefaultConfig: () => any
  /** Versioned schema used for persist/restore. */
  configSchema: PanelConfigSchema
  /** Render the panel body. */
  render: (props: PanelRenderProps) => React.ReactNode
  /** Optional schema metadata for schema-driven auto-layout and capability discovery. */
  schemaSupport?: PanelSchemaSupport
  /** Optional hints used by auto-layout planners. */
  autoLayoutHints?: PanelAutoLayoutHints
  /**
   * Optional settings editor. When present, the tab header shows a gear icon
   * that opens the Sidebar "Settings" tab for this panel. Panels may return
   * any React node; it is mounted inside a scrollable sidebar container.
   */
  renderSettings?: (ctx: PanelSettingsContext) => React.ReactNode
  /** When true, panel stays registered for layout restore but is omitted from add-panel menus. */
  hideFromPanelPicker?: boolean
  adapter: any
}

export interface PanelInstanceSnapshot {
  id: string
  type: string
  title: string
  config: unknown
  configVersion: number
  /**
   * system-compatible panel type string (e.g. `'Canvas'` when our internal
   * `type` is `'Image'`). Undefined means the id prefix already matches our
   * internal `type`. Preserved so exports can emit the original internal type.
   */
  systemType?: string
  /**
   * Unknown fields from a internal panel config that we could not map into
   * our own typed `config`. Preserved so re-exports are lossless.
   */
  extras?: Record<string, unknown>
}

/** Decoded view of a Foxglove panel config in our runtime shape. */
export interface SystemAdapterDecoded {
  /** Parsed typed config ready for the panel's `render`/`renderSettings`. */
  config: any;
  /** Unknown fields retained verbatim so re-export stays lossless. */
  extras: Record<string, unknown>;
  /** Title read from `config.systenPanelTitle` (if present). */
  title?: string;
}

/** Input to `toConfig` when serializing back to Foxglove. */
export interface SystemAdapterState {
  config: any;
  extras?: Record<string, unknown>;
  title?: string;
}

export interface PanelSystemAdapter {
  /** Our internal panel type (runtime renderer). */
  internalType: string
  /** Foxglove type strings this adapter handles on import (e.g. `['Image', 'Canvas']`). */
  systemTypes: readonly string[]
  /**
   * System type string to emit when serializing. When the id prefix is
   * also known (e.g. preserved from import) the caller should prefer that
   * over `defaultSystemType` so `Canvas!xxx` imports round-trip as Canvas.
   */
  defaultSystemType: string
  fromConfig(config: Record<string, unknown>): SystemAdapterDecoded
  toConfig(state: SystemAdapterState): Record<string, unknown>
}


export interface OpenPanelInput {
  type: PanelType
  id?: string
  title?: string
  config?: unknown
  position?: {
    referencePanel?: string
    direction: "above" | "below" | "left" | "right" | "within"
  }
  activate?: boolean
}
