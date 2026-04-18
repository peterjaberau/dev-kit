"use client"

import { FloatingPanel as ArkFloatingPanel, useFloatingPanelContext } from "@ark-ui/react/floating-panel"
import { Maximize, MaximizeIcon, MinimizeIcon, MinusIcon } from "lucide-react"
import type React from "react"
import { chakra, Portal, Button, type ButtonProps, ScrollArea, useSlotRecipe } from "@chakra-ui/react"
import { floatingPanelRecipe, axes } from "./floating-panel-recipe"

export const useFloatingPanel = useFloatingPanelContext


export const FloatingPanel = (props: React.ComponentProps<typeof ArkFloatingPanel.Root>) => {
  const { lazyMount = true, unmountOnExit = true, ...rest } = props

  return (
    <ArkFloatingPanel.Root data-slot="floating-panel" lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...rest} />
  )
}

export const FloatingPanelTrigger = (props: React.ComponentProps<typeof ArkFloatingPanel.Trigger>) => (
  <ArkFloatingPanel.Trigger data-slot="floating-panel-trigger" {...props} />
)

interface FloatingPanelContentProps extends React.ComponentProps<typeof ArkFloatingPanel.Content> {
  /**
   * Enable resizable panel
   *
   * @default true
   */
  resizable?: boolean
}

