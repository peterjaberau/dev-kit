/**
 * Resolve ViewSize values (number / '%' / 'px') to percentages, plus the
 * shared numeric primitives (epsilon comparison, min/max resolution) used
 * across the geometry modules.
 */
import type { ViewSize, ViewSizeResolutionContext } from "../types"

type Axis = "horizontal" | "vertical"

const SIZE_RE = /^(-?(?:\d+|\d*\.\d+))\s*(%|px)$/

/**
 * Shared tolerance for percentage-geometry float comparisons (0–100 scale).
 * Defined once here so every module that builds, derives, or clamps layout
 * coordinates agrees on the same epsilon.
 */
export const VIEW_EPSILON = 0.0001

/** Returns `true` when `a` and `b` are equal within {@link VIEW_EPSILON}. */
export function viewApproxEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < VIEW_EPSILON
}

/**
 * Converts a `ViewSize` value to a percentage of the containing axis.
 * Accepts three forms: a bare `number` (treated as a percentage directly),
 * a `'%'`-suffixed string (e.g. `'25%'`), or a `'px'`-suffixed string
 * (e.g. `'120px'`, resolved via `axisPixels`). Returns `null` when `size`
 * is undefined, non-finite, unparseable, or a pixel string and `axisPixels`
 * is absent or non-positive.
 */
export function viewResolveSizePercent(size: ViewSize | undefined, axisPixels: number | undefined): number | null {
  if (typeof size === "number") {
    return Number.isFinite(size) ? Math.max(0, size) : null
  }
  if (typeof size !== "string") return null
  const match = SIZE_RE.exec(size.trim())
  if (!match) return null
  const value = Number(match[1])
  /* v8 ignore next -- retained for malformed runtime values beyond the public size syntax. */
  if (!Number.isFinite(value)) return null
  if (match[2] === "%") return Math.max(0, value)
  if (!axisPixels || axisPixels <= 0) return null
  return Math.max(0, (value / axisPixels) * 100)
}

/**
 * Computes the pixel length of a span along `axis` given a size-resolution
 * context and an optional `spanPercent` (defaults to 100 %). Returns
 * `undefined` when the context is absent or the root pixel dimension is
 * non-positive.
 */
export function viewAxisPixels(
  context: ViewSizeResolutionContext | undefined,
  axis: Axis,
  spanPercent = 100,
): number | undefined {
  const rootPixels = axis === "horizontal" ? context?.width : context?.height
  if (!rootPixels || rootPixels <= 0) return undefined
  return (rootPixels * Math.max(0, spanPercent)) / 100
}

/**
 * Resolve a panel's effective minimum size to a percentage. Tries the panel's
 * own `minSize`, then the resolved `fallback`, then `fallbackMin` when neither
 * resolves (e.g. a `px` size supplied without an axis-pixel context).
 */
export function viewResolveMinSizePercent(
  minSize: ViewSize | undefined,
  fallback: ViewSize,
  axisPixels: number | undefined,
  fallbackMin = 0,
): number {
  const fallbackSize = viewResolveSizePercent(fallback, axisPixels) ?? fallbackMin
  return viewResolveSizePercent(minSize, axisPixels) ?? fallbackSize
}

/**
 * Resolve a panel's effective maximum size to a percentage, falling back to
 * `fallbackMax` (`Infinity` for tiled panels, `100` for edge panels) when no
 * `maxSize` is configured or it cannot be resolved.
 */
export function viewResolveMaxSizePercent(
  maxSize: ViewSize | undefined,
  axisPixels: number | undefined,
  fallbackMax = Infinity,
): number {
  return viewResolveSizePercent(maxSize, axisPixels) ?? fallbackMax
}
