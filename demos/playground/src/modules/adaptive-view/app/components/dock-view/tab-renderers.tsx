import {
  DEFAULT_TAB_GROUP_COLORS,
  DockviewDefaultTab, GetTabContextMenuItemsParams, IContextMenuItemComponentProps, IDockviewPanelHeaderProps } from "#adaptive-view/react"
import * as React from "react"


export const TabRenderer: React.FC<IDockviewPanelHeaderProps> = (props) => {
  return <DockviewDefaultTab {...props} />
}

export const tabComponents = {
  default: TabRenderer,
}

