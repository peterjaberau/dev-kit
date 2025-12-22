export function isArray(node: any): node is Record<string, any> {
  return Array.isArray(node)
}
