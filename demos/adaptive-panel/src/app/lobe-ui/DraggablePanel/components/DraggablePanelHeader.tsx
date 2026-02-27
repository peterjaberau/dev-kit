'use client';

import { cx } from 'antd-style';
import { PanelLeft, Pin, PinOff } from 'lucide-react';
import React, { memo } from 'react';
import useControlledState from 'use-merge-value';

import { IconButton } from "@chakra-ui/react"
import { Flexbox } from "react-layout-kit"
import { type DivProps } from '../type';

import { styles } from './style';

export interface DraggablePanelHeaderProps extends Omit<DivProps, 'children'> {
  pin?: boolean;
  position?: 'left' | 'right' | 'bottom' | 'top';
  setExpand?: (expand: boolean) => void;
  setPin?: (pin: boolean) => void;
  title?: string;
}

export const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { pin, setPin, className, setExpand, title, position = "left", ...rest } = props

  const [isPinned, setIsPinned] = useControlledState(false, {
    onChange: setPin,
    value: pin,
  })

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
    <Flexbox
      data-part={"draggable-panel-header"}
      horizontal
      align={"center"}
      className={cx(styles.header, className)}
      flex={"none"}
      gap={8}
      justify={"space-between"}
      {...rest}
    >
      {position === "left" ? panelIcon : pinIcon}
      {title}
      {position === "left" ? pinIcon : panelIcon}
    </Flexbox>
  )
})

