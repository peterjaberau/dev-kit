import { createMachine, assign, setup, fromCallback, enqueueActions } from "xstate"
import { config } from "./defaults"
import { nearestPowerOf2 } from "./helpers"

export const graphGridMachine = setup({
  types: {} as any,
  actions: {
    updateProps: assign(({ context, event }: any) => {
      return {
        ...context,
        props: {
          ...context.props,
          ...event,
        },
      }
    }),
    computeTheme: assign(({ context }) => {
      const { scale, posx, posy, colorTheme, size }: any = context.props

      let result = context.colorThemeObj

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

      context.colorThemeObj = result
    }),
    computeStyles: assign(({ context }: any) => {
      const { scale, posx, posy, colorTheme, size }: any = context.props
      const { maximumRepeatingTileSize, lineWidth, cellFadeOutThresh }: any = context.constants
      const { lineColorR, lineColorG, lineColorB, backgroundColor }: any = context.colorThemeObj

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

      context.gridStylesObj = {
        backgroundImage: `linear-gradient(to right, ${gradientStops}), linear-gradient(to bottom, ${gradientStops})`,
        backgroundSize: `${tileSize.toFixed(2)}px ${tileSize.toFixed(2)}px`,
        backgroundPosition: `${posx.toFixed(2)}px ${posy.toFixed(2)}px`,
        opacity: opacity,
      }
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "graph-grid",
  initial: "initiating",
  context: ({ input }: any) =>
    ({
      constants: config.graphGrid.constants,
      props: config.graphGrid.props,
      colorThemeObj: {
        lineColorR: null,
        lineColorG: null,
        lineColorB: null,
        backgroundColor: null,
      },
      gridStylesObj: {
        backgroundImage: null,
        backgroundSize: null,
        backgroundPosition: null,
        opacity: null,
      },
      ...input,
    }) as any,
  entry: enqueueActions(({ enqueue, check }: any) => {
    enqueue("computeTheme")
    enqueue("computeStyles")
  }),
  states: {
    ready: {
      on: {
        update: {
          actions: enqueueActions(({ enqueue, check }: any) => {
            enqueue("updateProps")
            enqueue("computeTheme")
            enqueue("computeStyles")
          }),
        },
      },
    },
  },
})

export const appMachine = setup({}).createMachine({
  context: (({ input }: any) => {
    return {
      ...input
    }
  })
});
