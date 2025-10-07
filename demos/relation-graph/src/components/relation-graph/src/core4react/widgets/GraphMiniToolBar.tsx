'use client'

import React, { useContext } from "react"
import { RelationGraphStoreContext, RGUpdateSingalContext } from "#components"
import { IconButton, Text, Flex, chakra } from "@chakra-ui/react"
import { BiScreenshot as DownloadIcon } from "react-icons/bi"
import { TbReload as RefreshIcon } from "react-icons/tb"
import { MdOutlineMotionPhotosAuto as AutoIcon, MdZoomOutMap as FullScreenIcon } from "react-icons/md"
import { RiZoomInLine as ZoonInIcon, RiZoomOutLine as ZoomOutIcon } from "react-icons/ri"

export const GraphMiniToolBar = ({ children }: any) => {
  const relationGraph: any = useContext(RelationGraphStoreContext)
  const updateSingal = useContext(RGUpdateSingalContext)
  const refresh = async () => {
    await relationGraph.refresh()
    relationGraph.dataUpdated()
  }
  const updateViewLoop = () => {
    if (relationGraph.options.autoLayouting) {
      relationGraph.dataUpdated()
      requestAnimationFrame(() => {
        updateViewLoop()
      })
    }
  }
  const toggleAutoLayout = () => {
    relationGraph.toggleAutoLayout()
    // updateViewLoop();
  }
  const toogleFullScreen = async () => {
    await relationGraph.fullscreen()
    relationGraph.dataUpdated()
  }
  const downloadAsImage = () => {
    relationGraph.downloadAsImage("png")
  }
  const zoomToFit = async () => {
    const instance = relationGraph
    await instance.setZoom(100)
    await instance.moveToCenter()
    await instance.zoomToFit()
  }
  const addZoom = (buff: number) => {
    relationGraph.zoom(buff)
    relationGraph.dataUpdated()
  }
  const options = relationGraph && relationGraph.options
  return (
    <React.Fragment>
      <Flex
        zIndex={300}
        gap={2}
        position="absolute"
        boxShadow="sm"
        borderRadius="sm"
        justifyContent="center"
        alignItems="center"
        css={{
          ...(options.toolBarDirection === "h"
            ? {
                flexDirection: "row",
                left: "50%",
                transform: "translateX(-50%)",
                paddingX: 2,
                paddingY: 1,
              }
            : {
                flexDirection: "column",
                top: "50%",
                transform: "translateY(-50%)",
                paddingX: 1,
                paddingY: 2,
              }),
          [options.toolBarPositionH]: 4,
          [options.toolBarPositionV]: 4,
        }}
      >
        {options.allowShowFullscreenMenu && (
          <IconButton
            title="Toggle full screen"
            size="sm"
            variant="ghost"
            onClick={() => {
              toogleFullScreen()
            }}
          >
            <FullScreenIcon />
          </IconButton>
        )}
        {options.allowShowZoomMenu && (
          <React.Fragment>
            <IconButton
              title="Zoom In"
              size="sm"
              variant="ghost"
              onClick={() => {
                addZoom(20)
              }}
            >
              <ZoonInIcon />
            </IconButton>

            <IconButton
              title="Zoom In"
              size="sm"
              variant="ghost"
              onClick={() => {
                zoomToFit()
              }}
            >
              <Text textStyle="2xs">{options.canvasZoom}%</Text>
            </IconButton>

            <IconButton
              title="Zoom Out"
              size="sm"
              variant="ghost"
              onClick={() => {
                addZoom(-20)
              }}
            >
              <ZoomOutIcon />
            </IconButton>
          </React.Fragment>
        )}

        {options.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton && (
          <IconButton
            disabled={!!options.autoLayouting}
            title="Auto Layout"
            size="sm"
            variant="ghost"
            onClick={() => {
              toggleAutoLayout()
            }}
          >
            <AutoIcon />
          </IconButton>
        )}
        {options.allowShowRefreshButton && (
          <IconButton
            title="Refresh"
            size="sm"
            variant="ghost"
            onClick={() => {
              refresh()
            }}
          >
            <RefreshIcon />
          </IconButton>
        )}
        {options.allowShowDownloadButton && (
          <IconButton
            title="Snapshot"
            size="sm"
            variant="ghost"
            onClick={() => {
              downloadAsImage()
            }}
          >
            <DownloadIcon />
          </IconButton>
        )}
        {children}
        <chakra.div css={{ clear: "both" }}></chakra.div>
      </Flex>
    </React.Fragment>
  )
}
//@ts-ignore
export default GraphMiniToolBar
