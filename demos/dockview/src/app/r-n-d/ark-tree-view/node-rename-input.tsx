import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useTreeViewContext } from "./context"
import { useTreeViewNodePropsContext } from "./context"
import { chakra } from '@chakra-ui/react'

export const NodeRenameInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeRenameInputProps(nodeProps), props)

  return <chakra.input {...mergedProps} ref={ref} />
})

NodeRenameInput.displayName = 'TreeViewNodeRenameInput'
