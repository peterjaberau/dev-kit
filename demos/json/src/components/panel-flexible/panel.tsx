"use client"

import React, { useRef } from "react"
import { chakra, useSlotRecipe } from "@chakra-ui/react"

import { useResizablePanel } from "./useResizablePanel"
import { panelSlotRecipe } from "./styles"
import { PANEL_POSITIONS } from "./useResizablePanel"

export interface PanelProps {
  position?: (typeof PANEL_POSITIONS)[number]
  isFloating?: boolean
  canPush?: boolean
  storageKey?: string | null
  defaultSize?: number
  minSize?: number
  maxSize?: number
  ariaLabel: string
  className?: string
}

export const Panel: React.FC<React.PropsWithChildren<PanelProps>> = ({
  children,
  position = "bottom",
  isFloating = false,
  canPush = false,
  storageKey,
  defaultSize = 200,
  minSize,
  maxSize,
  ariaLabel,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)

  const { panelSize, isResizing } = useResizablePanel({
    position,
    panelRef,
    handleRef,
    storageKey,
    defaultSize,
    minSize,
    maxSize,
  })

  const recipe = useSlotRecipe({ recipe: panelSlotRecipe })
  const styles = recipe({ position, floating: isFloating, resizing: isResizing })

  return (
    <chakra.div
      ref={panelRef}
      role="region"
      aria-label={ariaLabel}
      className={className}
      css={styles.root}
      data-floating={isFloating}
      data-can-push={canPush}
      data-position={position}
      style={{
        [position === "bottom" ? "height" : "width"]: `${panelSize}px`,
      }}
    >
      <chakra.div ref={handleRef} role="presentation" css={styles.handle} />
      {children}
    </chakra.div>
  )
}
