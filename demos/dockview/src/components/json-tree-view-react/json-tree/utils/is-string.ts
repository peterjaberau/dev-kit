export function isString(node: any): node is Record<string, any> {
  return typeof node === "string"
}
