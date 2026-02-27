"use client"

import { useHover } from "ahooks"
import { ConfigProvider } from "antd"
import { cx } from "antd-style"
import isEqual from "fast-deep-equal"
import type { Enable, NumberSize, Size } from "re-resizable"
import { Resizable } from "re-resizable"
import { memo, use, useCallback, useEffect, useMemo, useReducer, useRef, useTransition } from "react"
import useControlledState from "use-merge-value"


import { handleVariants, panelVariants, styles } from "./style"
import type { DraggablePanelProps } from "./type"
import { reversePlacement } from "./utils"

// Constants
const DEFAULT_PIN = true
const DEFAULT_EXPAND = true

// State reducer for better state management
interface DraggablePanelState {
  isResizing: boolean
  showExpand: boolean
}

type DraggablePanelAction =
  | { type: "START_RESIZE" }
  | { type: "STOP_RESIZE" }
  | { payload: boolean; type: "SET_SHOW_EXPAND" }

function draggablePanelReducer(state: DraggablePanelState, action: DraggablePanelAction): DraggablePanelState {
  switch (action.type) {
    case "START_RESIZE": {
      return { ...state, isResizing: true, showExpand: false }
    }
    case "STOP_RESIZE": {
      return { ...state, isResizing: false, showExpand: true }
    }
    case "SET_SHOW_EXPAND": {
      return { ...state, showExpand: action.payload }
    }
    default: {
      return state
    }
  }
}

export const DraggablePanel = memo<DraggablePanelProps>(
  ({
    headerHeight = 0,
    fullscreen,
    maxHeight,
    pin = DEFAULT_PIN,
    mode = "fixed",
    children,
    placement = "right",
    resize,
    style,
    showBorder = true,
    showHandleHighlight = false,
    backgroundColor,
    size,
    defaultSize: customizeDefaultSize,
    minWidth,
    minHeight,
    maxWidth,
    onSizeChange,
    onSizeDragging,
    expand,
    defaultExpand = DEFAULT_EXPAND,
    onExpandChange,
    className,
    destroyOnClose,
    styles: customStyles,
    classNames,
    dir,
  }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isHovering = useHover(ref)
    const isVertical = placement === "top" || placement === "bottom"
    const [isPending, startTransition] = useTransition()

    // Use ref for hover timeout to avoid memory leaks
    const hoverTimeoutRef = useRef<any>(undefined)



    const cssVariables = useMemo<Record<string, string>>(
      () => ({
        "--draggable-panel-bg": backgroundColor || "",
        "--draggable-panel-header-height": `${headerHeight}px`,
      }),
      [backgroundColor, headerHeight],
    )

    const [isExpand, setIsExpand] = useControlledState(defaultExpand, {
      onChange: onExpandChange,
      value: expand,
    })

    // Initialize state with useReducer for better performance
    const initialState: DraggablePanelState = {
      isResizing: false,
      showExpand: true,
    }

    const [state, dispatch] = useReducer(draggablePanelReducer, initialState)

    // Auto-expand on hover if not pinned with optimized transition
    useEffect(() => {
      if (pin) return

      // Clear previous timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      if (!isExpand) {
        // Delay collapse
        hoverTimeoutRef.current = setTimeout(() => {
          startTransition(() => {
            setIsExpand(false)
          })
        }, 150)
      } else {
        startTransition(() => {
          setIsExpand(true)
        })
      }
    }, [pin, isExpand])

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
      }
    }, [])

    const canResizing = resize !== false && isExpand

    // Configure resizing handles
    const resizing = useMemo(
      () => ({
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false,
        [reversePlacement(placement)]: true,
        ...(resize as Enable),
      }),
      [placement, resize],
    )

    // Calculate default size based on orientation
    const defaultSize: Size = useMemo(() => {
      if (isVertical)
        return {
          height: 180,
          width: "100%",
          ...customizeDefaultSize,
        }

      return {
        height: "100%",
        width: 280,
        ...customizeDefaultSize,
      }
    }, [isVertical, customizeDefaultSize])

    // Determine appropriate size props based on expand state
    const sizeProps = useMemo(() => {
      if (!isExpand) {
        return isVertical ? { minHeight: 0, size: { height: 0 } } : { minWidth: 0, size: { width: 0 } }
      }

      return {
        defaultSize,
        maxHeight: typeof maxHeight === "number" ? Math.max(maxHeight, 0) : maxHeight,
        maxWidth: typeof maxWidth === "number" ? Math.max(maxWidth, 0) : maxWidth,
        minHeight: typeof minHeight === "number" ? Math.max(minHeight, 0) : minHeight,
        minWidth: typeof minWidth === "number" ? Math.max(minWidth, 0) : minWidth,
        size: size as Size,
      }
    }, [isExpand, isVertical, defaultSize, maxHeight, maxWidth, minHeight, minWidth, size])

    // Handle resize events with memoization
    const handleResize = useCallback(
      (_: unknown, _direction: unknown, reference_: HTMLElement, delta: NumberSize) => {
        onSizeDragging?.(delta, {
          height: reference_.style.height,
          width: reference_.style.width,
        })
      },
      [onSizeDragging],
    )

    const handleResizeStart = useCallback(() => {
      dispatch({ type: "START_RESIZE" })
    }, [])

    const handleResizeStop = useCallback(
      (e: unknown, direction: unknown, reference_: HTMLElement, delta: NumberSize) => {
        dispatch({ type: "STOP_RESIZE" })
        onSizeChange?.(delta, {
          height: reference_.style.height,
          width: reference_.style.width,
        })
      },
      [onSizeChange],
    )

    // Main panel content
    const inner = useMemo(
      () => (
        <Resizable
          data-part={"draggable-panel-inner"}
          {...sizeProps}
          className={cx(styles.panel, classNames?.content)}
          enable={canResizing ? (resizing as Enable) : undefined}
          handleClasses={
            canResizing
              ? {
                  [reversePlacement(placement)]: cx(
                    handleVariants({
                      placement: reversePlacement(placement),
                    }),
                    showHandleHighlight && styles.handleHighlight,
                  ),
                }
              : {}
          }
          style={{
            ...cssVariables,
            opacity: isPending ? 0.95 : 1,
            transition: state.isResizing ? "unset" : undefined,
            ...style,
          }}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          {children}
        </Resizable>
      ),
      [
        sizeProps,
        styles.panel,
        classNames?.content,
        canResizing,
        resizing,
        placement,
        handleVariants,
        showHandleHighlight,
        styles.handleHighlight,
        handleResize,
        handleResizeStart,
        handleResizeStop,
        state.isResizing,
        isPending,
        style,
        children,
        cx,
      ],
    )

    // For fullscreen mode, return a simpler layout
    if (fullscreen) {
      return (
        <div className={cx(styles.fullscreen, className)} style={cssVariables}>
          {children}
        </div>
      )
    }

    return (
      <div
        data-part={"draggable-panel-root"}
        dir={dir}
        ref={ref}
        style={cssVariables}
        className={cx(
          panelVariants({
            isExpand,
            mode,
            placement: placement,
            showBorder,
          }),
          className,
        )}
      >
        {destroyOnClose ? isExpand && inner : inner}
      </div>
    )
  },
  isEqual,
)
