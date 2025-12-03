import { CSSProperties, PropsWithChildren, ReactElement, ReactNode, useId, useState } from "react"
import * as React from "react"
import { Icon, Text, Progress, Container, chakra, IconButton, Spinner } from "@chakra-ui/react"
import { Tooltip } from "@dev-kit/components"
import { useMeasure, useToggle } from "react-use"
import { usePointerDistance } from "../utils/usePointerDistance"
import { useElementSelection } from "../components/ElementSelectionContext/ElementSelectionContext"
import { preventPanelChromeOverflow, newPanelPadding } from "./config"
import { HoverWidget } from "./HoverWidget"
import { PanelDescription } from "./PanelDescription"
import { PanelMenu } from "./PanelMenu"
import { PanelStatus } from "./PanelStatus"
import { TitleItem } from "./TitleItem"
import { LoadingState } from "./constants"
import { PanelChromeProps } from "./types"
import { FaCaretDown as CaretDownIcon, FaCaretRight as CaretRightIcon } from "react-icons/fa6"
import { FaCircle as CircleIcon } from "react-icons/fa"
import { DelayRender } from "#components/ui-utils/DelayRender"

const MaybeWrap = ({ children }: PropsWithChildren<{}>) => {
  return preventPanelChromeOverflow ? <Container>{children}</Container> : children
}

export type PanelPadding = "none" | "md"

