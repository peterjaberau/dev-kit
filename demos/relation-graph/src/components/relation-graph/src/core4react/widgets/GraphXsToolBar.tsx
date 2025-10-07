'use client'
import React, { useContext, useEffect } from "react"
import { RGToolBarProps } from "#models-core/types"
import { RelationGraphStoreContext, RGUpdateSingalContext } from "#components"
import { IconButton, Text, Flex, chakra } from "@chakra-ui/react"
import { MdOutlineMotionPhotosAuto as AutoIcon, MdZoomOutMap as FullScreenIcon } from "react-icons/md"
import { RiZoomInLine as ZoonInIcon, RiZoomOutLine as ZoomOutIcon } from "react-icons/ri"

const GraphXsToolBar: React.FC<RGToolBarProps> = ({ direction = "h", positionH = "left", positionV = "bottom" }) => {
  const relationGraph: any = useContext(RelationGraphStoreContext)
  const updateSingal = useContext(RGUpdateSingalContext)
  const options = relationGraph && relationGraph.options

  const toggleAutoLayout = () => {
    relationGraph?.toggleAutoLayout()
  }

  const zoomToFit = async () => {
    if (relationGraph) {
      await relationGraph.setZoom(100)
      await relationGraph.moveToCenter()
      await relationGraph.zoomToFit()
    }
  }

  const doZoom = async (value: number) => {
    await relationGraph?.zoom(value)
  }

  const fullscreen = async () => {
    await relationGraph?.fullscreen()
  }

  useEffect(() => {
    // Equivalent to onMounted in Vue
    // console.log('Component mounted');
  }, [])

  return (
    <Flex
      css={{
        ...(direction === "h"
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
        [positionH]: 4,
        [positionV]: 4,
      }}
    >
      {options?.allowShowFullscreenMenu && (
        <IconButton title="Toggle full screen" size="sm" variant="ghost" onClick={fullscreen}>
          <FullScreenIcon />
        </IconButton>
      )}
      {options?.allowShowZoomMenu && (
        <React.Fragment>
          <IconButton
            title="Zoom In"
            size="sm"
            variant="ghost"
            onClick={() => {
              doZoom(20)
            }}
          >
            <ZoonInIcon />
          </IconButton>

          <IconButton
            title="Zoom In"
            size="sm"
            variant="ghost"
            onClick={() => {
              zoomToFit
            }}
          >
            <Text textStyle="2xs">{options.canvasZoom}%</Text>
          </IconButton>

          <IconButton
            title="Zoom Out"
            size="sm"
            variant="ghost"
            onClick={() => {
              doZoom(-20)
            }}
          >
            <ZoomOutIcon />
          </IconButton>
        </React.Fragment>
      )}
      {options?.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton && (
        <IconButton
          disabled={!!options.autoLayouting}
          title="Auto Layout"
          size="sm"
          variant="ghost"
          onClick={toggleAutoLayout}
        >
          <AutoIcon />
        </IconButton>
      )}
      <chakra.div css={{ clear: "both" }}></chakra.div>
    </Flex>
  )
}

export default GraphXsToolBar
