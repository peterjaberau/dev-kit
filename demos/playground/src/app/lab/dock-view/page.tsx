"use client"

import { InspectorPanel } from "./controls/inspector-panel"
import { PlaygroundApp } from "./render/playground-app"

export default function PlaygroundPage() {
  return (
    <>
      <PlaygroundApp />
      <InspectorPanel />
    </>
  )
}
