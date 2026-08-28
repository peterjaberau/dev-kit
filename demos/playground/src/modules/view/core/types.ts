/**
 * Public type surface of View core: the layout, snapshot, controller, panel,
 * and tab shapes that consumers author, persist, and drive imperatively.
 */

/** Stable identifier for a panel, unique within a workspace. */
export type ViewPanelId = string
/** Stable identifier for a tab, unique within a workspace. */
export type ViewTabId = string

/**
 * A size value: a bare number, a percentage string (`'50%'`), or a pixel
 * string (`'320px'`). Bare numbers are treated as percentages of the parent.
 */
export type ViewSize = number | `${number}%` | `${number}px`

/**
 * Dimensions of the container a {@link ViewSize} is resolved against, used to
 * convert percentage and pixel sizes into concrete values.
 */
export type ViewSizeResolutionContext = {
  /** Available width in pixels. */
  width?: number
  /** Available height in pixels. */
  height?: number
}

/** A direction a split or move can grow toward. */
export type ViewDirection = "left" | "right" | "top" | "bottom"

/** The side of the root a pinned edge panel attaches to. */
export type ViewEdge = ViewDirection

/** Distances from each side of the root, expressed as percentages. */
export type ViewInset = {
  /** Inset from the top edge, in percent. */
  top: number
  /** Inset from the right edge, in percent. */
  right: number
  /** Inset from the bottom edge, in percent. */
  bottom: number
  /** Inset from the left edge, in percent. */
  left: number
}

/** Position and size of a floating panel, as percentages of the root. */
export type ViewFloatingPanelBounds = {
  /** Left offset, in percent. */
  x: number
  /** Top offset, in percent. */
  y: number
  /** Width, in percent. */
  width: number
  /** Height, in percent. */
  height: number
}

/** Partial floating bounds; omitted fields fall back to defaults. */
export type ViewFloatingPanelBoundsInit = Partial<ViewFloatingPanelBounds>

/** A grip on a floating panel that can be dragged to resize it. */
export type ViewFloatingResizeEdge =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

/** Position and size of a popped-out native window, in pixels. */
export type ViewPopoutWindowBounds = {
  /** Window left, in pixels. */
  left: number
  /** Window top, in pixels. */
  top: number
  /** Window width, in pixels. */
  width: number
  /** Window height, in pixels. */
  height: number
}

/** Partial popout window bounds; omitted fields fall back to defaults. */
export type ViewPopoutWindowBoundsInit = Partial<ViewPopoutWindowBounds>

/** Where a popped-out panel's native window is placed. */
export type ViewPopoutPanelPlacement = {
  /** The native window's position and size, in pixels. */
  windowBounds: ViewPopoutWindowBounds
}

/**
 * Pop-out request for an authored floating panel: `true` to pop out with
 * defaults, or an object to seed the native window bounds.
 */
export type ViewPopoutPanelConfig =
  | boolean
  | {
      windowBounds?: ViewPopoutWindowBoundsInit
    }

/** Options for `floatPanel()` / `panel.float()`: starting bounds plus behavior. */
export type ViewFloatPanelOptions = ViewFloatingPanelBoundsInit & ViewLayoutBehaviorConfig

/** Options for `popoutPanel()` / `panel.popout()`: floating fallback bounds, native window bounds, and behavior. */
export type ViewPopoutPanelOptions = {
  /** Bounds used if the panel later returns to the in-page floating layer. */
  floatingBounds?: ViewFloatingPanelBoundsInit
  /** Initial native window position and size. */
  windowBounds?: ViewPopoutWindowBoundsInit
} & ViewLayoutBehaviorConfig

/** Options for `floatTab()` / `tab.float()`: the new floating panel's id, bounds, and behavior. */
export type ViewFloatTabOptions = {
  /** Id to assign the floating panel that wraps the extracted tab. */
  panelId?: ViewPanelId
  /** Starting bounds for the new floating panel. */
  bounds?: ViewFloatingPanelBoundsInit
} & ViewLayoutBehaviorConfig

