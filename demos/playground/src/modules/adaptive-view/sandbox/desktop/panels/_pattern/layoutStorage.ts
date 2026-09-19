import type { SystemLayoutData } from './systemLayout';
import { parseSystemLayout } from './systemLayout';
export const VIEW_LAYOUT_STORAGE_KEY = "view.layout"

/**
 * localStorage persistence for the current user's layout. The wire format
 * is System-compatible `LayoutData`, so sessions can be migrated freely
 * between this product and System Studio.
 *
 * Legacy (pre-System) V1 payloads (`{ schemaVersion: 1, dockview, panels }`)
 * are hard-dropped on read: the key is removed and `null` returned so the
 * user starts from a clean default. This is intentional per the refactor
 * plan (Q5 `hard_cut`).
 */

function isLegacyV1Payload(value: unknown): boolean {
  if (typeof value !== "object" || value == null) return false;
  const typed = value as Record<string, unknown>;
  return typed.schemaVersion === 1 && 'dockview' in typed;
}

/** Load the saved System layout, or `null` when absent/corrupt/legacy. */
export function readSavedDockviewLayout(storageKey: string = VIEW_LAYOUT_STORAGE_KEY): SystemLayoutData | null {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return null
  }
  try {
    const raw = globalThis.localStorage.getItem(storageKey)
    if (raw == null || raw === "") {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    if (isLegacyV1Payload(parsed)) {
      globalThis.localStorage.removeItem(storageKey)
      return null
    }
    return parseSystemLayout(parsed)
  } catch {
    return null
  }
}

/** Persist a System-compatible layout payload. */
export function saveDockviewLayoutToStorage(payload: SystemLayoutData, storageKey: string = VIEW_LAYOUT_STORAGE_KEY): void {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return
  }
  try {
    globalThis.localStorage.setItem(storageKey, JSON.stringify(payload))
  } catch (e) {
    console.warn("[layoutStorage] Failed to save layout", e)
  }
}

/** Clear the persisted layout so the next mount falls back to auto-layout. */
export function clearSavedDockviewLayout(storageKey: string = VIEW_LAYOUT_STORAGE_KEY): void {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return
  }
  try {
    globalThis.localStorage.removeItem(storageKey)
  } catch (e) {
    console.warn("[layoutStorage] Failed to clear layout", e)
  }
}
