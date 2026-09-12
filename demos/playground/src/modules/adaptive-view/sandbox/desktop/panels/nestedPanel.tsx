import * as React from "react"
import { DockviewReadyEvent } from "#adaptive-view/core"
import { ThemeContext } from "../providers"
import { usePanelApi } from "../providers/PanelApiContext"
import { DockviewReact } from "#adaptive-view/react"
import { DEFAULT_DOCKVIEW_COMPONENT } from "./registry"

export function NestedPanel() {

  const theme = React.useContext(ThemeContext)
  const panelApi: any = usePanelApi()
  return (
    <DockviewReact
      components={DEFAULT_DOCKVIEW_COMPONENT}
      onReady={(event: DockviewReadyEvent) => {
        event.api.addPanel({ id: "panel_1", component: "default" })
        event.api.addPanel({ id: "panel_2", component: "default" })
        event.api.addPanel({
          id: "panel_3",
          component: "default",
        })

        event.api.onDidRemovePanel((e) => {
          console.log("remove", e)
        })
      }}
      theme={theme}
    />
  )
}
