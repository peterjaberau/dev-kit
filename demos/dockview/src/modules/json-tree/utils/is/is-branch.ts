import { isArray, isObject } from '.'

export const isBranch = (v: unknown): boolean =>
  isArray(v) || isObject(v)

/*

return true for:
  []        // true
  [1, 2]    // true
  {}        // true
  { a: 1 }  // true


returns false for:
  null
  undefined
  ""
  123
  true
  NaN
  Date
  Map
  Set

 */
