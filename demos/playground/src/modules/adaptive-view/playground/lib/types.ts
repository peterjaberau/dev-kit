
export type RegionPlacement = "top" | "left"
// Field optionality mirrors the generated bindings.ts exactly (serde default
// = optional), so swapping this hand-mirror for bindings.ts stays a no-op.
export interface GlobalSettings {
  currently_open?: string[]
  active_open_dock: string | null
  active_theme: string | null
  global_region_placement: RegionPlacement
  global_region_size_top: number | null
  global_region_size_left: number | null
  global_dock_collapsed: boolean
  column_preferences?: unknown
  watcher_enabled?: boolean
  /** Panel IDs the user opted out of auto-opening: a summon to one degrades to
   * notifyIfOpen (updates only if already open, never pops open). */
  suppressed_auto_open_panels?: string[]
}


export type ThemeSource = "builtin" | "user"

export interface ThemeEntry {
  name: string
  source: ThemeSource
  path: string
}

export interface LayoutEntry {
  name: string
  path: string
}

/** A saved panel layout (`.legit-layout.json`): a named snapshot of both
 *  docks. `global` is the global dock's plain dockview JSON; `repo` is the
 *  repo dock's envelope ({ dockview, placements, fallbacks }). Either may be
 *  null when that dock had nothing to capture, never both. */
export interface LayoutDocument {
  name: string
  global: unknown
  dock: unknown
}

export type AppError =
  | { kind: "UnknownRepo"; details: string }
  | { kind: "NotARepo"; details: string }
  | { kind: "Io"; details: string }
  | { kind: "Git"; details: unknown }
  | { kind: "GitUnavailable"; details: string }
  | { kind: "ForbiddenArg"; details: string }
  | { kind: "InvalidTheme"; details: string }
  | { kind: "InvalidLayout"; details: string }
  | { kind: "Settings"; details: string }
  | { kind: "ParseArgs"; details: string }
  | { kind: "InvalidLockIndex"; details: number }
  | { kind: "UnknownProfile"; details: string }


/** Construct a short message suitable for display, regardless of variant. */
export function formatAppError(e: unknown): string {
  if (e && typeof e === "object" && "kind" in e) {
    const ae = e as AppError
    // Unwrap a nested GitError ({ kind, details? }): show git's own message
    // instead of the serialized JSON envelope.
    if (ae.kind === "Git" && ae.details && typeof ae.details === "object") {
      const g = ae.details as { kind?: string; details?: unknown }
      const inner = g.details
      // LFS failures get the friendly cause everywhere - the raw stderr is
      // 404/transfer noise that names neither cause nor fix.
      if (typeof inner === "string") return inner
      if (inner && typeof inner === "object") {
        const stderr = (inner as Record<string, unknown>).stderr
        if (typeof stderr === "string") return stderr
        return `${g.kind ?? "Git error"}: ${JSON.stringify(inner)}`
      }
      return " error"
    }
    const details = typeof ae.details === "string" ? ae.details : JSON.stringify(ae.details)
    return `${ae.kind}: ${details}`
  }
  if (e instanceof Error) return e.message
  return String(e)
}


// --- Line endings types (matches §H of DESIGN-v0.2.md) ---

export type ConfigScope = "local" | "global" | "system" | "unset"

export interface ConfigValue {
  value: string | null
  source: ConfigScope
}



// --- Signing config types (matches src-tauri/src/commands/signing.rs) ---

/** A single git-config key resolved across all scopes. */
export interface ScopedConfig {
  local: ConfigValue
  global: ConfigValue
  system: ConfigValue
  resolved: ConfigValue
}



export type ImageFormat = "png" | "jpeg" | "gif" | "webp" | "bmp" | "ico" | "svg"

/** Preview of a file's content at a rev (mirror of legit-app's FilePreview):
 * an image payload, or why there is none. `absent` covers unresolvable
 * specs (deleted side, root commit's `^`) so the UI renders added/removed. */
export type FilePreview =
  | { kind: "image"; format: ImageFormat; size: number; base64: string }
  | { kind: "too_large"; size: number }
  | { kind: "not_previewable"; size: number }
  | { kind: "absent" }
  | { kind: "lfs_missing"; oid: string; size: number }



// --- Theme document shape (matches DESIGN.md §6.3) ---

/** Derived-colour filter applied to a token's palette reference. */
export type TokenFilterId =
  | "lighter-soft"
  | "lighter"
  | "lighter-strong"
  | "darker-soft"
  | "darker"
  | "darker-strong"
  | "faded"
  | "subtle"

/**
 * A token's binding: either a bare palette name (no filter — the classic
 * form, kept for backward compatibility) or a palette reference plus a
 * filter deriving a variant colour (e.g. the hover shade of a button).
 */
export type ThemeTokenBinding = string | { ref: string; filter: TokenFilterId }

export interface ThemeDocument {
  $schema?: string
  format: "legit-theme"
  formatVersion: number
  name: string
  author?: string
  description?: string
  palette: Record<string, string>
  tokens: Record<string, ThemeTokenBinding>
  /** Colour branch chips from their graph lane instead of the static
   * ref.branch/ref.remote tokens. Optional and additive: absent = off, and
   * both validators ignore unknown keys, so older files stay valid. */
  laneColoredBranchChips?: boolean
  /** Per-part filters applied to the LANE colour while
   * `laneColoredBranchChips` is on; a null/absent part uses the raw lane
   * colour. Defaults (fg raw, border Faded, bg Subtle) mirror the static
   * chips' alpha recipe in the lane's hue. */
  laneChipFilters?: {
    fg?: TokenFilterId | null
    border?: TokenFilterId | null
    bg?: TokenFilterId | null
  }
  /** Colour a stash node with the lane of its BASE commit instead of the
   * lane the stash row itself occupies, so it reads as belonging to the
   * branch it was taken from. Optional and additive; absent = off. */
  stashBaseLaneColor?: boolean
}
