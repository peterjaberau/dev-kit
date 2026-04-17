"use client"

import { PanelLeft, Pin, PinOff } from "lucide-react"
import React, { memo } from "react"
import useControlledState from "use-merge-value"
import { stylesRecipe } from "../recipe"
import { chakra, useSlotRecipe } from "@chakra-ui/react"

import { IconButton } from "@chakra-ui/react"

export interface DraggablePanelHeaderProps {
  pin?: boolean
  position?: "left" | "right" | "bottom" | "top"
  setExpand?: (expand: boolean) => void
  setPin?: (pin: boolean) => void
  title?: string
}

export const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { pin, setPin, setExpand, title, position = "left", ...rest } = props

  const [isPinned, setIsPinned] = useControlledState(false, {
    onChange: setPin,
    value: pin,
  })

  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe({ pin, position })

  const panelIcon = (
    <IconButton size="xs" variant={"ghost"} onClick={() => setExpand?.(false)}>
      <PanelLeft />
    </IconButton>
  )
  const pinIcon = (
    <IconButton onClick={() => setIsPinned(!isPinned)} size={"xs"} variant={pin ? "subtle" : "ghost"}>
      {pin ? <Pin /> : <PinOff />}
    </IconButton>
  )
  return (
    <chakra.div data-part={"draggable-panel-header"} css={styles.header} {...rest}>
      {position === "left" ? panelIcon : pinIcon}
      {title}
      {position === "left" ? pinIcon : panelIcon}
    </chakra.div>
  )
})
