import { IDockviewHeaderActionsProps } from "#modules/dockview/core"
import { HStack } from "@chakra-ui/react"
import { IconButtonRender } from "../../icons"
import * as React from "react"
import { useDockApi, useDockAdapter } from "#actors/model/selectors"
import { useDockViewApi } from "#actors/model/machines/dock-view"


export const LeftHeaderActions = (props: IDockviewHeaderActionsProps) => {
  // const { sendToDockApi, sendToDockAdapter } = useDockApi()
  const { sendToDockApi } = useDockViewApi()

  const onClick = () => {
    // sendToDockApi({ type: "onAddPanel", payload: { position: { referenceGroup: props.group.id } } })
    sendToDockApi({ type: "onAddPanel", payload: { position: { referenceGroup: props.group.id } } })


  }

  return (
    <HStack
      css={{
        color: "var(--dv-activegroup-visiblepanel-tab-color)",
      }}
    >
      <IconButtonRender onClick={onClick} name="add" />
    </HStack>
  )
}
