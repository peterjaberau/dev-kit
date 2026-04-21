export const isEmptyString = (v: unknown): boolean =>
  typeof v === 'string' && v.length === 0
