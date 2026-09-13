"use client"

import { Box, Card, Stack, Text } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import {
  useDockviewGroup,
  useDockview,
  useDockviewPanel,
  useInteractions,
  useView,
  useViews,
} from "#adaptive-view/sandbox/desktop/selectors"

function InspectorJson({ title, value }: { title: string; value: object }) {
  return (
    <Card.Root size="sm">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body paddingTop="0">
        <JsonView key={JSON.stringify(value)} src={value} theme="github" collapsed={2} />
      </Card.Body>
    </Card.Root>
  )
}

export function DebuggerInspectorView() {
  const { metadata: viewMetadata } = useViews()
  const { metadata: dockviewMetadata } = useDockview()
  const { selectedPanelId, selectedGroupId, selectedViewId } = useInteractions()
  const { viewState } = useView(selectedViewId ?? "")
  const { panelState, panelContext } = useDockviewPanel(selectedPanelId ?? "")
  const { groupState, groupContext } = useDockviewGroup(selectedGroupId ?? "")

  const selections = {
    viewId: selectedViewId,
    panelId: selectedPanelId,
    groupId: selectedGroupId,
  }
  return (
    <Box width="full" padding="3">
      <Stack gap="3">
        <InspectorJson title="Selections" value={selections} />
        <InspectorJson title="Available State" value={{ viewMetadata, dockviewMetadata }} />
        {viewState ? (
          <InspectorJson title="Selected View" value={viewState} />
        ) : (
          <Text color="fg.muted">No view selected.</Text>
        )}
        {panelState ? (
          <InspectorJson title="Selected Panel" value={{ context: panelContext, state: panelState }} />
        ) : (
          <Text color="fg.muted">No panel selected.</Text>
        )}
        {groupState ? (
          <InspectorJson title="Selected Group" value={{ context: groupContext, state: groupState }} />
        ) : (
          <Text color="fg.muted">No group selected.</Text>
        )}
      </Stack>
    </Box>
  )
}
