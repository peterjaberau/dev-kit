"use client"
import Playground from "./index"
import { LuPlay } from "react-icons/lu"
import { useState } from "react"
import { IconButton } from "@chakra-ui/react"

export const PlaygroundTrigger = () => {
  const [isOpenPlaygroundPanel, setIsOpenPlaygroundPanel] = useState(false)

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

      {isOpenPlaygroundPanel && <Playground onClose={() => setIsOpenPlaygroundPanel(false)} />}
    </>
  )
}
