"use client"

import { Text } from "@chakra-ui/react"
import { RegistryViewer } from "#plugins/registry-manager-plugin/view"
import { useInstance, useSandboxInstance } from "../../instance-manager/selectors"
import * as React from "react"

interface InstanceViewProps {
  instanceId: string
}

function InstanceView({ instanceId }: InstanceViewProps) {
  const { instancePlugin, instanceProps } = useInstance(instanceId)

  if (!instancePlugin) {
    return <Text padding="3">Instance not found: {instanceId}</Text>
  }

  return (
    <div data-sandbox-theme-isolated style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}>
      <RegistryViewer componentId={instancePlugin} options={instanceProps} />
    </div>
  )
}

export const InstancePanel = () => {
  const { selectedInstanceId } = useSandboxInstance()

  return selectedInstanceId ? (
    <InstanceView instanceId={selectedInstanceId} />
  ) : (
    <Text padding="3">Select an instance from Spawned Instances.</Text>
  )

}