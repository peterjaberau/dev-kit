export const isEmpty = (v: unknown): boolean => {
  if (v == null) return true            // null, undefined
  if (typeof v === 'string') return v.length === 0
  if (Array.isArray(v)) return v.length === 0
  if (Object.prototype.toString.call(v) === '[object Object]')
    return Object.keys(v).length === 0
  return false
}
