export const isNaNValue = (v: unknown): boolean =>
  typeof v === 'number' && Number.isNaN(v)
