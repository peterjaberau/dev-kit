import { IDockviewHeaderActionsProps } from "#modules/dockview/core"
import { useDockViewPanel, useDockViewApi } from "#modules/dockview/actors/selectors"
import * as React from "react"
import { HStack } from "@chakra-ui/react"
import { IconButtonRender } from "../../icons"

const DockGroupControlsComponents: Record<string, React.FC> = {
  panel_1: () => {
    return <IconButtonRender variant="plain" name="download" />
  },
}

export const RightHeaderActions = (props: IDockviewHeaderActionsProps) => {

  const { panel, id, isGroupActive, panelContainerApi, maximize, isMaximized, exitMaximized, isPopout } = useDockViewPanel({
    panelId: props.activePanel?.id,
  })

  const { sendToDockApi } = useDockViewApi()


  const Component = React.useMemo(() => {
    if (!isGroupActive || !props.activePanel) {
      return null
    }

    return DockGroupControlsComponents[id]
  }, [isGroupActive, props.activePanel])

  const handleMaximization = () => {
    if (isMaximized()) {
      exitMaximized()
    } else {
      maximize()
    }
  }

  const handlePopout = () => {
    if (props.api.location.type !== "popout") {
      props.containerApi.addPopoutGroup(props.group)
    } else {
      props.api.moveTo({ position: "right" })
    }
  }

  const splitHorizontally = () => {

    sendToDockApi({ type: "onAddPanel", payload: { position: { referenceGroup: props.group, direction: 'below' } } })

  };

  const splitVertically = () => {
    sendToDockApi({ type: "onAddPanel", payload: { position: { referenceGroup: props.group, direction: 'right' } } })

  };

  return (
    <HStack
      gap={0}
      style={{
        color: "var(--dv-activegroup-hiddenpanel-tab-color)",
      }}
    >
      {props.isGroupActive && <IconButtonRender name="star" variant="plain" />}
      {Component && <Component />}

      <IconButtonRender onClick={splitVertically} name={"split-horizontal"} />

      <IconButtonRender onClick={splitHorizontally} name={"split-vertical"} />

      {!isPopout && <IconButtonRender onClick={handleMaximization} name={isMaximized() ? "collapse" : "expand"} />}
    </HStack>
  )
}
