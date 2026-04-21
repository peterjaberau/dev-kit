export const isNumber = (v: unknown): boolean =>
  typeof v === 'number' && !Number.isNaN(v)
