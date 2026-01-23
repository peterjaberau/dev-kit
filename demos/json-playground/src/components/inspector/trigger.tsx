"use client"
import { RootInspector } from "./root"
import { LuPlay } from "react-icons/lu"
import { useState } from "react"
import { IconButton } from "@chakra-ui/react"

export const InspectorTrigger = ({ children, title }: any) => {
  const [isOpenPlaygroundPanel, setIsOpenPlaygroundPanel] = useState(false)
  const [position, setPosition] = useState(() => {
    const width = 500
    const height = 600
    const padding = 100 // distance from the right edge
    const x = padding
    const y = 100

    return { x, y, width, height }
  })

  return (
    <>
      <IconButton
        variant="outline"
        css={{
          position: "fixed",
          top: "50%",
          left: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          boxShadow: "sm",
        }}
        onClick={() => setIsOpenPlaygroundPanel(true)}
      >
        <LuPlay />
      </IconButton>

      {isOpenPlaygroundPanel && (
        <RootInspector title={title} bodyContent={children} onClose={() => setIsOpenPlaygroundPanel(false)} />
      )}
    </>
  )
}
