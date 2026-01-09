import { jsonToTree } from "./json-to-tree"
import { defu, hash } from "./shared"

export const ROOT_KEY = "$"
export const PATH_SEP = "."

////////////////////////////////////////////////////////////////////////////////////////////////////////

export function isRootKeyPath(keyPath: Array<string | number>): boolean {
  return keyPath.length === 1 && keyPath[0] === ROOT_KEY
}

export function keyPathToId(keyPath: Array<string | number>): string {
  return keyPath.join(PATH_SEP)
}

export function keyPathToKey(keyPath: Array<string | number>, opts?: { excludeRoot?: boolean }): string {
  if (keyPath.length === 0) return ""
  if (opts?.excludeRoot && isRootKeyPath(keyPath)) return ""
  return String(keyPath[keyPath.length - 1])
}

export function nodeToValue(node: any) {
  return hash(keyPathToId(node.keyPath))
}

export function jsonPathToValue(path: string) {
  return hash(path)
}

export function nodeToString(node: any) {
  return keyPathToKey(node.keyPath) || "root"
}

export function getRootNode(data: unknown, opts?: any): any {
  return {
    value: "",
    type: "object",
    keyPath: [],
    children: [
      jsonToTree(data, {
        visited: new WeakSet(),
        keyPath: [ROOT_KEY],
        options: getPreviewOptions(opts),
      }),
    ],
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const DEFAULT_PREVIEW_OPTIONS: any = {
  maxPreviewItems: 3,
  collapseStringsAfterLength: 30,
  groupArraysAfterLength: 100,
  showNonenumerable: true,
}

export const getPreviewOptions = (opts?: any | undefined): any => {
  if (!opts) return DEFAULT_PREVIEW_OPTIONS
  return defu(DEFAULT_PREVIEW_OPTIONS, opts)
}
