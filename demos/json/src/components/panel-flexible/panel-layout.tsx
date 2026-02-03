"use client"

import { chakra, useRecipe } from "@chakra-ui/react"
import { panelLayoutRecipe } from "./styles"

export const PanelLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const recipe = useRecipe({ recipe: panelLayoutRecipe })
  const styles = recipe()

  return <chakra.div css={styles}>{children}</chakra.div>
}
