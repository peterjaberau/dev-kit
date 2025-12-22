export function isNumber(node: any): node is Record<string, any> {
  return typeof node === "number"
}
