export const isNullishOrNan = (v: unknown): boolean =>
  v == null || (typeof v === 'number' && Number.isNaN(v))
