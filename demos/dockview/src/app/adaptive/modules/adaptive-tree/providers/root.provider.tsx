import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps, RenderStrategyPropsProvider, splitRenderStrategyProps } from "#adaptive/shared"
import { chakra } from '@chakra-ui/react'
import { TreeProvider } from "../providers"

const TreeImpl = (props: any, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeProps] = splitRenderStrategyProps(props)
  //@ts-ignore
  const [{ value: tree }, localProps]: any = createSplitProps()(treeProps, ["value" as any])
  const mergedProps = mergeProps(tree.getRootProps(), localProps)

  return (
    <TreeProvider value={tree}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <chakra.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeProvider>
  )
}

export const RootProvider = forwardRef(TreeImpl)

