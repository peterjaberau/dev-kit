export function isBigint(node: any): node is Record<string, any> {
  return typeof node === "bigint"
}
