'use client';

import { memo } from 'react';
import { chakra, useSlotRecipe } from "@chakra-ui/react"
import { stylesRecipe } from "../recipe"

export const DraggablePanelFooter = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe()

  return <chakra.div css={styles.footer} {...rest} />
})

