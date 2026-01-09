import { getRootNode, nodeToString, nodeToValue } from "@zag-js/json-tree-utils"
import { useMemo } from "react"
import { createTreeCollection, useAdaptiveTree } from "#adaptive-tree"
import { getBranchValues } from "../utils"

export const useJsonTree: any = (props: any) => {
  const { data, defaultExpandedDepth = 1, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data)
    })
  }, [data])

  const defaultExpandedValue = useMemo(() => {
    return defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined
  }, [collection, defaultExpandedDepth])

  return useJsonTree({
    defaultExpandedValue,
    ...restProps,
    collection,
    typeahead: false,
  })
}
