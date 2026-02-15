"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Registry = {
  registerPanel: (id: string, el: HTMLDivElement | null) => void
  getPanel: (id: string) => HTMLDivElement | null
  version: number
}

const PanelRegistryContext = createContext<Registry | null>(null)

/**
 * PanelRegistryProvider
 * ---------------------
 * - Provides a central registry for all panels in the layout.
 * - Stores panel DOM nodes keyed by panel ID.
 * - Keeps a reactive "version" to trigger re-render of Docked components when panels mount/unmount.
 * - This makes dynamic docking possible and prevents stale portal references.
 */
export const PanelRegistryProvider = ({ children }: { children: React.ReactNode }) => {
  const [panels, setPanels] = useState<Record<string, HTMLDivElement | null>>({})
  const [version, setVersion] = useState(0)

  const registerPanel = useCallback((id: string, el: HTMLDivElement | null) => {
    setPanels((prev) => ({ ...prev, [id]: el }))
    setVersion((v) => v + 1) // trigger re-render of Docked
  }, [])

  const getPanel = (id: string) => panels[id] || null

  return (
    <PanelRegistryContext.Provider value={{ registerPanel, getPanel, version }}>
      {children}
    </PanelRegistryContext.Provider>
  )
}

export const usePanelRegistry = () => {
  const ctx = useContext(PanelRegistryContext)
  if (!ctx) throw new Error("Must be inside PanelRegistryProvider")
  return ctx
}
