"use client"
import React, { ReactNode } from "react"
import { useTheme } from "antd-style"
import { Flexbox } from "react-layout-kit"
import AppShellPanel from "./AppShellPanel"
import { useActor } from "@xstate/react"
import { appShellMachine } from "./AppShellMachine"

const AppShell = ({ children, header }: { children?: ReactNode; header?: ReactNode }) => {
  const theme = useTheme()


  const [snapshot, appActorRef] = useActor(appShellMachine, {
    systemId: "appShellMachine",
    // inspect: inspector.inspect,
  })

  const sidebarLeftActorRef = snapshot.context.draggablePanels.find((panel: any) => panel.id === "panel-sidebarLeft")
  const sidebarRightActorRef = snapshot.context.draggablePanels.find((panel: any) => panel.id === "panel-sidebarRight")
  const bottomPanelActorRef = snapshot.context.draggablePanels.find((panel: any) => panel.id === "panel-bottomPanel")

  console.log("sidebarRightActorRef", sidebarRightActorRef?.getSnapshot().context)

  // console.log('sidebarLeftActorRef', {
  //   isDefined: typeof sidebarLeftActorRef !== undefined,
  //   actorRef: sidebarLeftActorRef?.getSnapshot().context,
  // });

  return (
    <>
      <Flexbox
        direction={"vertical"}
        height={"100%"}
        // height={`calc(100% - ${HEADER_HEIGHT}px)`}
        width={"100%"}
        style={{ position: "relative" }}
      >
        {header}
        {/*{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, position: 'relative', maxWidth: '100wh' }*/}
        <Flexbox
          direction={"horizontal"}
          width={"100%"}
          height={"100%"}
          style={{ maxWidth: "100vw", overflow: "hidden", position: "relative" }}
        >
          {typeof sidebarLeftActorRef !== undefined && (
            <>
              <AppShellPanel key={sidebarLeftActorRef?.getSnapshot().context.id} actorRef={sidebarLeftActorRef} />
            </>
          )}

          <Flexbox
            direction={"vertical"}
            flex={1}
            width={"100%"}
            height={"100%"}
            style={{ overflow: "hidden", position: "relative" }}
          >
            {/*{snapshot.matches('Loading initial state') && <>Loading...</>}*/}
            {/*<pre>*/}
            {/*  {JSON.stringify(*/}
            {/*    snapshot.context.draggablePanels.map((panel) => panel.getSnapshot().context),*/}
            {/*    null,*/}
            {/*    2,*/}
            {/*  )}*/}
            {/*</pre>*/}
            <Flexbox
              flex={1}
              direction={"vertical"}
              style={{
                overflow: "hidden auto",
                position: "relative",
                backgroundColor: 'white',
                padding: 1,
              }}
            >
              {children}
            </Flexbox>

            {typeof bottomPanelActorRef !== undefined && (
              <AppShellPanel key={bottomPanelActorRef?.getSnapshot().context.id} actorRef={bottomPanelActorRef} />
            )}
          </Flexbox>

          {typeof sidebarRightActorRef !== undefined && (
            <AppShellPanel key={sidebarRightActorRef?.getSnapshot().context.id} actorRef={sidebarRightActorRef} />
          )}
        </Flexbox>
      </Flexbox>
    </>
  )
}

AppShell.displayName = "AppShell"
export default AppShell
