"use client"

import {
  DraggablePanelBody,
  DraggablePanelContainer,
  DraggablePanelFooter,
  DraggablePanelHeader,
} from "./DraggablePanel"
import { DraggablePanel as DraggablePanelParent } from "./DraggablePanel"
export * from "./constants"
import type { DraggablePanelComponent } from "./types"

export const DraggablePanel = DraggablePanelParent as unknown as DraggablePanelComponent

DraggablePanel.Container = DraggablePanelContainer
DraggablePanel.Body = DraggablePanelBody
DraggablePanel.Footer = DraggablePanelFooter
DraggablePanel.Header = DraggablePanelHeader

export default DraggablePanel
export { DraggablePanelBody, DraggablePanelContainer, DraggablePanelFooter, DraggablePanelHeader }
