import { chakra, IconButton } from "@chakra-ui/react"
import { LuComponent as ComponentsIcon, LuScanLine as ScanIcon } from "react-icons/lu"
import { TbRouteSquare as RoutesIcon } from "react-icons/tb"
import { SlSupport as ContextIcon } from "react-icons/sl"
import { PiGraphBold as GraphIcon } from "react-icons/pi"
import { MdOutlineViewTimeline as TimelineIcon } from "react-icons/md"
import { FiImage as AssetsIcon } from "react-icons/fi"
import { LuSettings as SettingsIcon } from "react-icons/lu"
import { BsPlugin as PlugnIcon } from "react-icons/bs"
import { useState } from "react"

export const Sidebar = ({ plugins = [] }: any) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleClick = (key: string) => {
    setSelectedKey(key)
  }

  return (
    <chakra.div
      css={{
        display: "flex",
        zIndex: 50,
        paddingTop: "1rem",
        paddingBottom: "1rem",
        flexDirection: "column",
        borderRightWidth: "1px",
        width: "3rem",
        height: "100%",
      }}
    >
      <chakra.div
        css={{
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
          flex: "1 1 0%",
          gap: "0.5rem",
        }}
      >
        <IconButton
          variant={selectedKey === "component" ? "surface" : "ghost"}
          onClick={() => handleClick("component")}
        >
          <ComponentsIcon />
        </IconButton>
        <IconButton variant={selectedKey === "routes" ? "surface" : "ghost"} onClick={() => handleClick("routes")}>
          <RoutesIcon />
        </IconButton>
        <IconButton variant={selectedKey === "context" ? "surface" : "ghost"} onClick={() => handleClick("context")}>
          <ContextIcon />
        </IconButton>
        <IconButton variant={selectedKey === "timeline" ? "surface" : "ghost"} onClick={() => handleClick("timeline")}>
          <TimelineIcon />
        </IconButton>
        <IconButton variant={selectedKey === "assets" ? "surface" : "ghost"} onClick={() => handleClick("assets")}>
          <AssetsIcon />
        </IconButton>
        <IconButton variant={selectedKey === "graph" ? "surface" : "ghost"} onClick={() => handleClick("graph")}>
          <GraphIcon />
        </IconButton>
        <IconButton variant={selectedKey === "scan" ? "surface" : "ghost"} onClick={() => handleClick("scan")}>
          <ScanIcon />
        </IconButton>

        {plugins.map((plugin: any, index: any) => (
          <IconButton variant={"ghost"} key={index}>
            <PlugnIcon />
          </IconButton>
        ))}
      </chakra.div>
      <chakra.div
        css={{
          display: "flex",
          paddingTop: "0.5rem",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <IconButton variant={selectedKey === "settings" ? "surface" : "ghost"} onClick={() => handleClick("settings")}>
          <SettingsIcon />
        </IconButton>
      </chakra.div>
    </chakra.div>
  )
}

export const ClientApp = ({ children }: any) => {
  return (
    <chakra.div
      css={{
        display: "flex",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        fontSize: "1rem",
        lineHeight: "1.5rem",
      }}
    >
      <Sidebar plugins={[]} />
      <chakra.div
        css={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          flex: "1 1 0%",
          minWidth: "0",
          backgroundColor: "#F9FAFB",
        }}
      >
        {children}
      </chakra.div>
    </chakra.div>
  )
}