export function PanelChrome({
  width,
  height,
  children,
  padding = "md",
  title = "",
  description = "",
  displayMode = "default",
  titleItems,
  menu,
  dragClass,
  dragClassCancel,
  hoverHeader = false,
  hoverHeaderOffset,
  loadingState,
  statusMessage,
  statusMessageOnClick,
  leftItems,
  actions,
  selectionId,
  onCancelQuery,
  onOpenMenu,
  collapsible = false,
  collapsed,
  onToggleCollapse,
  onFocus,
  onMouseMove,
  onMouseEnter,
  onDragStart,
  showMenuAlways = false,
  subHeaderContent,
}: PanelChromeProps) {
  const panelContentId = useId()
  const panelTitleId = useId().replace(/:/g, "_")
  const { isSelected, onSelect, isSelectable } = useElementSelection(selectionId)
  const pointerDistance = usePointerDistance()
  const [subHeaderRef, { height: measuredSubHeaderHeight }] = useMeasure<HTMLDivElement>()

  const hasHeader: boolean = !hoverHeader

  const [isOpen, toggleOpen] = useToggle(true)

  // Highlight the full panel when hovering over header
  const [selectableHighlight, setSelectableHighlight] = useState(false)
  const onHeaderEnter = React.useCallback(() => setSelectableHighlight(true), [])
  const onHeaderLeave = React.useCallback(() => setSelectableHighlight(false), [])

  // if collapsed is not defined, then component is uncontrolled and state is managed internally
  if (collapsed === undefined) {
    collapsed = !isOpen
  }

  // hover menu is only shown on hover when not on touch devices
  const showOnHoverClass = showMenuAlways ? "always-show" : "show-on-hover"
  const isPanelTransparent = displayMode === "transparent"

  const headerHeight = hasHeader ? 40 : 0
  const subHeaderHeight = Math.min(measuredSubHeaderHeight, headerHeight)
  const { contentStyle, innerWidth, innerHeight } = getContentStyle(
    padding,
    headerHeight,
    collapsed,
    subHeaderHeight,
    height,
    width,
  )

  const headerStyles: CSSProperties = {
    height: headerHeight,
    cursor: dragClass ? "move" : "auto",
  }

  const containerStyles: CSSProperties = { width, height: collapsed ? undefined : height }
  const [ref, { width: loadingBarWidth }] = useMeasure<HTMLDivElement>()

  // Handle drag & selection events
  // Mainly the tricky bit of differentiating between dragging and selecting
  const onPointerUp = React.useCallback(
    (evt: React.PointerEvent) => {
      if (
        pointerDistance.check(evt) ||
        (dragClassCancel && evt.target instanceof Element && evt.target.closest(`.${dragClassCancel}`))
      ) {
        return
      }

      // setTimeout is needed here because onSelect stops the event propagation
      // By doing so, the event won't get to the document and drag will never be stopped
      setTimeout(() => onSelect?.(evt))
    },
    [dragClassCancel, onSelect, pointerDistance],
  )

  const onPointerDown = React.useCallback(
    (evt: React.PointerEvent) => {
      evt.stopPropagation()

      pointerDistance.set(evt)

      onDragStart?.(evt)
    },
    [pointerDistance, onDragStart],
  )

  const onContentPointerDown = React.useCallback(
    (evt: React.PointerEvent) => {
      // Ignore clicks inside buttons, links, canvas and svg elments
      // This does prevent a clicks inside a graphs from selecting panel as there is normal div above the canvas element that intercepts the click
      if (evt.target instanceof Element && evt.target.closest("button,a,canvas,svg")) {
        return
      }

      onSelect?.(evt)
    },
    [onSelect],
  )

  const headerContent = (
    <>
      {/* Non collapsible title */}
      {!collapsible && title && (
        <chakra.div
          css={{
            display: "flex",
            minWidth: 0,
          }}
        >
          <Text fontWeight="medium" truncate title={typeof title === "string" ? title : undefined} id={panelTitleId}>
            {title}
          </Text>
        </chakra.div>
      )}

      {/* Collapsible title */}
      {collapsible && (
        <chakra.div
          css={{
            display: "flex",
            minWidth: 0,
          }}
        >
          <Text fontWeight="medium">
            <IconButton
              variant="plain"
              size="sm"
              onClick={() => {
                toggleOpen()
                if (onToggleCollapse) {
                  onToggleCollapse(!collapsed)
                }
              }}
              aria-expanded={!collapsed}
              aria-controls={!collapsed ? panelContentId : undefined}
            >
              {!collapsed ? <CaretDownIcon /> : <CaretRightIcon />}

              <Text fontWeight="medium" truncate id={panelTitleId}>
                {title}
              </Text>
            </IconButton>
          </Text>
        </chakra.div>
      )}

      {(titleItems || description) && (
        <chakra.div
          css={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
          className={dragClassCancel}
        >
          <PanelDescription description={description} className={dragClassCancel} />
          {titleItems}
        </chakra.div>
      )}

      {loadingState === LoadingState.Streaming && (
        <Tooltip content={onCancelQuery ? "Stop streaming" : "Streaming"}>
          <TitleItem className={dragClassCancel} onClick={onCancelQuery}>
            <Icon
              size="lg"
              css={{
                marginRight: 0,
                color: "fg.success",
              }}
            >
              <CircleIcon />
            </Icon>
          </TitleItem>
        </Tooltip>
      )}
      {loadingState === LoadingState.Loading && onCancelQuery && (
        <DelayRender delay={2000}>
          <Tooltip content="Cancel query">
            <TitleItem className={dragClassCancel} onClick={onCancelQuery}>
              <Spinner size="sm" />
            </TitleItem>
          </Tooltip>
        </DelayRender>
      )}
      {!hoverHeader && <chakra.div css={{ flexGrow: 1 }} />}
      {actions && itemsRenderer(actions, (item) => item)}
    </>
  )

  // Ignores streaming and loading (cancel query) states for simplicity
  // If you need to cancel streaming / loading panels set a title
  const hasHeaderContent = title || description || titleItems || menu || dragClass || actions

  return (
    <MaybeWrap>
      {/* tabIndex={0} is needed for keyboard accessibility in the plot area */}
      <chakra.section
        css={{
          backgroundColor: "bg.panel",
          border: "1px solid",
          borderColor: "border.emphasized",
          position: preventPanelChromeOverflow ? "unset" : "relative",
          borderRadius: "md",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: preventPanelChromeOverflow ? "hidden" : "initial",
          ...(showMenuAlways
            ? {
                background: "none",
                "&:focus-visible, &:hover": {
                  background: "bg.subtle",
                },
              }
            : {
                opacity: 0,
                visibility: "hidden",
                "&:focus-visible, &:hover": {
                  opacity: 1,
                  visibility: "visible",
                },

                "&:focus-visible": {
                  outline: "2px dotted transparent",
                  outlineOffset: "2px",
                  boxShadow: "md",
                  transitionTimingFunction: `cubic-bezier(0.19, 1, 0.22, 1)`,
                  transitionDuration: "0.2s",
                  transitionProperty: "outline, outline-offset, box-shadow",
                },

                "&:focus-within:not(:focus)": {
                  visibility: "visible",
                  opacity: "1",
                },
              }),

          ...(isPanelTransparent && {
            backgroundColor: "transparent",
            border: "1px solid transparent",
            boxSizing: "border-box",
            "&:hover": {
              border: "1px solid",
              borderColor: "border.emphasized",
            },
          }),

          ...(isSelected && {
            outline: "1px dashed",
            outlineOffset: "0px",
            borderRadius: "md",
          }),

          ...(!isSelected &&
            isSelectable &&
            selectableHighlight && {
              "&:hover": {
                outline: "1px dashed",
                outlineStyle: "solid",
                outlineOffset: "0px",
                borderRadius: "md",
                backgroundColor: "bg.subtle",
              },
            }),
          width: width,
          ...containerStyles,
        }}
        aria-labelledby={!!title ? panelTitleId : undefined}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onFocus={onFocus}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        ref={ref}
      >
        <chakra.div
          css={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 1,
          }}
        >
          {loadingState === LoadingState.Loading ? (
            <Progress.Root width={loadingBarWidth} value={null}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          ) : null}
        </chakra.div>

        {hoverHeader && (
          <>
            {hasHeaderContent && (
              <HoverWidget
                menu={menu}
                title={typeof title === "string" ? title : undefined}
                dragClass={dragClass}
                offset={hoverHeaderOffset}
                onOpenMenu={onOpenMenu}
              >
                {headerContent}
              </HoverWidget>
            )}

            {statusMessage && (
              <chakra.div
                css={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 1,
                }}
              >
                <PanelStatus message={statusMessage} onClick={statusMessageOnClick} ariaLabel="Panel status" />
              </chakra.div>
            )}
          </>
        )}

        {hasHeader && (
          <>
            <chakra.div
              css={{
                display: "flex",
                alignItems: "center",
                padding: newPanelPadding ? 2 : 1,
                gap: 1,
                height: headerHeight,
                cursor: dragClass ? "move" : "auto",
              }}
              className={dragClass}
              onPointerDown={onPointerDown}
              onMouseEnter={isSelectable ? onHeaderEnter : undefined}
              onMouseLeave={isSelectable ? onHeaderLeave : undefined}
              onPointerUp={onPointerUp}
            >
              {statusMessage && (
                <chakra.div className={dragClassCancel}>
                  <PanelStatus message={statusMessage} onClick={statusMessageOnClick} ariaLabel="Panel status" />
                </chakra.div>
              )}

              {headerContent}

              {menu && (
                <PanelMenu
                  menuItems={menu}
                  title={typeof title === "string" ? title : undefined}
                  placement="bottom-end"
                  menuButtonClass={dragClassCancel}
                  onOpenMenu={onOpenMenu}
                />
              )}
            </chakra.div>
            {!collapsed && subHeaderContent && (
              <chakra.div
                css={{
                  display: "flex",
                  alignItems: "center",
                  maxHeight: 8 * headerHeight,
                  padding: newPanelPadding ? 2 : 1,
                  overflow: "hidden",
                  gap: 1,
                }}
                ref={subHeaderRef}
              >
                {subHeaderContent}
              </chakra.div>
            )}
          </>
        )}

        {!collapsed && (
          <chakra.div
            id={panelContentId}
            css={{
              flexGrow: 1,
              contain: height === undefined ? "none" : "size layout",
              ...contentStyle,
            }}
            onPointerDown={onContentPointerDown}
          >
            {typeof children === "function" ? children(innerWidth, innerHeight) : children}
          </chakra.div>
        )}
      </chakra.section>
    </MaybeWrap>
  )
}