/** Options for `popoutTab()` / `tab.popout()`: the wrapping panel's id plus popout options. */
export type ViewPopoutTabOptions = ViewPopoutPanelOptions & {
  /** Id to assign the panel that wraps the extracted tab. */
  panelId?: ViewPanelId
}

/** Resolved placement of a floating panel: its bounds, stacking order, and optional popout state. */
export type ViewFloatingPanelPlacement = {
  /** Current floating position and size. */
  bounds: ViewFloatingPanelBounds
  /** Stacking order among floating panels; higher sits on top. */
  zIndex: number
  /** Present when the floating panel is popped out into a native window. */
  popout?: ViewPopoutPanelPlacement
}

/** Resolved placement of a pinned edge panel: its side and pinned extent. */
export type ViewEdgePanelPlacement = {
  /** Edge the panel is pinned to. */
  side: ViewEdge
  /** Pinned width or height, as a percentage of the root. */
  size: number
  /** Reset target used when double-clicking the edge divider. */
  defaultSize?: number
}

/** Fields shared by every panel runtime state regardless of kind. */
type ViewPanelStateBase = {
  /** Panel identifier. */
  id: ViewPanelId
  /** Current distances from each root edge, in percent. */
  inset: ViewInset
  /** Ids of the tabs in this panel, in display order. */
  tabs: ViewTabId[]
  /** Id of the active tab, or `null` when the panel is empty. */
  activeTabId: ViewTabId | null
  /** Whether this panel is currently shown fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint, if set. */
  minSize?: ViewSize
  /** Maximum size constraint, if set. */
  maxSize?: ViewSize
}

/** Runtime state of a normal tiled panel living in the docked tree. */
export type ViewTiledPanelState = ViewPanelStateBase & {
  kind: "tiled"
  floating?: never
  behavior?: never
}

/** Runtime state of a detached floating panel, including its placement and behavior. */
export type ViewFloatingPanelState = ViewPanelStateBase & {
  kind: "floating"
  /** Floating placement: bounds, z-index, and optional popout. */
  floating: ViewFloatingPanelPlacement
  /** Resolved resize/drag/drop behavior. */
  behavior: ViewLayoutBehavior
}

/** Runtime state of a pinned edge panel, including its edge placement and behavior. */
export type ViewEdgePanelState = ViewPanelStateBase & {
  kind: "edge"
  /** Edge placement: side and pinned size. */
  edge: ViewEdgePanelPlacement
  /** Resolved resize/drag/drop behavior. */
  behavior: ViewLayoutBehavior
  floating?: never
}

/** Runtime state of a panel, discriminated by `kind`. */
export type ViewPanelState = ViewTiledPanelState | ViewFloatingPanelState | ViewEdgePanelState

/** Runtime state of a single tab and its data payload. */
export type ViewTabState<TData = unknown> = {
  /** Tab identifier. */
  id: ViewTabId
  /** Id of the panel that currently owns this tab. */
  panelId: ViewPanelId
  /** Application-supplied payload for the tab. */
  data: TData
  /** Whether close actions are allowed on this tab. */
  closable: boolean
  /** Whether this tab may be dragged or moved. */
  draggable: boolean
}

/** Resolved tab behavior: explicit close and drag permissions. */
export type ViewTabBehavior = {
  /** Whether close actions are allowed. */
  closable: boolean
  /** Whether move/drag actions are allowed. */
  draggable: boolean
}

/**
 * Authoring shorthand for tab behavior. `locked: true` disables both close and
 * drag; otherwise set `closable`/`draggable` individually.
 */
export type ViewTabBehaviorConfig =
  | {
      locked: true
      closable?: never
      draggable?: never
    }
  | {
      locked?: false
      closable?: boolean
      draggable?: boolean
    }

/**
 * Behavior patch passed to `setTabBehavior()` / `tab.setBehavior()`. Identical
 * to {@link ViewTabBehaviorConfig} — the same `locked` shorthand as authoring.
 */
export type ViewTabBehaviorUpdate = ViewTabBehaviorConfig

