import { chakra, mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { createSplitProps, splitRenderStrategyProps, RenderStrategyPropsProvider } from "#adaptive/shared"
import { TreeProvider } from "./namespace"
import { useTree } from "../../hooks"

const TreeImpl = (props: any, ref: React.Ref<HTMLDivElement | any>) => {
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

export const Root = forwardRef(TreeImpl)
