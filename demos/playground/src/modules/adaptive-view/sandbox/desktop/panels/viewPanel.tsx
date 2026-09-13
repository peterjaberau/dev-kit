"use client"

import { Text } from "@chakra-ui/react"
import { useInteractions } from "../selectors"
import { ViewRenderer } from "../views"
import { usePanelApi } from "../providers/PanelApiContext"
import type { IDockviewPanelProps } from "#adaptive-view/react"

interface ViewPanelParameters {
  viewId?: string
  componentId?: string
  props?: Record<string, unknown>
}

export const ViewPanel = ({ params }: Pick<IDockviewPanelProps, "params">) => {
  const panelApi = usePanelApi()
  const { selectedViewId } = useInteractions()
  const parameters = (params as ViewPanelParameters | undefined) ?? panelApi?.getParameters<ViewPanelParameters>() ?? {}
  const viewId = parameters.viewId ?? selectedViewId ?? undefined

  if (!viewId && !parameters.componentId) {
    return <Text padding="3">Select a view from Views.</Text>
  }

  return <ViewRenderer viewId={viewId} componentId={parameters.componentId} options={parameters.props} />
}
