'use client'
import { FC, ReactNode } from "react"
import { chakra } from "@chakra-ui/react"
import { stopDragAndDrop } from "./utils"
import { ScrollArea } from "@chakra-ui/react"

export interface InspectorBodyProps {
  children: ReactNode
  footerHeight: number
}


export const InspectorBody: FC<InspectorBodyProps> = (props) => {
  const { children, footerHeight } = props
  return (
    <chakra.div
      id="inspector-body"
      css={{
        width: "100%",
        height: `calc(100% - 48px - ${`${footerHeight}px`})`,
        cursor: "auto",
        padding: "0",
        // overflowY: "auto",
      }}
      onMouseDown={stopDragAndDrop}
    >
      <ScrollArea.Root size={"sm"}>
        <ScrollArea.Viewport>
          <ScrollArea.Content p={4}>{children}</ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </chakra.div>
  )
}
