"use client"

import { Text } from "@chakra-ui/react"
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
  const parameters = (params as ViewPanelParameters | undefined) ?? panelApi?.getParameters<ViewPanelParameters>() ?? {}
  const viewId = parameters.viewId

  if (!viewId && !parameters.componentId) {
    return <Text padding="3">No view configured for this panel.</Text>
  }

  return <ViewRenderer viewId={viewId} componentId={parameters.componentId} options={parameters.props} />
}
