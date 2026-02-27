"use client"
import React from "react"
import { DraggablePanel, DraggablePanelBody, DraggablePanelContainer, DraggablePanelHeader } from "../DraggablePanel/"
import { useSelector } from "@xstate/react"
import { appShellPanelMachine } from "./AppShellPanelMachine"
import { ActorRefFrom } from "xstate"

const AppShellPanel = ({ actorRef }: { actorRef: ActorRefFrom<typeof appShellPanelMachine> }) => {
  // console.log('actorRef', actorRef);
  const snapshot = useSelector(actorRef, (state) => state)

  const isDeletingPanel = snapshot?.matches("Deleting") === true

  // event = { expand: true }
  function toggleEventHandler(event: object) {
    actorRef.send({ type: "triggering.toggle", content: event })
  }

  // event = 'pin'
  function toggleHandler(event: string) {
    actorRef.send({ type: "triggering.toggle", content: { [event]: !snapshot?.context.content[event] } })
  }

  return (
    <DraggablePanel
      showHandlerWideArea={true}
      showHandlerWhenUnexpand
      expand={snapshot?.context.content.expand}
      mode={snapshot?.context.content.pin ? "fixed" : "float"}
      onExpandChange={(e) => toggleEventHandler({ expand: e })}
      pin={snapshot?.context.content.pin}
      placement={snapshot?.context.content.placement.value}
      defaultSize={snapshot?.context.content.defaultSize}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <DraggablePanelContainer style={{ flex: 1 }}>
        <DraggablePanelHeader
          pin={snapshot?.context.pin}
          position="left"
          setExpand={() => toggleHandler("expand")}
          setPin={() => toggleHandler("pin")}
          title={snapshot?.context.content?.title ?? "Untitled"}
          placement={snapshot?.context.content.placement.value}
        />
        <DraggablePanelBody>
          <h1>
            {snapshot?.value} - {snapshot?.context.id}
          </h1>
          {JSON.stringify(snapshot?.context, null, 2)}
        </DraggablePanelBody>
      </DraggablePanelContainer>
    </DraggablePanel>
  )
}

AppShellPanel.displayName = "AppShellPanel"
export default AppShellPanel
