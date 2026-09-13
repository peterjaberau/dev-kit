import type { PanelType } from './types';

/** Framework `configById[id]` is an arbitrary JSON object. */
export type FrameworkConfig = Record<string, unknown>;

/** Framework stores panel title under this key inside its config. */
export const FRAMEWORK_PANEL_TITLE_KEY = 'frameworkPanelTitle';

/** Decoded view of a Framework panel config in our runtime shape. */
export interface FrameworkAdapterDecoded<TConfig> {
  /** Parsed typed config ready for the panel's `render`/`renderSettings`. */
  config: TConfig;
  /** Unknown fields retained verbatim so re-export stays lossless. */
  extras: Record<string, unknown>;
  /** Title read from `config.frameworkPanelTitle` (if present). */
  title?: string;
}

/** Input to `toConfig` when serializing back to Framework. */
export interface FrameworkAdapterState<TConfig> {
  config: TConfig;
  extras?: Record<string, unknown>;
  title?: string;
}

export interface PanelFrameworkAdapter<TConfig = unknown> {
  /** Our internal panel type (runtime renderer). */
  internalType: PanelType;
  /** Framework type strings this adapter handles on import (e.g. `['Image', 'Canvas']`). */
  frameworkTypes: readonly string[];
  /**
   * Framework type string to emit when serializing. When the id prefix is
   * also known (e.g. preserved from import) the caller should prefer that
   * over `defaultFrameworkType` so `Canvas!xxx` imports round-trip as Canvas.
   */
  defaultFrameworkType: string;
  fromConfig(config: FrameworkConfig): FrameworkAdapterDecoded<TConfig>;
  toConfig(state: FrameworkAdapterState<TConfig>): FrameworkConfig;
}

/**
 * Utility: collect "extras" as all keys of `config` that are not in
 * `knownKeys` and not the panel-title key. Returned as a shallow copy.
 */
export function collectExtras(
  config: FrameworkConfig,
  knownKeys: readonly string[],
): Record<string, unknown> {
  const known = new Set<string>([...knownKeys, FRAMEWORK_PANEL_TITLE_KEY]);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    if (!known.has(key)) {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Utility: merge extras + known fields into a Framework config, with known
 * fields winning so latest runtime values are authoritative.
 */
export function mergeWithExtras(
  extras: Record<string, unknown> | undefined,
  known: FrameworkConfig,
): FrameworkConfig {
  if (!extras) {
    return { ...known };
  }
  return { ...extras, ...known };
}

/** Type guard for plain objects. */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value != null && !Array.isArray(value);
}
