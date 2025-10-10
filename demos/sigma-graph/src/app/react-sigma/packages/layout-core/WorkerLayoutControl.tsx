"use client"
import { useSigma } from "#react-sigma/core"
import React, { CSSProperties, useEffect } from "react"
import { IoStop as StopLayoutIcon } from "react-icons/io5"
import { IoPlay as StartLayoutIcon } from "react-icons/io5"
import { IconButton } from "@chakra-ui/react"

import { LayoutWorkerHook } from "./useWorkerLayoutFactory"

type WorkerLayoutLabelKeys = "start" | "stop"

/**
 * Properties for `WorkerLayoutControl` component
 */
export interface WorkerLayoutControlProps {
  /**
   * HTML id
   */
  id?: string

  /**
   * HTML class
   */
  className?: string

  /**
   * HTML CSS style
   */
  style?: CSSProperties

  /**
   * The layout hook to use
   */
  layout: LayoutWorkerHook

  /**
   * Option to tell what we do when the component is mounted
   *  - <code>-1</code> means that we do nothing (it's the same as no value)
   *  - <code>0</code> means that we start the algo (and don't auto stop it)
   *  - <code>X</code> mans that we start the algo, and stop it after X milliseconds
   */
  autoRunFor?: number

  /**
   * It's possible to customize the button, by passing to JSX Element.
   * First one is for the "start layout", and the second to "stop layout".
   * Example :
   * ```jsx
   * <WorkerLayoutControl>
   *   <>
   *     <span>Start</span>
   *     <span>Stop</span>
   *   </>
   * </WorkerLayoutControl>
   * ```
   */
  children?: [React.JSX.Element, React.JSX.Element]

  /**
   * Map of the labels we use in the component.
   * This is usefull for I18N
   */
  labels?: { [Key in WorkerLayoutLabelKeys]?: string }
}

export function WorkerLayoutControl({
  id,
  className,
  style,
  layout,
  autoRunFor,
  children,
  labels = {},
}: WorkerLayoutControlProps) {
  // Get Sigma
  const sigma = useSigma()
  // Get layout
  const { stop, start, isRunning } = layout
  // Common html props for the div
  const props = {
    className: `react-sigma-control ${className || ""}`,
    id,
    style,
  }

  /**
   * Init component when Sigma or component settings change.
   */
  useEffect(() => {
    if (!sigma) {
      return
    }

    // we run the algo
    let timeout: number | null = null
    if (autoRunFor !== undefined && autoRunFor > -1 && sigma.getGraph().order > 0) {
      start()
      // set a timeout to stop it
      timeout =
        autoRunFor > 0
          ? window.setTimeout(() => {
              stop()
            }, autoRunFor)
          : null
    }

    //cleaning
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [autoRunFor, start, stop, sigma])

  return (
    <div {...props}>
      <IconButton
        size={"2xs"}
        variant={"ghost"}
        onClick={() => (isRunning ? stop() : start())}
        title={
          isRunning ? labels["stop"] || "Stop the layout animation" : labels["start"] || "Start the layout animation"
        }
      >
        {children && !isRunning && children[0]}
        {children && isRunning && children[1]}
        {!children && !isRunning && <StartLayoutIcon />}
        {!children && isRunning && <StopLayoutIcon />}
      </IconButton>
    </div>
  )
}
