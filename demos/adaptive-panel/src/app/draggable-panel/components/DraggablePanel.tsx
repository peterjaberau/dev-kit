"use client"

import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useTransition } from "react"
import { useHover } from "ahooks"
import useControlledState from "use-merge-value"
import isEqual from "fast-deep-equal"
import { Resizable } from "re-resizable"

import { DEFAULT_PIN, DEFAULT_EXPAND } from "./constants"
import { reversePlacement, draggablePanelReducer } from "./utils"

import type { Enable, NumberSize, Size } from "re-resizable"
import { DraggablePanelProps, DraggablePanelHeaderProps, DraggablePanelState } from "./types"

import { IconButton, chakra, useSlotRecipe } from "@chakra-ui/react"
import { PanelLeft, Pin, PinOff } from "lucide-react"


import { cx } from "antd-style"
import { handleVariants, panelVariants, styles } from "./style"
import { stylesRecipe } from "./recipe"

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

export const DraggablePanelBody = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe()
  return <chakra.div data-part={"draggable-panel-body"} css={styles.body} {...rest} />
})

export const DraggablePanelContainer = memo(({ ...rest }: any) => {
  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe()
  return <chakra.div data-part={"draggable-panel-body"} css={styles.container} {...rest} />
})

export const DraggablePanelFooter = memo(({ ...rest }) => {
  const recipe = useSlotRecipe({ recipe: stylesRecipe })
  const styles = recipe()

  return <chakra.div css={styles.footer} {...rest} />
})

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

    const recipe = useSlotRecipe({ recipe: stylesRecipe })
    const stylesFromRecipe = recipe()

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
          data-transition-pending={isPending}
          data-transition-resizing={state.isResizing}
          {...sizeProps}
          className={cx(classNames?.content)}
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
            display: "flex",
            flexDirection: "column",
            ...(stylesFromRecipe.panel as any),
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
        // styles.panel,
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
        // style,
        children,
        cx,
      ],
    )

    // For fullscreen mode, return a simpler layout
    if (fullscreen) {
      // return <chakra.div css={stylesFromRecipe.root}>{children}</chakra.div>
      return (
        <div className={cx(styles.fullscreen, className)} style={cssVariables}>
          {children}
        </div>
      )
    }

    return (
      <chakra.div
        data-part={"draggable-panel-root"}
        dir={dir}
        ref={ref}
        // style={cssVariables}

        className={cx(
          panelVariants({
            isExpand,
            mode,
            placement: placement,
            showBorder,
          }),
          className,
        )}
        css={stylesFromRecipe.root}
      >
        {destroyOnClose ? isExpand && inner : inner}
      </chakra.div>
    )
  },
  isEqual,
)
