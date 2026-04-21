import { isBranch } from '.'

export const isLeaf = (v: unknown): boolean =>
  !isBranch(v)
