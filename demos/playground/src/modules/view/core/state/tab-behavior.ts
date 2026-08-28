/**
 * Tab behavior normalization — resolves config and updates to concrete
 * closable/draggable flags.
 */
import type { ViewTabBehavior, ViewTabBehaviorConfig, ViewTabBehaviorUpdate } from "../types"

/** Default tab behavior applied when no config is provided: both closable and draggable. */
export const VIEW_DEFAULT_TAB_BEHAVIOR: ViewTabBehavior = {
  closable: true,
  draggable: true,
}

/**
 * Converts a `ViewTabBehaviorConfig` into a fully-resolved
 * `ViewTabBehavior`, falling back to `VIEW_DEFAULT_TAB_BEHAVIOR` for
 * unspecified fields. When `config.locked` is `true`, both flags are `false`.
 */
export function viewNormalizeTabBehavior(config: ViewTabBehaviorConfig | undefined): ViewTabBehavior {
  if (config?.locked === true) {
    return { closable: false, draggable: false }
  }
  return {
    closable: config?.closable ?? VIEW_DEFAULT_TAB_BEHAVIOR.closable,
    draggable: config?.draggable ?? VIEW_DEFAULT_TAB_BEHAVIOR.draggable,
  }
}

/**
 * Merges a partial `ViewTabBehaviorUpdate` onto the `current` behavior,
 * overriding only the fields that are explicitly set. When `update.locked`
 * is `true`, both flags are set to `false` regardless of `current`.
 */
export function viewApplyTabBehaviorUpdate(current: ViewTabBehavior, update: ViewTabBehaviorUpdate): ViewTabBehavior {
  if (update.locked === true) {
    return { closable: false, draggable: false }
  }
  return {
    closable: update.closable ?? current.closable,
    draggable: update.draggable ?? current.draggable,
  }
}
