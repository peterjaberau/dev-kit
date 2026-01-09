import { createProps } from "../shared"
import { createSplitProps } from "@zag-js/utils"

export const props: any = createProps()([
  "ids",
  "collection",
  "dir",
  "expandedValue",
  "expandOnClick",
  "defaultFocusedValue",
  "focusedValue",
  "getRootNode",
  "id",
  "onExpandedChange",
  "onFocusChange",
  "onSelectionChange",
  "checkedValue",
  "selectedValue",
  "selectionMode",
  "typeahead",
  "defaultExpandedValue",
  "defaultSelectedValue",
  "defaultCheckedValue",
  "onCheckedChange",
  "onLoadChildrenComplete",
  "onLoadChildrenError",
  "loadChildren",
  "canRename",
  "onRenameStart",
  "onBeforeRename",
  "onRenameComplete",
  "scrollToIndexFn",
])

export const splitProps = createSplitProps(props)

export const itemProps: any = createProps()(["node", "indexPath"])

export const splitItemProps = createSplitProps(itemProps)
