"use client"
import React, { memo } from "react"
import { Flexbox } from "react-layout-kit"
import { DraggablePanelFooterProps } from "./types"
import { usePanelInnerStyles } from "./style"

const DraggablePanelFooter = memo<DraggablePanelFooterProps>(({ className, ...rest }) => {
  const { cx, styles } = usePanelInnerStyles()
  return (
    <Flexbox
      data-part={"draggable-panel-footer"}
      align={"center"}
      className={cx(styles.footer, className)}
      flex={"none"}
      gap={8}
      horizontal
      justify={"flex-start"}
      {...rest}
    />
  )
})

export default DraggablePanelFooter
