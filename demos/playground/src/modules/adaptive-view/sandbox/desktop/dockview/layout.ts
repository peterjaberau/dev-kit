import { DockviewApi } from "#adaptive-view/react"
import { DEFAULT_LAYOUT_JSON } from "./default-layout"

export const nextId = (() => {
  let counter = 0

  return () => counter++
})()

export function loadDockviewLayout(api: DockviewApi, data?: unknown): void {
  const layout = JSON.parse(JSON.stringify(data ?? DEFAULT_LAYOUT_JSON))

  for (const panel of Object.values(layout.panels ?? {}) as any[]) {
    if (panel.contentComponent === "instance") {
      panel.contentComponent = "view"
    }
    if (panel.params?.instanceId && !panel.params.viewId) {
      panel.params.viewId = panel.params.instanceId
      delete panel.params.instanceId
    }
  }

  api.fromJSON(layout)
}
