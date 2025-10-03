export function nearestPowerOf2(n: number): number {
  if (n <= 0) return 1
  return 1 << (31 - Math.clz32(n))
}
