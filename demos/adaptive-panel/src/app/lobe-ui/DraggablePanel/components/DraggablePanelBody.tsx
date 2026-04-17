"use client"

import { memo } from "react"

import { chakra, useSlotRecipe } from "@chakra-ui/react"
import { stylesRecipe } from "../recipe"

export const DraggablePanelBody = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe()
  return <chakra.div data-part={"draggable-panel-body"} css={styles.body} {...rest} />
})
