"use client"

import * as React from "react"

export type Dock = "floating" | "left" | "right" | "bottom"

export type FloatingPanelStore = {
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
  size: { width: number; height: number }
  setSize: (size: { width: number; height: number }) => void
}

type Options = {
  panel: FloatingPanelStore
  dock?: Dock
  defaultDock?: Dock
  onDockChange?: (dock: Dock) => void

  /**
   * If true, whenever size changes via the wrapper's `setSize`, the dock is re-applied.
   * (This keeps "right" and "bottom" pinned after resizes done through the wrapper.)
   */
  keepDockOnResize?: boolean
}

export function usePanelDocking(opts: Options) {
  const { panel, dock: controlledDock, defaultDock = "floating", onDockChange, keepDockOnResize = true } = opts

  const isControlled = controlledDock != null
  const [uncontrolledDock, setUncontrolledDock] = React.useState<Dock>(defaultDock)
  const dock = (isControlled ? controlledDock : uncontrolledDock) as Dock

  const setDock = React.useCallback(
    (next: Dock) => {
      if (!isControlled) setUncontrolledDock(next)
      onDockChange?.(next)

      if (next === "floating") return

      const vw = window.innerWidth
      const vh = window.innerHeight

      if (next === "left") {
        panel.setPosition({ x: 0, y: 0 })
      } else if (next === "right") {
        panel.setPosition({ x: Math.max(0, vw - panel.size.width), y: 0 })
      } else if (next === "bottom") {
        panel.setPosition({ x: 0, y: Math.max(0, vh - panel.size.height) })
      }
    },
    [isControlled, onDockChange, panel],
  )

  // Optional helper so the wrapper can keep dock pinned when it changes size.
  const setSizeAndKeepDock = React.useCallback(
    (size: { width: number; height: number }) => {
      panel.setSize(size)
      if (keepDockOnResize && dock !== "floating") {
        // re-apply dock using the new size (important for right/bottom)
        // Note: this is synchronous in the same event; no useEffect needed.
        const vw = window.innerWidth
        const vh = window.innerHeight
        if (dock === "right") panel.setPosition({ x: Math.max(0, vw - size.width), y: 0 })
        if (dock === "bottom") panel.setPosition({ x: 0, y: Math.max(0, vh - size.height) })
        if (dock === "left") panel.setPosition({ x: 0, y: 0 })
      }
    },
    [dock, keepDockOnResize, panel],
  )

  return { dock, setDock, setSizeAndKeepDock }
}