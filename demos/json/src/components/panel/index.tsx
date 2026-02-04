"use client"

import React, { useRef } from "react"
import { chakra, useSlotRecipe } from "@chakra-ui/react"

import { useResizablePanel, type UseResizablePanelParameters } from "./useResizablePanel"
import { panelSlotRecipe } from "./styles"

export interface PanelProps extends Omit<UseResizablePanelParameters, "panelRef" | "handleRef"> {
  isFloating?: boolean
  className?: string
  css?: any
  id?: string
  ariaLabel?: string
}

export const Panel: React.FC<React.PropsWithChildren<PanelProps>> = ({
  children,
  className,
                                                                       css={},
  defaultSize = 200,
  storageKey,
  position = "bottom",
  isFloating = false,
  minSize,
  maxSize,
  ariaLabel,
  onResize,
}) => {
  const handleRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const { panelSize, isResizing } = useResizablePanel({
    position,
    panelRef,
    handleRef,
    storageKey,
    defaultSize,
    minSize,
    maxSize,
    onResize,
  })

  const recipe = useSlotRecipe({ recipe: panelSlotRecipe })
  const styles = recipe({
    position,
    floating: isFloating,
    resizing: isResizing,
  })

  return (
    <chakra.div
      ref={panelRef}
      role="region"
      aria-label={ariaLabel}
      className={className}
      css={{
        ...styles.root,
        ...css,
        [position === "bottom" ? "height" : "width"]: `${panelSize}px`,
      }}
    >
      <chakra.div ref={handleRef} role="presentation" css={styles.handle} />
      {children}
    </chakra.div>
  )
}
