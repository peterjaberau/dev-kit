export function nearestPowerOf2(n: number) {
  return 1 << (31 - Math.clz32(n));
}
