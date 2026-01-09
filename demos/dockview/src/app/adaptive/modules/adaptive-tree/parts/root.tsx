import { chakra, mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { createSplitProps, splitRenderStrategyProps, RenderStrategyPropsProvider } from "#adaptive/shared"
import { TreeProvider } from "../providers"
import { useTree } from "../hooks"

const Treempl = (props: any, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeProps] = splitRenderStrategyProps(props)
  const [useTreeProps, localProps]: any = createSplitProps()(treeProps, [
    "canRename",
    "checkedValue",
    "collection",
    "defaultCheckedValue",
    "defaultExpandedValue",
    "defaultFocusedValue",
    "defaultSelectedValue",
    "expandedValue",
    "expandOnClick",
    "focusedValue",
    "id",
    "ids",
    "loadChildren",
    "onBeforeRename",
    "onCheckedChange",
    "onExpandedChange",
    "onFocusChange",
    "onLoadChildrenComplete",
    "onLoadChildrenError",
    "onRenameComplete",
    "onRenameStart",
    "onSelectionChange",
    "scrollToIndexFn",
    "selectedValue",
    "selectionMode",
    "typeahead",
  ] as any)

  const tree = useTree(useTreeProps)
  const mergedProps = mergeProps(tree.getRootProps(), localProps)

  return (
    <TreeProvider value={tree}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <chakra.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeProvider>
  )
}

export const Root = forwardRef(Treempl)
