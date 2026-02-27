"use client"
import React, { memo } from "react"
import { Flexbox } from "react-layout-kit"
import { DraggablePanelBodyProps } from "./types"
import { usePanelInnerStyles } from "./style"

const DraggablePanelBody = memo<DraggablePanelBodyProps>(({ className, ...rest }) => {
  const { cx, styles } = usePanelInnerStyles()
  return <Flexbox data-part={"draggable-panel-body"} className={cx(styles.body, className)} flex={1} {...rest} />
})

export default DraggablePanelBody
