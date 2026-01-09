import { TreeCollection, filePathToTree } from "@zag-js/collection"

export const collection = (options: any) => {
  return new TreeCollection(options)
}

collection.empty = () => {
  return new TreeCollection({ rootNode: { children: [] } })
}

export function filePathCollection(paths: string[]) {
  return filePathToTree(paths)
}
