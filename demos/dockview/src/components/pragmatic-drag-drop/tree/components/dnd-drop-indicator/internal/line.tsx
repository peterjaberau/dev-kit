import { chakra, defineRecipe, useRecipe } from "@chakra-ui/react"
import {
  LineProps
} from '../types'


const lineRecipe = defineRecipe({
  className: "line",
  base: {
    '--indent': '0px',
    display: "block",
    position: "absolute",
    zIndex: 1,
    pointerEvents: "none",
    backgroundColor: "var(--stroke-color)",

    "&::before": {
      display: "var(--terminal-display)",
      content: '""',
      position: "absolute",
      boxSizing: "border-box",
      width: "var(--terminal-diameter)",
      height: "var(--terminal-diameter)",
      borderWidth: "var(--stroke-width)",
      borderStyle: "solid",
      borderColor: "var(--stroke-color)",
      borderRadius: "50%",
    },
  },
  variants: {
    edge: {
      top: {
        top: "var(--main-axis-offset)",
        "&::before": {
          top: "var(--terminal-cross-axis-offset)",
        },
      },
      right: {
        right: "var(--main-axis-offset)",
        "&::before": {
          right: "var(--terminal-cross-axis-offset)",
        },
      },
      bottom: {
        bottom: "var(--main-axis-offset)",
        "&::before": {
          bottom: "var(--terminal-cross-axis-offset)",
        },
      },
      left: {
        left: "var(--main-axis-offset)",
        "&::before": {
          left: "var(--terminal-cross-axis-offset)",
        },
      },
    },
    type: {
      terminal: {
        "--terminal-display": "block",
        "--terminal-diameter": "calc(var(--stroke-width) * 4)",
        "--terminal-radius": "calc(var(--terminal-diameter) / 2)",
        "--line-main-axis-start": "calc(var(--terminal-radius) + var(--indent))",
        "--terminal-main-axis-start": "calc(-1 * var(--terminal-diameter))",
        "--terminal-cross-axis-offset": "calc(calc(var(--stroke-width) - var(--terminal-diameter)) / 2)",
      },
      "terminal-no-bleed": {
        "--terminal-display": "block",
        "--terminal-diameter": "calc(var(--stroke-width) * 4)",
        "--terminal-radius": "calc(var(--terminal-diameter) / 2)",
        "--line-main-axis-start": "calc(var(--terminal-diameter) + var(--indent))",
        "--terminal-main-axis-start": "calc(-1 * var(--terminal-diameter))",
        "--terminal-cross-axis-offset": "calc(calc(var(--stroke-width) - var(--terminal-diameter)) / 2)",
      },
      "no-terminal": {
        "--terminal-display": "none",
        "--terminal-diameter": "calc(var(--stroke-width) * 4)",
        "--terminal-radius": "calc(var(--terminal-diameter) / 2)",
        "--line-main-axis-start": "var(--indent))",
        "--terminal-main-axis-start": "calc(-1 * var(--terminal-diameter))",
        "--terminal-cross-axis-offset": "calc(calc(var(--stroke-width) - var(--terminal-diameter)) / 2)",
      },
    },
    status: {
      default: {
        "--stroke-color": "#1868DB",
      },
      warning: {
        "--stroke-color": "#E06C00",
      },
    },
    size: {
      sm: {
        "--stroke-width": "2px",
        '--main-axis-offset': 'calc(-0.5 * (var(--line-gap) + var(--stroke-width)))',
      },
      md: {
        "--stroke-width": "3px",
        '--main-axis-offset': 'calc(-0.5 * (var(--line-gap) + var(--stroke-width)))',
      },
      lg: {
        "--stroke-width": "4px",
        '--main-axis-offset': 'calc(-0.5 * (var(--line-gap) + var(--stroke-width)))',
      },
    },
    gap: {
      none: {
        "--line-gap": 0,
      },
      sm: {
        "--line-gap": 1,
      },
      md: {
        "--line-gap": 2,
      },
      lg: {
        "--line-gap": 3,
      },
    },
  },
  defaultVariants: {
    type: "terminal",
    status: "default",
    size: "md",
    gap: "none",
  },
  compoundVariants: [
    // horizontal orientation
    {
      edge: "top",
      css: {
        height: "var(--stroke-width)",
        insetInlineStart: "var(--line-main-axis-start)",
        insetInlineEnd: 0,
        "&::before": {
          insetInlineStart: "var(--terminal-main-axis-start)",
        },
      },
    },
    {
      edge: "bottom",
      css: {
        height: "var(--stroke-width)",
        insetInlineStart: "var(--line-main-axis-start)",
        insetInlineEnd: 0,
        "&::before": {
          insetInlineStart: "var(--terminal-main-axis-start)",
        },
      },
    },
    // vertical orientation
    {
      edge: "left",
      css: {
        width: "var(--stroke-width)",
        top: "var(--line-main-axis-start)",
        bottom: 0,
        "&::before": {
          top: "var(--terminal-main-axis-start)",
        },
      },
    },
    {
      edge: "right",
      css: {
        width: "var(--stroke-width)",
        top: "var(--line-main-axis-start)",
        bottom: 0,
        "&::before": {
          top: "var(--terminal-main-axis-start)",
        },
      },
    },
  ],
})


export function Line(props: LineProps) {
  const recipe = useRecipe({ recipe: lineRecipe })
  const styles = recipe({ ...props })

  return <chakra.div css={styles} />
}

export default Line
