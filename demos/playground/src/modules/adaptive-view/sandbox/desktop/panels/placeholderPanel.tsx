"use client"

import { Text, chakra, Icon } from "@chakra-ui/react"
import { usePanelApi } from "../providers/PanelApiContext"
import * as React from "react"
import { LuFolderOpen } from 'react-icons/lu'


export const PlaceholderPanel = () => {
  const panelApi: any = usePanelApi()

  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        height: "100%",
        color: "fg.muted",
        fontSize: panelApi?.getParameters()?.position === "top" ? "13px" : "14px",
      }}
    >
      <Icon size="lg" color="fg.subtle">
        <LuFolderOpen />
      </Icon>
      <span>{panelApi?.getParameters()?.label as string}</span>
    </chakra.div>
  )

}