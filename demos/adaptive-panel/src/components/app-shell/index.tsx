import { chakra, useSlotRecipe } from "@chakra-ui/react"
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { disableNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview"
import { preventUnhandled } from "@atlaskit/pragmatic-drag-and-drop/prevent-unhandled"
import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/types"
import { appShellSlotRecipe } from "./styles"
import { useEffect, useRef, useState } from "react"

export interface AppShellProps {
  children?: React.ReactNode
  showFooter?: boolean
  showBottom?: boolean
  showSidebarLeft?: boolean
  showSidePanelLeft?: boolean
  showSidebarRight?: boolean
  showSidePanelRight?: boolean
  showCanvasTop?: boolean
  showCanvasBottom?: boolean
  pinnedSidePanelLeft?: boolean
  pinnedSidePanelRight?: boolean
  pinnedCanvasBottom?: boolean
  pinnedBottom?: boolean
  [key: string]: any
}

const widths = {
  start: 260,
  min: 150,
  max: 450,
}
function getProposedWidth({ initialWidth, location }: { initialWidth: number; location: DragLocationHistory }): number {
  const diffX = location.current.input.clientX - location.initial.input.clientX
  const proposedWidth = initialWidth + diffX

  // ensure we don't go below the min or above the max allowed widths
  return Math.min(Math.max(widths.min, proposedWidth), widths.max)
}

export const AppShell = (props: AppShellProps) => {
  const [initialWidth, setInitialWidth] = useState(widths.start)
  const dividerRef = useRef<HTMLDivElement | null>(null)
  const [state, setState]: any = useState({
    type: "idle",
  })
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const divider: any = dividerRef.current

    return draggable({
      element: divider,
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        disableNativeDragPreview({ nativeSetDragImage })
        preventUnhandled.start()
      },
      onDragStart() {
        setState({ type: "dragging" })
      },
      onDrag({ location }) {
        contentRef.current?.style.setProperty(
          "--local-resizing-width",
          `${getProposedWidth({ initialWidth, location })}px`,
        )
      },
      onDrop({ location }) {
        preventUnhandled.stop()
        setState({ type: "idle" })

        setInitialWidth(getProposedWidth({ initialWidth, location }))
        contentRef.current?.style.removeProperty("--local-resizing-width")
      },
    })
  }, [initialWidth])

  const recipe = useSlotRecipe({ recipe: appShellSlotRecipe })
  const [recipeProps, restProps] = recipe.splitVariantProps(props)

  const styles = recipe(recipeProps)

  return (
    <chakra.div css={styles.root}>
      <chakra.div css={styles.header}>header</chakra.div>
      <chakra.div css={styles.main}>
        <chakra.div css={styles.mainContainer}>
          <chakra.div css={styles.sidebarLeft}>sb.L</chakra.div>
          <chakra.div css={styles.sidePanelLeft}>
            <chakra.div
              ref={contentRef}
              css={{
                "--local-initial-width": `${initialWidth}px`,
                flexGrow: 1,
                flexShrink: 1,
                width: `var(--local-resizing-width, var(--side-panel-left-width))`,
                ...(state.type === "dragging" ? { pointerEvents: "none" } : undefined),
              }}
            >
              sp.L
            </chakra.div>
            <chakra.div
              ref={dividerRef}
              css={{
                width: 1,
                cursor: "ew-resize",
                flexGrow: 0,
                flexShrink: 0,
                h: "100%",
                position: "relative",
                bg: "transparent",
                _before: {
                  backgroundColor: "#0C66E4",
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 1,
                },
                ...(state.type === "dragging" ? { pointerEvents: "none" } : undefined),
              }}
            ></chakra.div>
          </chakra.div>
          <chakra.div css={styles.body}>
            <chakra.div css={styles.canvasTop}>canvas.T</chakra.div>
            <chakra.div css={styles.canvas}>{props.children}</chakra.div>
            <chakra.div css={styles.canvasBottom}>canvas.B</chakra.div>
          </chakra.div>
          <chakra.div css={styles.sidePanelRight}>sp.R</chakra.div>
          <chakra.div css={styles.sidebarRight}>sb.R</chakra.div>
        </chakra.div>
      </chakra.div>
      <chakra.div css={styles.bottom}>bottom</chakra.div>
      <chakra.div css={styles.footer}>footer</chakra.div>
    </chakra.div>
  )
}
