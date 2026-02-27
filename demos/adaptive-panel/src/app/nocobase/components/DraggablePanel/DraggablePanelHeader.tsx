"use client"
import { PanelLeft, Pin, PinOff, PanelRight, PanelBottom, PanelTop } from "lucide-react"
import React, { memo } from "react"
import { Flexbox } from "react-layout-kit"
import { IconButton } from "@chakra-ui/react"
import { DraggablePanelHeaderProps } from "./types"
import useControlledState from "use-merge-value"
import { usePanelInnerStyles } from "./style"

const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { pin, setPin, className, setExpand, title, position = "left", placement, ...rest } = props
  const { cx, styles } = usePanelInnerStyles()

  const [isPinned, setIsPinned] = useControlledState(false, {
    onChange: setPin,
    value: pin,
  })

  const panelIcon = React.useMemo(() => {
    if (placement === "right") {
      return <IconButton   onClick={() => setExpand?.(true)} size='xs' variant={'ghost'} >
        <PanelRight />
      </IconButton>
    }
    if (placement === "left") {
      return <IconButton  onClick={() => setExpand?.(true)} size="xs" variant={"ghost"} ><PanelLeft /></IconButton>
    }
    if (placement === "bottom") {
      return <IconButton  onClick={() => setExpand?.(true)} size="xs" variant={"ghost"}><PanelBottom/></IconButton>
    }
    if (placement === "top") {
      return <IconButton  onClick={() => setExpand?.(true)} size="xs" variant={"ghost"} ><PanelTop/></IconButton>
    }
    return null
  }, [className])

  const pinIcon = (
    <IconButton
      onClick={() => setIsPinned(!isPinned)}
      size={'xs'}
      variant={pin ? "subtle" : "ghost"}
    >
        {pin ? <Pin /> : <PinOff />}
    </IconButton>
  )
  return (
    <Flexbox
      data-part={"draggable-panel-header"}
      align={"center"}
      className={cx(styles.header, className)}
      flex={"none"}
      gap={8}
      horizontal
      justify={"space-between"}
      {...rest}
    >
      {position === "left" ? panelIcon : pinIcon}
      {title} {className}
      {position === "left" ? pinIcon : panelIcon}
    </Flexbox>
  )
})

export default DraggablePanelHeader
