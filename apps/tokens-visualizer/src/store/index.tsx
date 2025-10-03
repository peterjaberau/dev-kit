import { createStoreHook } from "@xstate/store/react"

export const config : any = {
  layout: {
    constants: {
      GRAPH_COLUMN_WIDTH: 650,
      GRAPH_ROW_HEIGHT: 20,
      GRAPH_NODE_WIDTH: 450,
      GRAPH_NODE_HEIGHT: 20,
      GRAPH_NODE_VALUE_HEIGHT: 16,
      GRAPH_NODE_VALUE_MARGIN: 2,
      GRAPH_NODE_VALUES_PADDING: 3,
      GRAPH_ROW_MARGIN: 4,
      MINIMUM_CANVAS_RENDER_SCALE: 0.1,
      MAXIMUM_CANVAS_RENDER_SCALE: 2,
      HEADER_HEIGHT: 55,
      SIDEBAR_WIDTH: 250,
      ORDERED_TOKEN_FILTER_CATEGORIES: ["theme", "color", "scale"],
      CATEGORIZED_TOKEN_FILTERS: {
        theme: ["spectrum"],
        color: ["light", "dark", "wireframe"],
        scale: ["desktop", "mobile"],
      },
      CATEGORIZED_TOKEN_FILTER_LABELS: {
        theme: "Theme",
        color: "Color Theme",
        scale: "Scale",
      },
    }
  },
  graphGrid: {
    constants: {
      maximumRepeatingTileSize: 200,
      cellFadeOutThresh: 50,
      lineWidth: 1,
    },
    props: {
      scale: 1,
      posx: 0,
      posy: 0,
      colorTheme: "paper",
      size: 7,
    }
  }
}

const graphGridConstants = config.graphGrid.constants
const graphGridDefaults = config.graphGrid.props





export const useStore: any = createStoreHook({
  context: {
    graphGrid: {
      isInitiated: false,  //after computing first load
      props: graphGridDefaults,
      colorThemeObj: {
        lineColorR: 167,
        lineColorG: 220,
        lineColorB: 240,
        backgroundColor: "#F5FFFA",
      },
      gridStylesObj: {
        backgroundImage: null,
        backgroundSize: null,
        backgroundPosition: null,
        opacity: null
      },
    },
    data: [],
    profile: {
      id: null,
    },
    count: 0,
    active: false,
  } as any,
  on: {
    setGraphGridInitials : (context: any, event: { colorTheme: string } | any) => {

      const { scale, posx, posy, colorTheme, size}: any = context.graphGrid.props


      let graphGraphGridStyles: any = generateGraphGridStyles({
        context: context.graphGrid,
      })



      return {
        ...context,
        graphGrid: {
          ...context.graphGrid,
          isInitiated: true,
        }
      }
    },


    setGraphGridDefaults: (context: any, event: { colorTheme: string } | any) => {
      const { colorTheme } = event
      let result = {}

      switch (colorTheme) {
        case "dark":
          result = {
            lineColorR: 40,
            lineColorG: 40,
            lineColorB: 40,
            backgroundColor: "#000000",
          }
        case "light":
        case "wireframe":
          result = {
            lineColorR: 230,
            lineColorG: 230,
            lineColorB: 230,
            backgroundColor: "#FFFFFF",
          }
        case "paper":
        default:
          result = {
            lineColorR: 167,
            lineColorG: 220,
            lineColorB: 240,
            backgroundColor: "#F5FFFA",
          }
      }

      return {
        ...context,
        graphGrid: {
          ...context.graphGrid,
          internal: {
            ...context.graphGrid.internal,
            colorThemeObj: result,
          },
        }
      }
    },


    setColorTheme: (context: any, event: { colorTheme: string } | any) => {
      const { colorTheme } = event
      let result = {}

      switch (colorTheme) {
        case "dark":
          result = {
            lineColorR: 40,
            lineColorG: 40,
            lineColorB: 40,
            backgroundColor: "#000000",
          }
        case "light":
        case "wireframe":
          result = {
            lineColorR: 230,
            lineColorG: 230,
            lineColorB: 230,
            backgroundColor: "#FFFFFF",
          }
        case "paper":
        default:
          result = {
            lineColorR: 167,
            lineColorG: 220,
            lineColorB: 240,
            backgroundColor: "#F5FFFA",
          }
      }

      return {
        ...context,
        graphGrid: {
          ...context.graphGrid,
          internal: {
            ...context.graphGrid.internal,
            colorThemeObj: result,
          },
        }
      }
    },


    inc: (context: any, event: { by: number }, enqueue: any) => {
      enqueue.emit.increased({ by: event.by })

      return {
        ...context,
        count: context.count + event.by,
      }
    },

    toggleActive: (context: any) => {
      return {
        ...context,
        active: !context.active,
      }
    },

    setToggle: (context: any, event: any) => {
      return {
        ...context,
        [event.key]: !context[event.key],
      }
    },
  },
  emits: {
    increased: (payload: { by: number }) => {
      console.log("--increased---", payload)
    },
    onActiveChange: (payload: any) => {
      console.log("--onActiveChange---", payload)
    },
    toggled: (payload: any) => {
      console.log("--toggled---", payload)
    },
  },
})

function nearestPowerOf2(n: number): number {
  if (n <= 0) return 1
  return 1 << (31 - Math.clz32(n))
}

const generateGraphGridStyles = ({context, event}: any) => {
  const { size, scale } = context.props
  const { maximumRepeatingTileSize, lineWidth } = graphGridConstants
  const baseScale = maximumRepeatingTileSize / (size * 4)

  const scaleDiff = scale / baseScale

  const cellSizePx = scaleDiff * maximumRepeatingTileSize

  let actualMaxTileSize = maximumRepeatingTileSize

  if (cellSizePx > maximumRepeatingTileSize) {
    actualMaxTileSize = cellSizePx
  }

  const cellCount = Math.min(16, nearestPowerOf2(actualMaxTileSize / cellSizePx))

  const tileSize = cellSizePx * cellCount

  const remainderRatio = Math.max(
    0,
    2 * ((actualMaxTileSize - actualMaxTileSize + tileSize) / actualMaxTileSize) - 0.5,
  )

  const lastHalfRemainder = Math.max(0, remainderRatio * 2 - 1)

  const dynamicCenterLineAlpha = 0.5 + 0.5 * lastHalfRemainder

  const gradientStops = Array.from({ length: cellCount }, (_, i) => {
    const lineIn = i * cellSizePx
    const lineOut = lineIn + lineWidth
    const transparentIn = lineOut
    const transparentOut = (i + 1) * cellSizePx

    let lineAlpha: number | any
    if (i === 0) {
    } else if (i % 8 === 0) {
      lineAlpha = 1
    } else if (i === cellCount / 2) {
      lineAlpha = dynamicCenterLineAlpha
    } else {
      lineAlpha = 0.5
    }

    const lineColor = `rgba(${lineColorR},${lineColorG},${lineColorB},${lineAlpha.toFixed(2)})`

    return `${lineColor} ${lineIn.toFixed(1)}px,
              ${lineColor} ${lineOut.toFixed(1)}px,
              transparent ${transparentIn.toFixed(1)}px,
              transparent ${transparentOut.toFixed(1)}px`
  }).join(", ")

  // when the cells get small, start making the entire grid more transparent
  const fadeOutRatio = Math.sqrt(Math.min(1, cellSizePx / cellFadeOutThresh))
  const opacity = 0.1 + 0.9 * fadeOutRatio // floor opacity of 0.1

}
