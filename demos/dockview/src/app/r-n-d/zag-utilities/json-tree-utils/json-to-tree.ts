import { dataTypes, PrimitiveType } from "./data-type"
import { getPreviewOptions, ROOT_KEY } from "./node-conversion"


const MAX_DEPTH = 20

export const jsonToTree = (data: unknown, props: any = {}): any => {
  const { visited = new WeakSet(), keyPath = [ROOT_KEY], depth = 0 } = props
  const options = getPreviewOptions(props.options)

  // Prevent infinite recursion by limiting depth
  if (depth > MAX_DEPTH) {
    return {
      value: "[Max Depth Reached]",
      type: "string",
      keyPath,
    }
  }

  if (data && typeof data === "object") {
    if (visited.has(data)) {
      return {
        value: "[Circular Reference]",
        type: "circular",
        keyPath,
      }
    }
    visited.add(data)
  }

  const dataType = dataTypes.find((dataType) => dataType.check(data)) || PrimitiveType
  return dataType.node({
    value: data,
    createNode: (nestedKeyPath: any, value: any) =>
      jsonToTree(value, {
        visited,
        keyPath: [...keyPath, ...nestedKeyPath],
        options,
        depth: depth + 1,
      }),
    keyPath,
    options,
  })
}
