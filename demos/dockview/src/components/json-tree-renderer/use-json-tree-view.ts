import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../pro/components/tree-view-pro/base'
import { getBranchValues } from './get-branch-value'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<any>, 'collection'> {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = (props: UseJsonTreeViewProps | any) => {
  const { data, defaultExpandedDepth = 1, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  const defaultExpandedValue = useMemo(() => {
    return defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined
  }, [collection, defaultExpandedDepth])

  return useTreeView({
    defaultExpandedValue,
    ...restProps,
    collection,
    typeahead: false,
  })
}
