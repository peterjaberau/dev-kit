"use client"
import { useHover } from "ahooks"
import { ConfigProvider } from "antd"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import type { Enable, NumberSize, Size } from "re-resizable"
import { HandleClassName, Resizable } from "re-resizable"
import React, { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Center } from "react-layout-kit"
import useControlledState from "use-merge-value"
import { DraggablePanelProps } from "./types"
import { usePanelStyles } from "./style"
import { reversePlacement } from "./utils"
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants"
import { chakra } from "@chakra-ui/react"

const DraggablePanel = memo<DraggablePanelProps>(
  ({
    headerHeight = 0,
    fullscreen,
    maxHeight,
    pin = true,
    mode = "fixed",
    children,
    placement = "right",
    resize,
    style,
    showHandlerWideArea = true,
    size,
    defaultSize: customizeDefaultSize,
    minWidth,
    minHeight,
    maxWidth,
    onSizeChange,
    onSizeDragging,
    expandable = true,
    expand,
    defaultExpand = true,
    onExpandChange,
    className,
    showHandlerWhenUnexpand,
    destroyOnClose,
    hanlderStyle,
    handlerStyle,
    classNames = {},
    dir,
  }) => {
    const reference: any = useRef(null)
    const isHovering = useHover(reference)
    const isVertical = placement === "top" || placement === "bottom"

    // inherit direction from Ant Design ConfigProvider
    const { direction: antdDirection } = useContext(ConfigProvider.ConfigContext)
    const direction = dir ?? antdDirection

    let internalPlacement: any = placement
    // reverse the placement when dir is rtl
    if (direction === "rtl" && ["left", "right"].includes(placement)) {
      internalPlacement = internalPlacement === "left" ? "right" : "left"
    }

    const { styles, cx }: any = usePanelStyles({ headerHeight, showHandlerWideArea })

    const [isExpand, setIsExpand] = useControlledState(defaultExpand, {
      onChange: onExpandChange,
      value: expand,
    })

    useEffect(() => {
      if (pin) return

      if (isHovering && !isExpand) {
        setIsExpand(true)
      } else if (!isHovering && isExpand) {
        setIsExpand(false)
      }
    }, [pin, isHovering, isExpand])

    const [showExpand, setShowExpand] = useState(true)
    const [isResizing, setIsResizing] = useState(false)
    const canResizing = resize !== false && isExpand

    const resizeHandleClassNames: HandleClassName = useMemo(() => {
      if (!canResizing) return {}

      return {
        [reversePlacement(internalPlacement)]: styles[`${reversePlacement(internalPlacement)}Handle`],
      }
    }, [canResizing, internalPlacement])

    const resizing = {
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
      [reversePlacement(internalPlacement)]: true,
      ...(resize as Enable),
    }

    const defaultSize: Size = useMemo(() => {
      if (isVertical)
        return {
          height: DEFAULT_HEIGHT,
          width: "100%",
          ...customizeDefaultSize,
        }

      return {
        height: "100%",
        width: DEFAULT_WIDTH,
        ...customizeDefaultSize,
      }
    }, [isVertical])

    const sizeProps = isExpand
      ? {
          defaultSize,
          maxHeight: typeof maxHeight === "number" ? Math.max(maxHeight, 0) : maxHeight,
          maxWidth: typeof maxWidth === "number" ? Math.max(maxWidth, 0) : maxWidth,
          minHeight: typeof minHeight === "number" ? Math.max(minHeight, 0) : minHeight,
          minWidth: typeof minWidth === "number" ? Math.max(minWidth, 0) : minWidth,
          size: size as Size,
        }
      : isVertical
        ? {
            minHeight: 0,
            size: { height: 0 },
          }
        : {
            minWidth: 0,
            size: { width: 0 },
          }

    const { Arrow, className: arrowPlacement }: any = useMemo(() => {
      switch (internalPlacement) {
        case "top": {
          return { Arrow: ChevronDown, className: "Bottom" }
        }
        case "bottom": {
          return { Arrow: ChevronUp, className: "Top" }
        }
        case "right": {
          return { Arrow: ChevronLeft, className: "Left" }
        }
        case "left": {
          return { Arrow: ChevronRight, className: "Right" }
        }
      }
    }, [styles, internalPlacement])

    const handler = (
      <Center
        // @ts-ignore
        className={cx(styles[`toggle${arrowPlacement}`], classNames.handle)}
        style={{ opacity: isExpand ? (pin ? undefined : 0) : showHandlerWhenUnexpand ? 1 : 0 }}
      >
        <Center
          onClick={() => {
            setIsExpand(!isExpand)
          }}
          style={handlerStyle || hanlderStyle}
        >
          <div className={styles.handlerIcon} style={{ transform: `rotate(${isExpand ? 180 : 0}deg)` }}>
            <Arrow size={16} strokeWidth={1.5} />
          </div>
        </Center>
      </Center>
    )

    const inner = (
      // @ts-ignore
      <Resizable
        {...sizeProps}
        className={cx(styles.panel, classNames.content)}
        enable={canResizing ? (resizing as Enable) : undefined}
        handleClasses={resizeHandleClassNames}
        onResize={(_, direction, reference_, delta) => {
          onSizeDragging?.(delta, {
            height: reference_.style.height,
            width: reference_.style.width,
          })
        }}
        onResizeStart={() => {
          setIsResizing(true)
          setShowExpand(false)
        }}
        onResizeStop={(e, direction, reference_, delta) => {
          setIsResizing(false)
          setShowExpand(true)
          onSizeChange?.(delta, {
            height: reference_.style.height,
            width: reference_.style.width,
          })
        }}
        style={{
          transition: isResizing ? "unset" : undefined,
          ...style,
        }}
      >
        {children}
      </Resizable>
    )

    if (fullscreen) return <div className={cx(styles.fullscreen, className)}>{children}</div>

    return (
      <aside
        data-part={"draggable-panel"}
        className={cx(
          styles.container,
          // @ts-ignore
          styles[mode === "fixed" ? "fixed" : `${internalPlacement}Float`],
          className,
        )}
        dir={dir}
        ref={reference}
        style={isExpand ? { [`border${arrowPlacement}Width`]: 1 } : {}}
      >
        {expandable && showExpand && handler}
        {destroyOnClose ? isExpand && inner : inner}
      </aside>
    )
  },
)

export default DraggablePanel
