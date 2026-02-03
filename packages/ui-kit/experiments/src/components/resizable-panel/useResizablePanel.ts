import type React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
export const PANEL_POSITIONS: any = ["left", "right", "bottom"] as const

const STORAGE_KEY_PREFIX = "ResizePanel:"

const savePanelSize = (storageKey: string | null | undefined, size: number): void => {
  if (storageKey) {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${storageKey}`, String(size))
  }
}

const isLessThanOrEqualMax = (size: number, maxSize?: number): boolean => maxSize == null || size <= maxSize

const isGreaterThanOrEqualMin = (size: number, minSize?: number): boolean => minSize == null || size >= minSize

const getCachedPanelSize = (
  storageKey: string | undefined | null,
  defaultSize: number,
  maxSize?: number,
  minSize?: number,
): number => {
  if (!storageKey) return defaultSize

  const cached = localStorage.getItem(`${STORAGE_KEY_PREFIX}${storageKey}`)
  const size = cached ? parseInt(cached, 10) : NaN

  if (Number.isFinite(size) && isLessThanOrEqualMax(size, maxSize) && isGreaterThanOrEqualMin(size, minSize)) {
    return size
  }

  return defaultSize
}

export interface PanelResizerState {
  panelSize: number
  isResizing: boolean
}

export interface UseResizablePanelParameters {
  position?: (typeof PANEL_POSITIONS)[number]
  storageKey?: string | null
  defaultSize?: number
  minSize?: number
  maxSize?: number
  panelRef: React.RefObject<HTMLDivElement | null>
  handleRef: React.RefObject<HTMLDivElement | null>
  onResize?: (size: number) => void
}

export const useResizablePanel = ({
  defaultSize = 250,
  handleRef,
  panelRef,
  position,
  storageKey,
  maxSize,
  minSize,
  onResize,
}: UseResizablePanelParameters): PanelResizerState => {
  const [isResizing, setResizing] = useState(false)
  const [panelSize, setPanelSize] = useState(defaultSize)
  const debounceTimer = useRef<number | null>(null)

  useLayoutEffect(() => {
    const size = getCachedPanelSize(storageKey, defaultSize, maxSize, minSize)
    setPanelSize(size)
    onResize?.(size)
  }, [storageKey, defaultSize, maxSize, minSize, onResize])

  useEffect(() => {
    if (!storageKey) return

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = window.setTimeout(() => {
      savePanelSize(storageKey, panelSize)
    }, 250)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [panelSize, storageKey])

  useEffect(() => {
    const handle = handleRef.current
    const panel = panelRef.current
    if (!handle || !panel) return

    const onMouseMove = (event: MouseEvent): void => {
      event.preventDefault()

      let size =
        position !== "bottom"
          ? position === "left"
            ? event.pageX - panel.getBoundingClientRect().left
            : panel.getBoundingClientRect().right - event.pageX
          : panel.getBoundingClientRect().bottom - event.pageY

      if (event.shiftKey) {
        size = Math.ceil(size / 20) * 20
      }

      if (isLessThanOrEqualMax(size, maxSize) && isGreaterThanOrEqualMin(size, minSize)) {
        setPanelSize(size)
        onResize?.(size)
      }
    }

    const onMouseUp = (event: Event): void => {
      event.preventDefault()
      setResizing(false)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseDown = (event: MouseEvent): void => {
      event.preventDefault()
      setResizing(true)
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    handle.addEventListener("mousedown", onMouseDown)

    return () => {
      handle.removeEventListener("mousedown", onMouseDown)
    }
  }, [panelRef, handleRef, position, maxSize, minSize, onResize])

  return { panelSize, isResizing }
}
