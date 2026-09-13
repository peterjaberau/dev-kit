"use client"

import { Text } from "@chakra-ui/react"
import { useInteractions } from "../selectors"
import { ViewDynamicRenderer } from "../views"
import { usePanelApi } from "../providers/PanelApiContext"
import type { IDockviewPanelProps } from "#adaptive-view/react"

interface DynamicPanelParameters {
  viewId?: string
  componentId?: string
  props?: Record<string, unknown>
}

export const DynamicPanel = ({ params }: Pick<IDockviewPanelProps, "params">) => {
  const panelApi = usePanelApi()
  const { selectedViewId } = useInteractions()
  const parameters =
    (params as DynamicPanelParameters | undefined) ?? panelApi?.getParameters<DynamicPanelParameters>() ?? {}
  const viewId = parameters.viewId ?? selectedViewId ?? undefined

  if (!viewId && !parameters.componentId) {
    return <Text padding="3">Select a view from Views.</Text>
  }

  return <ViewDynamicRenderer viewId={viewId} componentId={parameters.componentId} options={parameters.props} />
}
