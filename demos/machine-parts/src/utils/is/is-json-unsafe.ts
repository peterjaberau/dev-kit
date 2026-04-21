import { isUndefined, isSymbol, isBigInt, isFunction, isNaNValue, isInfinity } from '.'

export const isJsonUnsafe = (v: unknown): boolean =>
  isUndefined(v) ||
  isSymbol(v) ||
  isBigInt(v) ||
  isFunction(v) ||
  isNaNValue(v) ||
  isInfinity(v)