const itemsRenderer = (items: ReactNode[] | ReactNode, renderer: (items: ReactNode[]) => ReactNode): ReactNode => {
  const toRender = React.Children.toArray(items).filter(Boolean)
  return toRender.length > 0 ? renderer(toRender) : null
}

const getHeaderHeight = (hasHeader: boolean) => {
  const headerHeight: any = 40
  const gridSize: any = 8

  if (hasHeader) {
    if (newPanelPadding) {
      return gridSize * 5
    }

    return gridSize * headerHeight
  }

  return 0
}

const getContentStyle = (
  padding: string,
  headerHeight: number,
  collapsed: boolean,
  subHeaderHeight: number,
  height?: number,
  width?: number,
) => {
  const gridSize: any = 8
  const chromePadding = (padding === "md" ? 2 : 0) * gridSize

  const panelPadding = chromePadding * 2
  const panelBorder = 1 * 2

  let innerWidth = 0
  if (width) {
    innerWidth = width - panelPadding - panelBorder
  }

  let innerHeight = 0
  if (height) {
    innerHeight = height - headerHeight - panelPadding - panelBorder - subHeaderHeight
  }

  if (collapsed) {
    innerHeight = headerHeight
  }

  const contentStyle: CSSProperties = {
    padding: chromePadding,
  }

  return { contentStyle, innerWidth, innerHeight }
}
