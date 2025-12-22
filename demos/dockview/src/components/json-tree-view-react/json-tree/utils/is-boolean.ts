export function isBoolean(node: any): node is Record<string, any> {
  return typeof node === "boolean"
}
