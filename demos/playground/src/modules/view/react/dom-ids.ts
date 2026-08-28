/**
 * DOM id helpers for View panel elements.
 *
 * Provides a stable, URI-safe mapping between panel IDs and their
 * corresponding HTML element IDs.
 */

/**
 * Returns the `id` attribute value for the root DOM element of the given
 * panel, used to locate the element without traversing the React tree.
 */
export function viewPanelDomId(panelId: string): string {
  return `view-panel-${encodeURIComponent(panelId)}`;
}

/**
 * Returns the `id` for a tab's trigger element. The tab's content panel
 * references it via `aria-labelledby` to name the panel after its tab.
 */
export function viewTabDomId(tabId: string): string {
  return `view-tab-${encodeURIComponent(tabId)}`;
}

/**
 * Returns the `id` for a tab's content panel (`role="tabpanel"`), referenced by
 * the owning tab's `aria-controls`.
 */
export function viewTabPanelDomId(tabId: string): string {
  return `view-tabpanel-${encodeURIComponent(tabId)}`;
}
