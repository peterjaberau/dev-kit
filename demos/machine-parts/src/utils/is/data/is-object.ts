export function isObject(node: any): boolean {
  return Object.prototype.toString.call(node) === '[object Object]'
}
