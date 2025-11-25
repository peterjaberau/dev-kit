'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"
import { map, omit } from "lodash"

export enum DOCK_ENUMS {
  DOCK_API_ID = "dock-api",


}

export enum DOCK_ADAPTOR_CONSTANTS {
  ON_REMOVE_PANEL = "onRemovePanel",

}


export const useDockAdapter = () => {

  const { rootDockAdapterRef: dockAdapterRef } = useRootActors()

  // base
  const dockAdapterState: any = useSelector(dockAdapterRef, (state) => state)
  const dockAdapterContext = dockAdapterState?.context
  const sendToDockAdapter = dockAdapterRef?.send


  // children (obj)
  // keys = dock-api + all panel ids
  const dockChildren = dockAdapterState?.children
  const dockChildrenNames = Object.keys(dockChildren || {})


  // api
  const dockApiRef: any = dockChildrenNames.length > 0 ? dockChildren[DOCK_ENUMS.DOCK_API_ID] : null
  const dockApiState: any = useSelector(dockApiRef, (state) => state)
  const dockApiContext = dockApiState?.context
  const sendToDockApi = dockApiRef?.send
  const dockApi = dockApiContext?.api


  // panels
  const dockPanelNames = dockChildrenNames.filter((name) => name !== DOCK_ENUMS.DOCK_API_ID)
  const dockPanelRefs = dockPanelNames.map((name) => dockChildren[name])


  // metadata
  const meta = {
    panels: map(dockApi?.panels, "id"),
    groups: map(dockApi?.groups, "id"),
  }


  // exposed attributes
  const activeGroupId= dockApi?.activeGroup?.id
  const activePanelId= dockApi?.activePanel?.id
  const activeGroup = dockApi?.activeGroup
  const activePanel = dockApi?.activePanel

  const groups = dockApi?.groups
  const height= dockApi?.height
  const id= dockApi?.id
  const maximumHeight= dockApi?.maximumHeight
  const minimumHeight= dockApi?.minimumHeight
  const maximumWidth= dockApi?.maximumWidth
  const minimumWidth= dockApi?.minimumWidth

  const panels = dockApi?.panels
  const size = dockApi?.size
  const totalPanels = dockApi?.totalPanels
  const width = dockApi?.width

  // extended attributes
  const extras = {
    showLogs: dockApiContext?.showLogs,
    debug: dockApiContext?.debug,
    pending: dockApiContext?.pending,
    logLines: dockApiContext?.logLines
  }


  // event handlers


  return {
    // base
    dockAdapterRef,
    dockAdapterState,
    dockAdapterContext,
    sendToDockAdapter,

    // children
    dockChildren,
    dockChildrenNames,

    // api
    dockApiRef,
    dockApiState,
    dockApiContext,
    sendToDockApi,
    dockApi,

    //panels
    dockPanelNames,
    dockPanelRefs,

    // metadata
    meta,

    // exposed attributes
    activeGroupId,
    activePanelId,
    activeGroup,
    activePanel,
    groups,
    height,
    id,
    maximumHeight,
    minimumHeight,
    maximumWidth,
    minimumWidth,
    panels,
    size,
    totalPanels,
    width,

    // extended attributes
    extras,


    // event handlers


    //builtIn methods
    addFloatingGroup: (item: any, options: any) => dockApi?.addFloatingGroup(item, options),
    addGroup: (options: any) => dockApi?.getGroup(options),
    addPanel: (options: any) => dockApi?.addPanel(options),
    addPopoutGroup: (item: any, options: any) => dockApi?.addPopoutGroup(item, options),
    clear: () => dockApi?.clear(),
    closeAllGroups: () => dockApi?.closeAllGroups(),
    dispose: () => dockApi?.dispose(),
    exitMaximizedGroup: () => dockApi?.exitMaximizedGroup(),
    focus: () => dockApi?.focus(),
    fromJSON: (data: any) => dockApi?.toJSON(data),
    getGroup: (id: string) => dockApi?.getGroup(id),
    getPanel: (id: string) => dockApi?.getPanel(id),
    hasMaximizedGroup: () => dockApi?.hasMaximizedGroup(),
    layout: (width: number, height: number, force: boolean) => dockApi?.layout(width, height, force),
    maximizeGroup: (panel: any) => dockApi?.maximizeGroup(panel),
    moveToNext: (options: any) => dockApi?.moveToNext(options),
    moveToPrevious: (options: any) => dockApi?.moveToPrevious(options),
    removeGroup: (group: any) => dockApi?.removeGroup(group),
    removePanel: (panel: any) => dockApi?.removePanel(panel),
    toJSON: () => dockApi?.toJSON(),
    updateOptions: (options: any) => dockApi?.updateOptions(options),

  }
}


