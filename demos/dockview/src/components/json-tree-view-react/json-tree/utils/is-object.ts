export function isObject(node: any): node is Record<string, any> {
  return Object.prototype.toString.call(node) === '[object Object]'
}
