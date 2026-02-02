import React, { useRef } from "react"
import classNames from "classnames"
import { upperFirst } from "lodash"

import { useResizablePanel, type UseResizablePanelParameters } from "./useResizablePanel"
import { getDisplayStyle, getPositionStyle } from "./utils"

import "./panel.css"

export interface PanelProps extends Omit<UseResizablePanelParameters, "panelRef" | "handleRef"> {
  isFloating?: boolean
  handleClassName?: string
  className?: string
  id?: string
  ariaLabel: string
}

export const Panel: React.FunctionComponent<React.PropsWithChildren<PanelProps>> = ({
  children,
  className,
  defaultSize = 200,
  storageKey,
  position = "bottom",
  isFloating = false,
  handleClassName,
  minSize,
  maxSize,
  ariaLabel,
  onResize,
}) => {
  const handleReference = useRef<HTMLDivElement | null>(null)
  const panelReference = useRef<HTMLDivElement | null>(null)

  const { panelSize, isResizing } = useResizablePanel({
    position,
    panelRef: panelReference,
    handleRef: handleReference,
    storageKey,
    defaultSize,
    minSize,
    maxSize,
    onResize,
  })

  return (
    <div
      style={{ [position === "bottom" ? "height" : "width"]: `${panelSize}px` }}
      className={classNames(className, "panel", getPositionStyle({ position }), getDisplayStyle({ isFloating }))}
      ref={panelReference}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        ref={handleReference}
        role="presentation"
        className={classNames(
          "handle",
          `handle${upperFirst(position)}`,
          handleClassName,
          isResizing && "handleResizing",
        )}
      />
      {children}
    </div>
  )
}
