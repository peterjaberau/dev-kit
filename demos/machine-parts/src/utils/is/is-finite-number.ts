export const isFiniteNumber = (v: unknown): boolean =>
  typeof v === 'number' && Number.isFinite(v)