export const FloatingPanelContent = (props: FloatingPanelContentProps) => {
  const { resizable = true, style, children, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return (
    <Portal>
      <ArkFloatingPanel.Positioner data-slot="floating-panel-positioner" style={styles.positioner}>
        <ArkFloatingPanel.Content style={{ ...styles.content, ...style }} data-slot="floating-panel-content" {...rest}>
          {children}

          {resizable && (
            <>
              <FloatingPanelResizeTrigger axis="n" />
              <FloatingPanelResizeTrigger axis="e" />
              <FloatingPanelResizeTrigger axis="w" />
              <FloatingPanelResizeTrigger axis="s" />
              <FloatingPanelResizeTrigger axis="ne" />
              <FloatingPanelResizeTrigger axis="se" />
              <FloatingPanelResizeTrigger axis="sw" />
              <FloatingPanelResizeTrigger axis="nw" />
            </>
          )}
        </ArkFloatingPanel.Content>
      </ArkFloatingPanel.Positioner>
    </Portal>
  )
}

export const FloatingPanelDragTrigger = (props: React.ComponentProps<typeof ArkFloatingPanel.DragTrigger>) => {
  return <ArkFloatingPanel.DragTrigger data-slot="floating-panel-drag-trigger" {...props} />
}

export const FloatingPanelHeader = (props: React.ComponentProps<typeof ArkFloatingPanel.Header>) => {
  const { style, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return (
    <FloatingPanelDragTrigger>
      <ArkFloatingPanel.Header style={{ ...styles.header, ...style }} {...rest} />
    </FloatingPanelDragTrigger>
  )
}

export const FloatingPanelControl = (props: React.ComponentProps<typeof ArkFloatingPanel.Control>) => {
  const { style, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return <ArkFloatingPanel.Control style={{ ...styles.control, ...(style as React.CSSProperties) }} {...rest} />
}

type StageTriggerBaseProps = Omit<React.ComponentProps<typeof ArkFloatingPanel.StageTrigger>, "stage">
type ChakraButtonSafeProps = Omit<ButtonProps, keyof StageTriggerBaseProps>
export type FloatingPanelStageTriggerProps = StageTriggerBaseProps & ChakraButtonSafeProps

export const FloatingPanelMinimize = (props: FloatingPanelStageTriggerProps) => {
  const { size = "xs", variant = "ghost", ...rest } = props

  return (
    <ArkFloatingPanel.StageTrigger {...rest} asChild stage="minimized">
      <Button aria-label="Minimize" size={size} variant={variant}>
        <MinusIcon />
      </Button>
    </ArkFloatingPanel.StageTrigger>
  )
}

export const FloatingPanelMaximize = (props: FloatingPanelStageTriggerProps) => {
  const { size = "xs", variant = "ghost", ...rest } = props

  return (
    <ArkFloatingPanel.StageTrigger {...rest} asChild stage="maximized">
      <Button aria-label="Maximize" size={size} variant={variant}>
        <Maximize />
      </Button>
    </ArkFloatingPanel.StageTrigger>
  )
}

export const FloatingPanelRestore = (props: FloatingPanelStageTriggerProps) => {
  const { size = "xs", variant = "outline", ...rest } = props

  return (
    <ArkFloatingPanel.StageTrigger {...rest} asChild stage="default">
      <Button aria-label="Restore" size={size} variant={variant}>
        <MinimizeIcon className="group-data-maximized/floating-panel:block hidden" />
        <MaximizeIcon className="group-data-minimized/floating-panel:block hidden" />
      </Button>
    </ArkFloatingPanel.StageTrigger>
  )
}

export const FloatingPanelTitle = (props: React.ComponentProps<typeof ArkFloatingPanel.Title>) => {
  const { style, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return <ArkFloatingPanel.Title data-slot="floating-panel-title" style={{ ...styles.title, ...style }} {...rest} />
}

export const FloatingPanelResizeTrigger = (props: React.ComponentProps<typeof ArkFloatingPanel.ResizeTrigger>) => {

  const { style, ...rest } = props

  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()
   return (
     <ArkFloatingPanel.ResizeTrigger
       data-slot="floating-panel-resize-trigger"
       style={{ ...styles.content, ...style }}
       {...props}
     />
   )

}



export const FloatingPanelStageTrigger = (props: React.ComponentProps<typeof ArkFloatingPanel.StageTrigger>) => (
  <ArkFloatingPanel.StageTrigger data-slot="floating-panel-stage-trigger" {...props} />
)

export const FloatingPanelCloseTrigger = (props: React.ComponentProps<typeof ArkFloatingPanel.CloseTrigger>) => (
  <ArkFloatingPanel.CloseTrigger data-slot="floating-panel-close-trigger" {...props} />
)

interface FloatingPanelBodyProps extends React.ComponentProps<typeof ArkFloatingPanel.Body> {
  /**
   * Add a fade effect to the scroll area
   *
   * @default false
   */
  scrollFade?: boolean
}

export const FloatingPanelBody = (props: FloatingPanelBodyProps) => {
  const { scrollFade = false, style, children, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return (
    <ScrollArea.Root variant={scrollFade ? "hover" : "always"} style={{ height: "100%", minHeight: 0 }}>
      <ScrollArea.Viewport
        css={{
          height: "100%",
          "--scroll-shadow-size": "4rem",
          maskImage: "linear-gradient(#000, #000)",
          "&[data-overflow-y]": {
            maskImage:
              "linear-gradient(#000,#000,transparent 0,#000 var(--scroll-shadow-size),#000 calc(100% - var(--scroll-shadow-size)),transparent)",
            "&[data-at-top]": {
              maskImage: "linear-gradient(180deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
            },
            "&[data-at-bottom]": {
              maskImage: "linear-gradient(0deg,#000 calc(100% - var(--scroll-shadow-size)),transparent)",
            },
          },
        }}
      >
        <ScrollArea.Content>
          <ArkFloatingPanel.Body style={{ ...styles.body, ...style }} data-slot="floating-panel-body" {...rest}>
            {children}
          </ArkFloatingPanel.Body>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

export const FloatingPanelFooter = (props: React.ComponentProps<typeof chakra.div>) => {
  const { style, ...rest } = props
  const useRecipe: any = useSlotRecipe({ recipe: floatingPanelRecipe })
  const styles: any = useRecipe()

  return <chakra.div style={{ ...styles.footer, ...style }} data-slot="floating-panel-footer" {...rest} />
}
