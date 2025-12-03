import {
  Card,
  Stack,
  Progress,
  SegmentGroup,
  Spinner,
  Icon,
  IconButton,
  Button,
  Container,
  Text,
  HStack,
  Status,
  CloseButton,
  Menu,
  Portal,
} from "@chakra-ui/react"
import { Tooltip } from "@dev-kit/components"
import { useMeasure, useToggle } from "react-use"
import { PanelChromeProps } from "./types"
import { useElementSelection } from "#components/ui-extended/components/ElementSelectionContext/ElementSelectionContext"
import { usePointerDistance } from "#components/ui-extended/utils/usePointerDistance"
import { PiWarning as WarningIcon } from "react-icons/pi"
import { LuEllipsisVertical as ActionsMenuIcon } from "react-icons/lu"
import { FaCaretDown as CaretDownIcon, FaCaretRight as CaretRightIcon } from "react-icons/fa6"
import { useId, useState, useCallback, CSSProperties } from "react"
import { newPanelPadding } from "#components/ui-extended/PanelChrome/config"

export const PanelActionSegment = () => {
  return (
    <SegmentGroup.Root size="sm" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
export const PanelActionButton = () => {
  return (
    <Button size="sm" variant="outline">
      Breakdown
    </Button>
  )
}
export const PanelActionButtonIcon = () => {
  return <CloseButton size="sm" />
}

interface PanelActionMenuItem {
  icon?: any
  label?: string | any
  value?: string
  onClick?: () => void
}

interface PanelActionMenuItems {
  items: PanelActionMenuItem[]
}

export const PanelActionMenu = ({ items }: PanelActionMenuItems) => {
  return (
    <Menu.Root >
      <Menu.Trigger asChild>
        <IconButton size="sm" variant="outline">
          <ActionsMenuIcon />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {items.map((item: any) => (
              <Menu.Item key={item.value} value={item.value} onClick={item.onClick}>
                {item.label || item.value}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
export const PanelContentPlaceholder = () => {
  return (
    <Stack alignItems="center" justifyContent="center" backgroundColor="bg.subtle" minH="100px">
      <Text>Content placeholder</Text>
    </Stack>
  )
}
export const PanelLoaderProgress = () => {
  return (
    <Progress.Root height="1px" value={null}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}

export const PanelCollapseIndicator = ({ collapsed }: any) => {
  return (
    <IconButton size="sm" variant="plain">
      {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
    </IconButton>
  )
}

export const PanelChromeApp = ({
  width,
  height,
  children,
  padding = "md",
  title = "",
  description = "",
  displayMode = "default",
  titleItems,
  menuItems,
  dragClass,
  dragClassCancel,
  hoverHeader = false,
  hoverHeaderOffset,
  loadingState,
  statusMessage,
  statusMessageOnClick,
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
}: PanelChromeProps | any) => {




  const panelContentId = useId()
  const panelTitleId = useId().replace(/:/g, "_")
  const { isSelected, onSelect, isSelectable } = useElementSelection(selectionId)
  const pointerDistance = usePointerDistance()
  const [subHeaderRef, { height: measuredSubHeaderHeight }] = useMeasure<HTMLDivElement>()

  const hasHeader = !hoverHeader

  const [isOpen, toggleOpen] = useToggle(true)

  // Highlight the full panel when hovering over header
  const [selectableHighlight, setSelectableHighlight] = useState(false)
  const onHeaderEnter = useCallback(() => setSelectableHighlight(true), [])
  const onHeaderLeave = useCallback(() => setSelectableHighlight(false), [])

  // if collapsed is not defined, then component is uncontrolled and state is managed internally
  if (collapsed === undefined) {
    collapsed = !isOpen
  }

  // hover menu is only shown on hover when not on touch devices
  const showOnHoverClass = showMenuAlways ? "always-show" : "show-on-hover"
  const isPanelTransparent = displayMode === "transparent"

  const headerStyles: CSSProperties = {
    cursor: dragClass ? "move" : "auto",
  }

  const containerStyles: CSSProperties = { width, height: collapsed ? undefined : height }
  const [ref, { width: loadingBarWidth }] = useMeasure<HTMLDivElement>()

  // Handle drag & selection events
  // Mainly the tricky bit of differentiating between dragging and selecting
  const onPointerUp = useCallback(
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

  const onPointerDown = useCallback(
    (evt: React.PointerEvent) => {
      evt.stopPropagation()

      pointerDistance.set(evt)

      onDragStart?.(evt)
    },
    [pointerDistance, onDragStart],
  )

  return (
    <>
      <PanelLoaderProgress />
      <Card.Root
        css={{
          borderTopRadius: 0,
        }}
      >
        <Card.Header p={0}>
          <HStack w="full" py={1}>
            <HStack flex={1}>
              <PanelCollapseIndicator collapsed={collapsed} />
              <Tooltip content="Error text">
                <IconButton size="xs" variant="plain" colorPalette="red">
                  <WarningIcon />
                </IconButton>
              </Tooltip>

              <Text>Default title</Text>
              <Status.Root>
                <Status.Indicator />
              </Status.Root>
            </HStack>
            <HStack px={2}>
              <PanelActionSegment />
              <PanelActionButton />
              <PanelActionButtonIcon />
              <PanelActionMenu items={menuItems} />

              <Spinner size="sm" />
            </HStack>
          </HStack>
        </Card.Header>
        <Card.Body p={2}>
          <PanelContentPlaceholder />
        </Card.Body>
      </Card.Root>
    </>
  )
}
