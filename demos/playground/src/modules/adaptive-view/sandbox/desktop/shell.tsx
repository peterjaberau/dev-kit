import { useCallback, useEffect, useRef, useState } from "react"
import {
  DockviewReact,
  DockviewDefaultTab,
  type DockviewReadyEvent,
  type DockviewApi,
  type IDockviewPanelHeaderProps,
  type SerializedDockview,
} from "#adaptive-view/react"

export function Shell() {
  const apiRef = useRef<DockviewApi | null>(null)
  const dockHostRef = useRef<HTMLDivElement | null>(null)
}