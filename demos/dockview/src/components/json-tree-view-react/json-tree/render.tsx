'use client'
import {
  JsonTreeRoot,
  JsonTreeNode,
} from './components'
import { useAppRoot, useNode } from "#json-tree-view-react/json-tree/selectors"

export const Render = (props: any) => {
  const {
    nodeRef,
  }: any = useNode()

  return (
    <JsonTreeRoot>
      <JsonTreeNode nodeRef={nodeRef} />
    </JsonTreeRoot>
  )
}
