import { chakra, useSlotRecipe } from "@chakra-ui/react"
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

export const AppShell = (props: AppShellProps) => {
  const recipe = useSlotRecipe({ recipe: appShellSlotRecipe })
  const [recipeProps, restProps] = recipe.splitVariantProps(props)

  const styles = recipe(recipeProps)

  return (
    <chakra.div css={styles.root}>
      <chakra.div css={styles.header}>header</chakra.div>
      <chakra.div css={styles.main}>
        <chakra.div css={styles.mainContainer}>
          <chakra.div css={styles.sidebarLeft}>sb.L</chakra.div>
          <chakra.div css={styles.sidePanelLeft}>sp.L</chakra.div>
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
