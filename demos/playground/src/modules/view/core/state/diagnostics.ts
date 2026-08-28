/**
 * Dev-time constraint warnings for panel min/max sizes and divider conflicts.
 */
import type {
  ViewDivider,
  ViewLayoutState,
  ViewPanelId,
  ViewPanelState,
  ViewSize,
  ViewSizeResolutionContext,
} from "../types"
import { VIEW_DEFAULT_MIN_SIZE, viewDeriveDividers, viewGetDividerConstraintRange } from "./layout-math"
import { viewAxisPixels, viewResolveSizePercent, VIEW_EPSILON as EPSILON } from "./size"

const SIZE_RE = /^(-?(?:\d+|\d*\.\d+))\s*(%|px)$/
const warnedKeys = new Set<string>()

type Axis = "horizontal" | "vertical"

type ParsedSize = {
  unit: "%" | "px"
  value: number
}

/** A single constraint warning with a stable deduplication key and a human-readable message. */
export type ViewConstraintWarning = {
  key: string
  message: string
}

/** Options that control which constraint checks are performed and how sizes are resolved. */
export type ViewConstraintDiagnosticsOptions = {
  minSize?: ViewSize
  sizeContext?: ViewSizeResolutionContext
  warnUnresolvedPixels?: boolean
}

/**
 * Inspects every panel and divider in `state` for constraint violations
 * (minSize > maxSize, overconstrained dividers, unresolved pixel sizes) and
 * returns all findings as an array of `ViewConstraintWarning` objects.
 */
export function viewCollectConstraintWarnings(
  state: ViewLayoutState,
  options: ViewConstraintDiagnosticsOptions = {},
): ViewConstraintWarning[] {
  const warnings = new Map<string, string>()
  const minSize = options.minSize ?? VIEW_DEFAULT_MIN_SIZE
  const dividers = viewDeriveDividers(state)

  for (const panel of Object.values(state.panels)) {
    collectPanelMinMaxWarnings(panel, options.sizeContext, warnings)
  }

  for (const divider of dividers) {
    if (divider.disabled) continue
    if (options.warnUnresolvedPixels) {
      collectUnresolvedPixelWarnings(state, divider, options.sizeContext, warnings)
    }
    const range = viewGetDividerConstraintRange(state, divider, minSize, options.sizeContext)
    if (range && range.min > range.max + EPSILON) {
      addWarning(
        warnings,
        `divider:${divider.id}:overconstrained`,
        `Constraints around divider "${divider.id}" cannot all be satisfied; resize is locked at the current position.`,
      )
    }
  }

  return [...warnings.entries()].map(([key, message]) => ({ key, message }))
}

/**
 * Collects constraint warnings for `state` and emits each one as a
 * deduplicated `console.warn` in development builds (no-op in production).
 */
export function viewWarnForConstraintDiagnostics(
  state: ViewLayoutState,
  options: ViewConstraintDiagnosticsOptions = {},
): void {
  for (const warning of viewCollectConstraintWarnings(state, options)) {
    viewWarnOnce(warning.key, warning.message)
  }
}

/**
 * Emits a `[View]`-prefixed `console.warn` for the given `key` at most
 * once per session; subsequent calls with the same key are silently ignored.
 * No-op in production builds.
 */
export function viewWarnOnce(key: string, message: string): void {
  /* v8 ignore next -- production builds intentionally suppress dev warnings. */
  if (!viewDevWarningsEnabled()) return
  if (warnedKeys.has(key)) return
  warnedKeys.add(key)
  console.warn(`[View] ${message}`)
}

/**
 * Clears the set of already-emitted warning keys, allowing each warning to
 * fire again. Intended for use in tests that need a clean warning state.
 */
export function viewResetDevWarnings(): void {
  warnedKeys.clear()
}

