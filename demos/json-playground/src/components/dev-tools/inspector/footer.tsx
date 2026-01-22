'use client'
import { ForwardedRef, forwardRef, ReactNode } from "react"
import { chakra } from "@chakra-ui/react"

export interface InspectorFooterProps {
  children?: ReactNode
  hasFooterChildren: boolean
  canMove?: boolean
}

import { stopDragAndDrop } from "./utils"

const InspectorFooterImpl = (props: InspectorFooterProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, canMove } = props

  return (
    <chakra.div
      id="inspector-footer"
      css={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
        cursor: "auto",
        padding: "0 16px",
        // height: hasFooterChildren ? "auto" : "16px",
        flex: "none",
      }}
      onMouseDown={stopDragAndDrop}
      ref={ref}
    >
      {children}
    </chakra.div>
  )
}

export default forwardRef<HTMLDivElement, InspectorFooterProps>(InspectorFooterImpl)
