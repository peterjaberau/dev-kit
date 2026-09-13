"use client"

import { Box, Card, Stack, Text } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import {
  useInstance,
  useInstanceManager,
  useDesktopInstance,
} from "../../adaptive-view/sandbox/instance-manager/selectors"
import {
  useDockviewGroup,
  useDockviewManager,
  useDockviewPanel,
  useDockviewSelection,
} from "../../adaptive-view/sandbox/dockview-manager/selectors"

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
  const { metadata: instanceMetadata } = useInstanceManager()
  const { metadata: dockviewMetadata } = useDockviewManager()
  const { selectedInstanceId } = useDesktopInstance()
  const { selectedPanelId, selectedGroupId } = useDockviewSelection()
  const { instanceState } = useInstance(selectedInstanceId ?? "")
  const { panelState, panelContext } = useDockviewPanel(selectedPanelId ?? "")
  const { groupState, groupContext } = useDockviewGroup(selectedGroupId ?? "")

  const selections = {
    instanceId: selectedInstanceId,
    panelId: selectedPanelId,
    groupId: selectedGroupId,
  }
  const instanceSnapshot = instanceState
    ? {
        status: instanceState.status,
        value: instanceState.value,
        context: instanceState.context,
      }
    : null

  return (
    <Box width="full" padding="3">
      <Stack gap="3">
        <InspectorJson title="Selections" value={selections} />
        <InspectorJson title="Available State" value={{ instanceMetadata, dockviewMetadata }} />
        {instanceSnapshot ? (
          <InspectorJson title="Selected Instance" value={instanceSnapshot} />
        ) : (
          <Text color="fg.muted">No instance selected.</Text>
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
