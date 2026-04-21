import { isObject } from './is-object'

export function isObjectLeaf(node: any): boolean {

  console.log('isObjectLeaf', {
    node: node,
    keysLength: Object.keys(node).length
  });

  return isObject(node) && Object.keys(node).length === 1
}
