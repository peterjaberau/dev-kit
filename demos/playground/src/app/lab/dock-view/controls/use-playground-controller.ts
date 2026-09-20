"use client"

import { PlaygroundContext } from "../render/playground-provider"

export function usePlaygroundController() {
  const actor = PlaygroundContext.useActorRef()
  const inspector = PlaygroundContext.useSelector((state) => state.context.inspector)
  const config = PlaygroundContext.useSelector((state) => state.context.config)
  const datasets = PlaygroundContext.useSelector((state) => state.context.datasets)
  const panel = inspector.panels.find((p) => p.id === inspector.selectedPanelId) ?? null
  const tab = panel?.tabs.find((t) => t.id === inspector.selectedTabId) ?? null
  return {
    ...inspector,
    panel,
    tab,
    global: config.global,
    themeId: config.options.themeId,
    themes: datasets.themes,
    presets: datasets.presets,
    send: actor.send,
  }
}