/** Resolved layout behavior: explicit resize, drag, and drop permissions. */
export type ViewLayoutBehavior = {
  /** Whether the item can be resized via its dividers. */
  resizable: boolean
  /** Whether the item can be dragged to a new location. */
  draggable: boolean
  /** Whether other content can be dropped onto the item. */
  droppable: boolean
}

/**
 * Authoring shorthand for layout behavior. `locked: true` disables resize,
 * drag, and drop; otherwise set each permission individually.
 */
export type ViewLayoutBehaviorConfig =
  | {
      locked: true
      resizable?: never
      draggable?: never
      droppable?: never
    }
  | {
      locked?: false
      resizable?: boolean
      draggable?: boolean
      droppable?: boolean
    }

/**
 * Internal binary tree describing how the docked area is divided: either a leaf
 * referencing a panel, or a split node containing nested children.
 */
export type ViewLayoutTree =
  | {
      kind: "panel"
      panelId: ViewPanelId
      size?: number
      defaultSize?: number
      resizable?: boolean
      draggable?: boolean
      droppable?: boolean
    }
  | {
      kind: "split"
      id: string
      direction: "horizontal" | "vertical"
      size?: number
      defaultSize?: number
      resizable?: boolean
      draggable?: boolean
      droppable?: boolean
      children: ViewLayoutTree[]
    }

/**
 * Live working state exposed to callbacks and `getState()`. Reflects the current
 * panels, tabs, and tree; meant for inspection, not persistence.
 */
export type ViewLayoutState = {
  /** All panels keyed by id. */
  panels: Record<ViewPanelId, ViewPanelState>
  /** Render order of docked panels. */
  panelOrder: ViewPanelId[]
  /** Render order of pinned edge panels, if any. */
  edgePanelOrder?: ViewPanelId[]
  /** Stacking order of floating panels, if any. */
  floatingPanelOrder?: ViewPanelId[]
  /** All tabs keyed by id. */
  tabs: Record<ViewTabId, ViewTabState>
  /** The docked split tree, or `null`/absent when the main area is empty. */
  layout?: ViewLayoutTree | null
}

/** Authored tab: an optional id, its data payload, and behavior shorthand. */
export type ViewTabInit<TData = unknown> = {
  /** Tab id; generated when omitted. */
  id?: ViewTabId
  /** Application payload for the tab. */
  data: TData
} & ViewTabBehaviorConfig

/** An empty slot in an authored layout, rendered as a drop target. */
export type ViewEmptyInit = {
  type: "empty"
}

