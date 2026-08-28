/**
 * Normalize and cascade resize/drag/drop behavior.
 * Converts user-facing config (including the `locked` shorthand) to resolved
 * booleans and propagates inherited behavior down the layout tree.
 */
import type {
  ViewLayoutBehavior,
  ViewLayoutBehaviorConfig,
  ViewLayoutState,
  ViewLayoutTree,
  ViewPanelId,
} from "../types"

/** The default behavior applied to every panel when no overrides are provided. */
export const VIEW_DEFAULT_LAYOUT_BEHAVIOR: ViewLayoutBehavior = {
  resizable: true,
  draggable: true,
  droppable: true,
}

/**
 * Canonical expansion of `locked: true` — all three interaction flags are
 * disabled. Returns a fresh object each time so callers may mutate it freely.
 */
export function viewLockedLayoutBehavior(): ViewLayoutBehavior {
  return { resizable: false, draggable: false, droppable: false }
}

/**
 * Resolve a behavior config object to explicit booleans, expanding the
 * `locked` shorthand and filling any missing flags with `true` (enabled).
 */
export function viewNormalizeLayoutBehavior(config: ViewLayoutBehaviorConfig | undefined): ViewLayoutBehavior {
  if (config?.locked === true) {
    return viewLockedLayoutBehavior()
  }
  return {
    resizable: config?.resizable ?? true,
    draggable: config?.draggable ?? true,
    droppable: config?.droppable ?? true,
  }
}

/**
 * Extract the behavior flags stored on a layout tree node, defaulting any
 * undefined flag to `true`.
 */
export function viewBehaviorFromNode(
  node: Pick<ViewLayoutTree, "resizable" | "draggable" | "droppable">,
): ViewLayoutBehavior {
  return {
    resizable: node.resizable ?? true,
    draggable: node.draggable ?? true,
    droppable: node.droppable ?? true,
  }
}

/**
 * Combine parent and child behavior by ANDing each flag, so a disabled flag
 * anywhere in the ancestor chain disables the behavior for all descendants.
 */
export function viewMergeLayoutBehavior(parent: ViewLayoutBehavior, child: ViewLayoutBehavior): ViewLayoutBehavior {
  return {
    resizable: parent.resizable && child.resizable,
    draggable: parent.draggable && child.draggable,
    droppable: parent.droppable && child.droppable,
  }
}

/**
 * Resolve the effective behavior for a panel by walking the layout tree and
 * merging inherited flags. Returns the default (all enabled) when the panel
 * is not found or the state has no layout tree.
 */
export function viewPanelBehaviorFromState(state: ViewLayoutState, panelId: ViewPanelId): ViewLayoutBehavior {
  const panel = state.panels[panelId]
  if (panel?.kind === "floating" || panel?.kind === "edge") {
    return panel.behavior
  }
  if (!state.layout) return VIEW_DEFAULT_LAYOUT_BEHAVIOR
  return findPanelBehavior(state.layout, panelId, VIEW_DEFAULT_LAYOUT_BEHAVIOR) ?? VIEW_DEFAULT_LAYOUT_BEHAVIOR
}

/**
 * Return `true` when a tab is allowed to move from `sourcePanelId` to
 * `targetPanelId` — the source must be draggable and the target droppable.
 * Intra-panel reordering also requires both flags on the same panel.
 */
export function viewCanMoveTabBetweenPanels(
  state: ViewLayoutState,
  sourcePanelId: ViewPanelId,
  targetPanelId: ViewPanelId,
): boolean {
  const source = viewPanelBehaviorFromState(state, sourcePanelId)
  const target = viewPanelBehaviorFromState(state, targetPanelId)
  if (sourcePanelId === targetPanelId) {
    return source.draggable && source.droppable
  }
  return source.draggable && target.droppable
}

/**
 * Return `true` when both panels have draggable and droppable enabled, which
 * is required before a panel swap can be committed.
 */
export function viewCanSwapPanels(state: ViewLayoutState, panelA: ViewPanelId, panelB: ViewPanelId): boolean {
  const a = viewPanelBehaviorFromState(state, panelA)
  const b = viewPanelBehaviorFromState(state, panelB)
  return a.draggable && a.droppable && b.draggable && b.droppable
}

function findPanelBehavior(
  node: ViewLayoutTree,
  panelId: ViewPanelId,
  inherited: ViewLayoutBehavior,
): ViewLayoutBehavior | null {
  const behavior = viewMergeLayoutBehavior(inherited, viewBehaviorFromNode(node))
  if (node.kind === "panel") {
    return node.panelId === panelId ? behavior : null
  }
  for (const child of node.children) {
    const found = findPanelBehavior(child, panelId, behavior)
    if (found) return found
  }
  return null
}
