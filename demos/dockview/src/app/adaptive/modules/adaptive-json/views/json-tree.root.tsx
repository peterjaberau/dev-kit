"use client"
import { getRootNode, nodeToString, nodeToValue } from "@zag-js/json-tree-utils"
import { forwardRef, useMemo } from "react"
import { createSplitProps } from "#adaptive-shared"
import { AdaptiveTree, createTreeCollection } from "#adaptive-tree"
import { getBranchValues } from "../utils"
import { JsonTreePropsProvider } from "../providers"

const splitJsonTreeProps = createSplitProps()

export const JsonTreeRoot = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [jsonTreeProps, localProps] = splitJsonTreeProps(props, [
    "maxPreviewItems",
    "collapseStringsAfterLength",
    "quotesOnKeys",
    "groupArraysAfterLength",
    "showNonenumerable",
  ] as any)

  const { data, defaultExpandedDepth, ...restProps }: any = localProps

  const collection = useMemo(() => {
    return createTreeCollection({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  const defaultExpandedValue = useMemo(() => {
    return defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined
  }, [collection, defaultExpandedDepth])

  return (
    <JsonTreePropsProvider value={jsonTreeProps}>
      <AdaptiveTree.Root
        data-scope="json-tree-view"
        collection={collection}
        defaultExpandedValue={defaultExpandedValue}
        {...restProps}
        ref={ref}
      />
    </JsonTreePropsProvider>
  )
})