/** Authored tiled panel: its tabs, sizing, and behavior shorthand. */
export type ViewPanelInit<TData = unknown> = {
  type: "panel"
  /** Panel id; generated when omitted. */
  id?: ViewPanelId
  /** Allocation within the parent group; equal share when omitted. */
  size?: number
  /** Divider reset target; falls back to `size` when omitted. */
  defaultSize?: number
  /** Tabs to create in this panel. */
  tabs: ViewTabInit<TData>[]
  /** Id of the tab to activate initially. */
  activeTabId?: ViewTabId
  /** Start this panel fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/** Authored split group: a row or column of nested children. */
export type ViewGroupInit<TData = unknown> = {
  type: "group"
  /** Group id; generated when omitted. */
  id?: string
  /** Whether children are laid out as a row or a column. */
  direction: "horizontal" | "vertical"
  /** Allocation within the parent group; equal share when omitted. */
  size?: number
  /** Divider reset target; falls back to `size` when omitted. */
  defaultSize?: number
  /** Ordered child panels or nested groups. */
  children: ViewDockedLayoutInit<TData>[]
} & ViewLayoutBehaviorConfig

/** Any node of an authored docked layout: empty, panel, or group. */
export type ViewDockedLayoutInit<TData = unknown> = ViewEmptyInit | ViewPanelInit<TData> | ViewGroupInit<TData>

/** Authored floating panel: starting bounds, stacking, popout request, and tabs. */
export type ViewFloatingPanelInit<TData = unknown> = {
  type: "floatingPanel"
  /** Panel id; generated when omitted. */
  id?: ViewPanelId
  /** Initial floating bounds. */
  bounds?: ViewFloatingPanelBoundsInit
  /** Initial stacking order among floating panels. */
  zIndex?: number
  /** Pop the panel straight into a native window on boot. */
  popout?: ViewPopoutPanelConfig
  /** Tabs to create in this panel. */
  tabs: ViewTabInit<TData>[]
  /** Id of the tab to activate initially. */
  activeTabId?: ViewTabId
  /** Start this panel fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/** Authored pinned edge panel: the sidebar's size, tabs, and behavior. */
export type ViewEdgePanelInit<TData = unknown> = {
  type: "edgePanel"
  /** Panel id; generated when omitted. */
  id?: ViewPanelId
  /** Pinned width or height, as a percentage of the root. */
  size?: number
  /** Divider reset target; falls back to `size` when omitted. */
  defaultSize?: number
  /** Tabs to create in this panel. */
  tabs: ViewTabInit<TData>[]
  /** Id of the tab to activate initially. */
  activeTabId?: ViewTabId
  /** Start this panel fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/** Authored root: a main docked area plus optional pinned edges and floating panels. */
export type ViewRootInit<TData = unknown> = {
  type: "root"
  /** The central docked layout. */
  main: ViewDockedLayoutInit<TData>
  /** Pinned edge panels keyed by side. */
  edges?: Partial<Record<ViewEdge, ViewEdgePanelInit<TData>>>
  /** Floating panels overlaid on the root. */
  floating?: ViewFloatingPanelInit<TData>[]
}

/**
 * Layout you pass to boot or replace the workspace, via `initialLayout` or
 * `setLayout()`. Accepts authoring shorthand like `locked: true`.
 */
export type ViewInitialLayout<TData = unknown> = ViewDockedLayoutInit<TData> | ViewRootInit<TData>

/** Persisted tiled panel: like its init counterpart but with explicit behavior booleans. */
export type ViewPanelSnapshot<TData = unknown> = {
  type: "panel"
  /** Panel id, preserved across the round trip. */
  id?: ViewPanelId
  /** Allocation within the parent group. */
  size?: number
  /** Divider reset target. */
  defaultSize?: number
  /** Tabs in display order. */
  tabs: ViewTabSnapshot<TData>[]
  /** Id of the active tab. */
  activeTabId?: ViewTabId
  /** Whether the panel was fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehavior

/** Persisted tab: its id, data, and explicit close/drag booleans (never `locked`). */
export type ViewTabSnapshot<TData = unknown> = {
  /** Tab id, preserved across the round trip. */
  id?: ViewTabId
  /** Application payload for the tab. */
  data: TData
} & ViewTabBehavior

/** Persisted split group: a row or column of nested snapshot children. */
export type ViewGroupSnapshot<TData = unknown> = {
  type: "group"
  /** Group id, preserved across the round trip. */
  id?: string
  /** Whether children form a row or a column. */
  direction: "horizontal" | "vertical"
  /** Allocation within the parent group. */
  size?: number
  /** Divider reset target. */
  defaultSize?: number
  /** Ordered child snapshots. */
  children: ViewDockedLayoutSnapshot<TData>[]
} & ViewLayoutBehavior

/** Any node of a persisted docked layout: empty, panel, or group. */
export type ViewDockedLayoutSnapshot<TData = unknown> =
  | ViewEmptyInit
  | ViewPanelSnapshot<TData>
  | ViewGroupSnapshot<TData>

/** Persisted floating panel: concrete bounds, z-order, popout state, and tabs. */
export type ViewFloatingPanelSnapshot<TData = unknown> = {
  type: "floatingPanel"
  /** Panel id, preserved across the round trip. */
  id?: ViewPanelId
  /** Floating position and size. */
  bounds: ViewFloatingPanelBounds
  /** Stacking order among floating panels. */
  zIndex: number
  /** Present when the panel was popped out into a native window. */
  popout?: ViewPopoutPanelPlacement
  /** Tabs in display order. */
  tabs: ViewTabSnapshot<TData>[]
  /** Id of the active tab. */
  activeTabId?: ViewTabId
  /** Whether the panel was fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehavior

/** Persisted pinned edge panel: its side size, tabs, and explicit behavior. */
export type ViewEdgePanelSnapshot<TData = unknown> = {
  type: "edgePanel"
  /** Panel id, preserved across the round trip. */
  id?: ViewPanelId
  /** Pinned width or height, as a percentage of the root. */
  size: number
  /** Divider reset target. */
  defaultSize?: number
  /** Tabs in display order. */
  tabs: ViewTabSnapshot<TData>[]
  /** Id of the active tab. */
  activeTabId?: ViewTabId
  /** Whether the panel was fullscreen. */
  fullScreen?: boolean
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehavior

/** Persisted root: the main docked snapshot plus pinned edges and floating panels. */
export type ViewRootSnapshot<TData = unknown> = {
  type: "root"
  /** The central docked layout snapshot. */
  main: ViewDockedLayoutSnapshot<TData>
  /** Pinned edge panel snapshots keyed by side. */
  edges?: Partial<Record<ViewEdge, ViewEdgePanelSnapshot<TData>>>
  /** Floating panel snapshots. */
  floating: ViewFloatingPanelSnapshot<TData>[]
}

/**
 * Serializable snapshot returned by `getLayout()`. Persist it, then feed it back
 * to `initialLayout` or `setLayout()` to restore the workspace exactly.
 */
export type ViewLayoutSnapshot<TData = unknown> = ViewDockedLayoutSnapshot<TData> | ViewRootSnapshot<TData>

/**
 * Move target that splits one existing panel, placing the moved tab in a new
 * panel beside it on the given side.
 */
export type ViewSplitMoveTarget = {
  /** The panel to split. */
  splitPanel: ViewPanelId
  /** Side of the split panel the new panel grows toward. */
  direction: ViewDirection
  /** Size of the new panel; equal share when omitted. */
  size?: number
  /** Minimum size constraint for the new panel. */
  minSize?: ViewSize
  /** Maximum size constraint for the new panel. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/**
 * Move target that splits the whole main layout, making the new panel a
 * full-width or full-height row or column around it.
 */
export type ViewRootSplitMoveTarget = {
  /** Marks this as a root-level split. */
  splitRoot: true
  /** Side of the root the new row or column grows toward. */
  direction: ViewDirection
  /** Size of the new panel; equal share of the resulting rows/columns when omitted. */
  size?: number
  /** Minimum size constraint for the new panel. */
  minSize?: ViewSize
  /** Maximum size constraint for the new panel. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/**
 * Destination for `movePanel()` / `panel.moveTo()`: a split of an existing panel
 * or the whole root using the moved panel's existing identity.
 */
export type ViewPanelMoveTarget = ViewSplitMoveTarget | ViewRootSplitMoveTarget

/**
 * Destination for `moveTab()` / `tab.moveTo()`: an index in a panel, before or
 * after a tab, or a split of an existing panel or the whole root.
 */
export type ViewMoveTarget =
  | { panel: ViewPanelId; index?: number }
  | { beforeTab: ViewTabId }
  | { afterTab: ViewTabId }
  | ViewSplitMoveTarget
  | ViewRootSplitMoveTarget

/**
 * Insertion target for the open path of `openOrActivateTab()`: an index in a
 * panel, or before/after an existing tab.
 */
export type ViewOpenTabTarget =
  | { panel: ViewPanelId; index?: number }
  | { beforeTab: ViewTabId }
  | { afterTab: ViewTabId }

/**
 * Destination for `dockPanel()` / `panel.dock()`. With no fields the panel docks
 * at a default spot; `splitPanel` + `direction` dock it beside a target panel.
 */
export type ViewDockPanelTarget = {
  /** Existing panel to dock beside. */
  splitPanel?: ViewPanelId
  /** Side of the target panel to dock on. */
  direction?: ViewDirection
  /** Size of the docked panel; equal share when omitted. */
  size?: number
  /** Minimum size constraint. */
  minSize?: ViewSize
  /** Maximum size constraint. */
  maxSize?: ViewSize
} & ViewLayoutBehaviorConfig

/** Whether a divider runs vertically or horizontally. */
export type ViewDividerOrientation = "vertical" | "horizontal"

/** A draggable boundary between panels, with the panels it resizes on each side. */
export type ViewDivider = {
  /** Divider identifier. */
  id: string
  /** Orientation of the divider. */
  orientation: ViewDividerOrientation
  /** Position along the cross axis, in percent. */
  position: number
  /** Start of the divider's span along its length, in percent. */
  start: number
  /** End of the divider's span along its length, in percent. */
  end: number
  /** Panels on the leading side that shrink as the divider moves toward them. */
  beforePanels: ViewPanelId[]
  /** Panels on the trailing side that shrink as the divider moves toward them. */
  afterPanels: ViewPanelId[]
  /** Id of the split this divider belongs to, if any. */
  splitId?: string
  /** Whether dragging is disabled (e.g. a locked neighbor). */
  disabled?: boolean
}

/** A T-shaped meeting point of a vertical and a horizontal divider that can be dragged in both axes. */
export type ViewJunction = {
  /** Junction identifier. */
  id: string
  /** Junction shape; currently always a T-junction. */
  kind: "t"
  /** Horizontal position, in percent. */
  x: number
  /** Vertical position, in percent. */
  y: number
  /** Id of the vertical divider meeting here. */
  verticalDividerId: string
  /** Id of the horizontal divider meeting here. */
  horizontalDividerId: string
  /** Whether dragging is disabled. */
  disabled?: boolean
}

/**
 * Imperative handle exposed through the View ref. Use it when the application,
 * rather than a direct drag gesture, needs to change the workspace.
 */
export type ViewController = {
  /**
   * Looks up a panel by id.
   * @returns The panel, or `null` if no panel has that id.
   */
  getPanel(id: ViewPanelId): ViewPanel | null
  /**
   * Looks up a tab by id.
   * @returns The tab, or `null` if no tab has that id.
   */
  getTab(id: ViewTabId): ViewTab | null
  /** Returns every panel in the workspace. */
  getPanels(): ViewPanel[]
  /** Returns every tab in the workspace. */
  getTabs(): ViewTab[]
  /** Moves an existing tiled panel to a split or root target, preserving panel identity. */
  movePanel(panelId: ViewPanelId, target: ViewPanelMoveTarget): void
  /** Splits a panel and returns the new panel created beside it. */
  splitPanel(
    panelId: ViewPanelId,
    direction: ViewDirection,
    opts?: {
      size?: number
      minSize?: ViewSize
      maxSize?: ViewSize
      tabs?: ViewTabInit[]
      activate?: boolean
    } & ViewLayoutBehaviorConfig,
  ): ViewPanel
  /** Removes a panel and its tabs, redistributing the freed space to neighbors. */
  removePanel(panelId: ViewPanelId): void
  /** Shows a single panel fullscreen, hiding the rest. */
  maximizePanel(panelId: ViewPanelId): void
  /** Restores a fullscreen panel to its tiled position. */
  restorePanel(panelId: ViewPanelId): void
  /** Detaches a panel into the floating layer, optionally setting bounds and behavior. */
  floatPanel(panelId: ViewPanelId, opts?: ViewFloatPanelOptions): void
  /** Opens a panel in a native same-origin browser window. */
  popoutPanel(panelId: ViewPanelId, opts?: ViewPopoutPanelOptions): void
  /** Returns a popped-out panel to the in-page floating layer. */
  returnPanelToFloating(panelId: ViewPanelId, bounds?: ViewFloatingPanelBoundsInit): void
  /** Docks a floating panel back into the tiled tree. */
  dockPanel(panelId: ViewPanelId, target?: ViewDockPanelTarget): void
  /** Raises a floating panel above its peers. */
  focusPanel(panelId: ViewPanelId): void
  /**
   * Sets a floating panel's position and size. Accepts a partial bounds —
   * omitted fields keep their current value.
   */
  setFloatingPanelBounds(panelId: ViewPanelId, bounds: ViewFloatingPanelBoundsInit): void
  /** Stores the native window position and size for a popped-out panel. */
  setPopoutWindowBounds(panelId: ViewPanelId, bounds: ViewPopoutWindowBounds): void
  /** Appends a tab to the end of a panel's tab row. */
  appendTab(panelId: ViewPanelId, tab: ViewTabInit, opts?: { activate?: boolean }): ViewTab
  /** Inserts a tab into a panel at a specific index. */
  insertTab(panelId: ViewPanelId, tab: ViewTabInit, index: number, opts?: { activate?: boolean }): ViewTab
  /**
   * Idempotently opens a tab keyed by stable id (file path, route, issue id). If
   * the id already exists, activates that tab without touching its data; if it
   * is missing, inserts it at the target and activates it.
   * @returns The activated or inserted tab, or `null` if it could not be opened.
   */
  openOrActivateTab(tab: ViewTabInit, target: ViewOpenTabTarget): ViewTab | null
  /**
   * Renames a tab's id in place, preserving its data, order, and active state.
   * @returns The renamed tab, or `null` if the old id is missing or the new id
   * is already in use.
   */
  changeTabId(oldTabId: ViewTabId, newTabId: ViewTabId): ViewTab | null
  /** Removes a tab; also removes its panel when it was the panel's last tab. */
  removeTab(tabId: ViewTabId): void
  /** Moves a tab to another panel, index, or split target. */
  moveTab(tabId: ViewTabId, target: ViewMoveTarget): void
  /**
   * Extracts a tab into a new floating panel.
   * @returns The new floating panel, or `null` if the tab could not be extracted.
   */
  floatTab(tabId: ViewTabId, opts?: ViewFloatTabOptions): ViewPanel | null
  /**
   * Extracts a tab into a new panel opened in a native window.
   * @returns The new panel, or `null` if the tab could not be extracted.
   */
  popoutTab(tabId: ViewTabId, opts?: ViewPopoutTabOptions): ViewPanel | null
  /** Updates a tab's close and drag behavior. */
  setTabBehavior(tabId: ViewTabId, behavior: ViewTabBehaviorUpdate): void
  /** Activates a tab within its panel. */
  setActiveTab(tabId: ViewTabId): void
  /** Swaps the positions of two panels. */
  swapPanels(panelA: ViewPanelId, panelB: ViewPanelId): void
  /** Returns a serializable snapshot of the whole workspace for persistence. */
  getLayout<TData = unknown>(): ViewLayoutSnapshot<TData>
  /** Replaces the workspace with the given layout or restored snapshot. */
  setLayout<TData = unknown>(layout: ViewInitialLayout<TData>): void
  /** Returns the current live working state for inspection. */
  getState(): ViewLayoutState
}

/**
 * Live handle to a single panel, returned by `getPanel()` and `getPanels()`. Its
 * methods are shorthands for the matching {@link ViewController} call.
 */
export type ViewPanel = {
  /** Panel identifier. */
  readonly id: ViewPanelId
  /** Whether this panel is tiled, pinned to an edge, or floating. */
  readonly kind: ViewPanelState["kind"]
  /** Current distances from each root edge, in percent. */
  readonly inset: Readonly<ViewInset>
  /** Edge side for a pinned panel; `undefined` unless `kind === 'edge'`. */
  readonly edge: ViewEdge | undefined
  /** Pinned width or height for an edge panel; `undefined` unless `kind === 'edge'`. */
  readonly edgeSize: number | undefined
  /** Edge default size for an edge panel, if set; otherwise `undefined`. */
  readonly edgeDefaultSize: number | undefined
  /** Whether this panel is detached (floating or popped out). */
  readonly floating: boolean
  /** Floating position and size; `undefined` unless detached. */
  readonly floatingBounds: Readonly<ViewFloatingPanelBounds> | undefined
  /** Current floating z-index; `undefined` unless detached. */
  readonly floatingZIndex: number | undefined
  /** Whether this detached panel lives in a native window. */
  readonly poppedOut: boolean
  /** Native window bounds; `undefined` unless popped out. */
  readonly popoutWindowBounds: Readonly<ViewPopoutWindowBounds> | undefined
  /** Tabs in this panel, in display order. */
  readonly tabs: readonly ViewTab[]
  /** The active tab, or `null` when the panel is empty. */
  readonly activeTab: ViewTab | null
  /** Whether this panel is currently fullscreen. */
  readonly fullScreen: boolean
  /** Minimum size constraint, if set. */
  readonly minSize: ViewSize | undefined
  /** Maximum size constraint, if set. */
  readonly maxSize: ViewSize | undefined
  /** Shorthand for controller.appendTab(this.id, tab, opts). */
  appendTab(tab: ViewTabInit, opts?: { activate?: boolean }): ViewTab
  /** Shorthand for controller.insertTab(this.id, tab, index, opts). */
  insertTab(tab: ViewTabInit, index: number, opts?: { activate?: boolean }): ViewTab
  /** Shorthand for controller.movePanel(this.id, target). */
  moveTo(target: ViewPanelMoveTarget): void
  /** Shorthand for controller.splitPanel(this.id, direction, opts). */
  split(
    direction: ViewDirection,
    opts?: {
      size?: number
      minSize?: ViewSize
      maxSize?: ViewSize
      tabs?: ViewTabInit[]
      activate?: boolean
    } & ViewLayoutBehaviorConfig,
  ): ViewPanel
  /** Shorthand for controller.removePanel(this.id). */
  remove(): void
  /** Shorthand for controller.maximizePanel(this.id). */
  maximize(): void
  /** Shorthand for controller.restorePanel(this.id). */
  restore(): void
  /** Shorthand for controller.floatPanel(this.id, opts). */
  float(opts?: ViewFloatPanelOptions): void
  /** Shorthand for controller.popoutPanel(this.id, opts). */
  popout(opts?: ViewPopoutPanelOptions): void
  /** Shorthand for controller.returnPanelToFloating(this.id, bounds). */
  returnToFloating(bounds?: ViewFloatingPanelBoundsInit): void
  /** Shorthand for controller.dockPanel(this.id, target). */
  dock(target?: ViewDockPanelTarget): void
  /** Shorthand for controller.focusPanel(this.id). */
  focus(): void
  /** Shorthand for controller.setFloatingPanelBounds(this.id, bounds). */
  setFloatingBounds(bounds: ViewFloatingPanelBoundsInit): void
  /** Shorthand for controller.setPopoutWindowBounds(this.id, bounds). */
  setPopoutWindowBounds(bounds: ViewPopoutWindowBounds): void
  /** Shorthand for controller.setActiveTab(id) scoped to this panel. */
  setActiveTab(id: ViewTabId): void
}

/**
 * Live handle to a single tab, returned by `getTab()`, `getTabs()`, and panel tab
 * properties. Its methods are shorthands for the matching {@link ViewController} call.
 */
export type ViewTab<TData = unknown> = {
  /** Tab identifier. */
  readonly id: ViewTabId
  /** The panel that currently owns this tab. */
  readonly panel: ViewPanel
  /** Position of this tab within its panel's tab row. */
  readonly index: number
  /** Application-supplied payload for the tab. */
  readonly data: TData
  /** Whether close actions are allowed on this tab. */
  readonly closable: boolean
  /** Whether this tab may be dragged or moved. */
  readonly draggable: boolean
  /** Replaces this tab's data payload. */
  setData(data: TData): void
  /** Shorthand for controller.setTabBehavior(this.id, behavior). */
  setBehavior(behavior: ViewTabBehaviorUpdate): void
  /** Shorthand for controller.moveTab(this.id, target). */
  moveTo(target: ViewMoveTarget): void
  /** Shorthand for controller.floatTab(this.id, opts). */
  float(opts?: ViewFloatTabOptions): ViewPanel | null
  /** Shorthand for controller.popoutTab(this.id, opts). */
  popout(opts?: ViewPopoutTabOptions): ViewPanel | null
  /** Shorthand for controller.setActiveTab(this.id). */
  activate(): void
  /** Shorthand for controller.removeTab(this.id). */
  remove(): void
}