function collectPanelMinMaxWarnings(
  panel: ViewPanelState,
  sizeContext: ViewSizeResolutionContext | undefined,
  warnings: Map<string, string>,
) {
  if (panel.minSize === undefined || panel.maxSize === undefined) return

  const fixedComparison = compareSizesWithoutAxis(panel.minSize, panel.maxSize)
  if (fixedComparison !== null) {
    if (fixedComparison > 0) {
      addMinMaxWarning(warnings, panel.id, panel.minSize, panel.maxSize)
    }
    return
  }

  for (const axis of AXES) {
    const axisPixels = viewAxisPixels(sizeContext, axis)
    const min = viewResolveSizePercent(panel.minSize, axisPixels)
    const max = viewResolveSizePercent(panel.maxSize, axisPixels)
    if (min !== null && max !== null && min > max + EPSILON) {
      addMinMaxWarning(warnings, panel.id, panel.minSize, panel.maxSize, axis)
    }
  }
}

function collectUnresolvedPixelWarnings(
  state: ViewLayoutState,
  divider: ViewDivider,
  sizeContext: ViewSizeResolutionContext | undefined,
  warnings: Map<string, string>,
) {
  const axis = divider.orientation === "vertical" ? "horizontal" : "vertical"
  if (viewAxisPixels(sizeContext, axis) !== undefined) return

  for (const panelId of uniquePanelIds(divider)) {
    const panel = state.panels[panelId]
    /* v8 ignore next -- derived dividers only reference known panels. */
    if (!panel) continue
    const fields = pixelConstraintFields(panel)
    if (fields.length === 0) continue
    addWarning(
      warnings,
      `panel:${panelId}:${axis}:unresolved-pixels`,
      `Panel "${panelId}" uses pixel ${formatFields(fields)}, but View has no measured ${axis} size; pixel constraints on that axis are ignored until the container is measurable.`,
    )
  }
}

function addMinMaxWarning(
  warnings: Map<string, string>,
  panelId: ViewPanelId,
  minSize: ViewSize,
  maxSize: ViewSize,
  axis?: Axis,
) {
  addWarning(
    warnings,
    `panel:${panelId}:${axis ?? "any"}:min-max`,
    `Panel "${panelId}" has minSize ${formatSize(minSize)} greater than maxSize ${formatSize(maxSize)}${axis ? ` on the ${axis} axis` : ""}.`,
  )
}

function addWarning(warnings: Map<string, string>, key: string, message: string) {
  warnings.set(key, message)
}

const AXES: Axis[] = ["horizontal", "vertical"]

function compareSizesWithoutAxis(minSize: ViewSize, maxSize: ViewSize): number | null {
  const min = parseSize(minSize)
  const max = parseSize(maxSize)
  if (!min || !max) return null
  if (min.unit !== max.unit) return null
  return min.value - max.value
}

function parseSize(size: ViewSize): ParsedSize | null {
  if (typeof size === "number") {
    return Number.isFinite(size) ? { unit: "%", value: Math.max(0, size) } : null
  }
  const match = SIZE_RE.exec(size.trim())
  if (!match) return null
  const value = Number(match[1])
  /* v8 ignore next -- the regex only matches numeric strings. */
  if (!Number.isFinite(value)) return null
  return { unit: match[2] as "%" | "px", value: Math.max(0, value) }
}

function pixelConstraintFields(panel: ViewPanelState): string[] {
  const fields: string[] = []
  if (parseSize(panel.minSize ?? 0)?.unit === "px") fields.push("minSize")
  if (parseSize(panel.maxSize ?? 0)?.unit === "px") fields.push("maxSize")
  return fields
}

function uniquePanelIds(divider: ViewDivider): ViewPanelId[] {
  return [...new Set([...divider.beforePanels, ...divider.afterPanels])]
}

function formatFields(fields: string[]): string {
  return fields.length === 1 ? fields[0]! : fields.join(" and ")
}

function formatSize(size: ViewSize): string {
  return typeof size === "number" ? String(size) : `"${size}"`
}

function viewDevWarningsEnabled(): boolean {
  /* v8 ignore start -- production flags are build-tool dependent. */
  const metaEnv = (import.meta as { env?: { MODE?: string; PROD?: boolean } }).env
  if (metaEnv?.PROD || metaEnv?.MODE === "production") return false
  const processEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
  if (processEnv?.NODE_ENV === "production") return false
  /* v8 ignore stop */
  return true
}
