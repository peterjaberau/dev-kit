"use client"

import * as React from "react"
import { Portal } from "@chakra-ui/react"
import { FlexiblePanel, useFloatingPanel } from "#components/flexible-panel"
import { usePanelDocking, type Dock, type FloatingPanelStore } from "./usePanelDocking"

type ClickableProps = { onClick?: React.MouseEventHandler<any> }

export type DockablePanelApi = {
  panel: FloatingPanelStore
  dock: Dock
  setDock: (dock: Dock) => void
}

type CommonProps = {
  trigger?: React.ReactElement<ClickableProps>
  triggerBehavior?: "none" | "toggle"
  children: React.ReactNode | ((api: DockablePanelApi) => React.ReactNode)

  dock?: Dock
  onDockChange?: (dock: Dock) => void

  /** NEW: lets consumers control docking from outside children() */
  dockApiRef?: React.Ref<DockablePanelApi>
}

type UncontrolledProps = CommonProps & {
  value?: never
  defaultDock?: Dock
  draggable?: boolean
  resizable?: boolean
  defaultOpen?: boolean
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
  minSize?: { width: number; height: number }
}

type ControlledProps = CommonProps & {
  value: FloatingPanelStore
  defaultDock?: never
  draggable?: never
  resizable?: never
  defaultOpen?: never
  defaultPosition?: never
  defaultSize?: never
  minSize?: never
}

export type DockableFlexiblePanelProps = UncontrolledProps | ControlledProps

export function DockableFlexiblePanel(props: DockableFlexiblePanelProps) {
  const { trigger, triggerBehavior = "none", dockApiRef } = props

  const internalPanel = useFloatingPanel(
    "value" in props
      ? ({} as any)
      : ({
        draggable: props.draggable ?? true,
        resizable: props.resizable ?? true,
        defaultOpen: props.defaultOpen ?? false,
        defaultPosition: props.defaultPosition ?? { x: 600, y: 80 },
        defaultSize: props.defaultSize ?? { width: 420, height: 280 },
        minSize: props.minSize ?? { width: 320, height: 180 },
      } as any),
  )

  const panel: FloatingPanelStore = ("value" in props ? props.value : internalPanel) as any

  const { dock, setDock } = usePanelDocking({
    panel,
    dock: props.dock,
    onDockChange: props.onDockChange,
    defaultDock: "value" in props ? "floating" : props.defaultDock ?? "floating",
  })

  const api = React.useMemo<DockablePanelApi>(() => ({ panel, dock, setDock }), [panel, dock, setDock])

  React.useImperativeHandle(dockApiRef, () => api, [api])

  const triggerEl =
    trigger && triggerBehavior === "toggle"
      ? React.cloneElement(trigger, {
        onClick: (e) => {
          trigger.props.onClick?.(e)
          panel.setOpen(!panel.open)
        },
      })
      : trigger

  const content = typeof props.children === "function" ? props.children(api) : props.children

  return (
    <FlexiblePanel.RootProvider value={panel as any}>
      {triggerEl ? <FlexiblePanel.Trigger asChild>{triggerEl}</FlexiblePanel.Trigger> : null}

      <Portal>
        <FlexiblePanel.Positioner>
          <FlexiblePanel.Content>{content}</FlexiblePanel.Content>
        </FlexiblePanel.Positioner>
      </Portal>
    </FlexiblePanel.RootProvider>
  )
}