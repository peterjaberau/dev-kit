import { chakra, useSlotRecipe } from "@chakra-ui/react"
import { appShellSlotRecipe } from "./styles"
import { useRef, useState } from "react"

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

export const AppShell = (props: AppShellProps) => {
  const recipe = useSlotRecipe({ recipe: appShellSlotRecipe })
  const [recipeProps, restProps] = recipe.splitVariantProps(props)
  const styles = recipe(recipeProps)

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [leftWidth, setLeftWidth] = useState(200)
  const [rightWidth, setRightWidth] = useState(200)
  const [bottomHeight, setBottomHeight] = useState(150)

  const handleResize = (e: MouseEvent, direction: "left" | "right" | "bottom") => {
    e.preventDefault()
    if (direction === "left") {
      const newWidth = e.clientX - (leftRef.current?.offsetLeft || 0)
      setLeftWidth(Math.max(newWidth, 120))
    } else if (direction === "right") {
      const parentWidth = rightRef.current?.parentElement?.offsetWidth || 0
      const newWidth = parentWidth - e.clientX
      setRightWidth(Math.max(newWidth, 120))
    } else if (direction === "bottom") {
      const parentHeight = bottomRef.current?.parentElement?.offsetHeight || 0
      const newHeight = parentHeight - e.clientY
      setBottomHeight(Math.max(newHeight, 80))
    }
  }

  const addResizeListeners = (e: React.MouseEvent, direction: "left" | "right" | "bottom") => {
    const moveHandler = (event: MouseEvent) => handleResize(event, direction)
    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler)
      document.removeEventListener("mouseup", upHandler)
    }
    document.addEventListener("mousemove", moveHandler)
    document.addEventListener("mouseup", upHandler)
  }

  const dynamicStyles: Record<string, any> = {
    "--side-panel-left-width": `${leftWidth}px`,
    "--side-panel-right-width": `${rightWidth}px`,
    "--bottom-height": `${bottomHeight}px`,
  }

  return (
    <chakra.div css={{ ...styles.root, ...dynamicStyles }}>
      <chakra.div css={styles.header}>header</chakra.div>

      <chakra.div css={styles.main}>
        <chakra.div css={styles.mainContainer}>
          <chakra.div css={styles.sidebarLeft}>sb.L</chakra.div>

          <chakra.div ref={leftRef} css={styles.sidePanelLeft}>
            sp.L
            <chakra.div css={styles.resizeHandleRight} onMouseDown={(e) => addResizeListeners(e, "left")} />
          </chakra.div>

          <chakra.div css={styles.body}>
            <chakra.div css={styles.canvasTop}>canvas.T</chakra.div>
            <chakra.div css={styles.canvas}>{props.children}</chakra.div>
            <chakra.div ref={bottomRef} css={styles.canvasBottom}>
              canvas.B
              {!recipeProps.pinnedCanvasBottom && (
                <chakra.div css={styles.resizeHandleTop} onMouseDown={(e) => addResizeListeners(e, "bottom")} />
              )}
            </chakra.div>
          </chakra.div>

          <chakra.div ref={rightRef} css={styles.sidePanelRight}>
            sp.R
            <chakra.div css={styles.resizeHandleLeft} onMouseDown={(e) => addResizeListeners(e, "right")} />
          </chakra.div>

          <chakra.div css={styles.sidebarRight}>sb.R</chakra.div>
        </chakra.div>
      </chakra.div>

      <chakra.div ref={bottomRef} css={styles.canvasBottom}>
        canvas.B
        <chakra.div css={styles.resizeHandleTop} onMouseDown={(e) => addResizeListeners(e, "bottom")} />
      </chakra.div>
      <chakra.div css={styles.footer}>footer</chakra.div>
    </chakra.div>
  )
}
