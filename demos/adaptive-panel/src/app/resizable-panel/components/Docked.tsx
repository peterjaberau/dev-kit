"use client"

import { createPortal } from "react-dom"
import { usePanelRegistry } from "./PanelRegistry"

/**
 * Docked
 * ------
 * - Dynamically renders a component into a panel by ID.
 * - Uses React Portal to inject children into the target panel's DOM node.
 * - Reacts to panel mounting/unmounting via the registry's `version`.
 */
export const Docked = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const { getPanel, version } = usePanelRegistry()
  const container = getPanel(to) // get current DOM node

  if (!container) return null // panel not yet mounted

  return createPortal(children, container)
}
