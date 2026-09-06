import type { CSSProperties } from 'react';

export const MONO =
    '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const UI =
    '"Inter", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const tnum: CSSProperties = {
    fontFamily: MONO,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.01em',
};
