import { chakra, defineRecipe, useRecipe } from "@chakra-ui/react"
import {
  BorderProps,
} from '../types'



const borderRecipe = defineRecipe({
  className: "border",
  base: {
    '--indent': '0px',
    position: "absolute",
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineEnd: 0,
    pointerEvents: "none",
    insetInlineStart: "var(--indent)",
  },
  variants: {
    status: {
      default: {
        "--stroke-color": "#1868DB",
        borderColor: "#1868DB",
      },
      warning: {
        "--stroke-color": "#E06C00",
        borderColor: "#E06C00",
      },
    },
    size: {
      sm: {
        "--stroke-width": "1px",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      md: {
        "--stroke-width": "2px",
        borderWidth: "2px",
        borderStyle: "solid",
      },
      lg: {
        "--stroke-width": "3px",
        borderWidth: "3px",
        borderStyle: "solid",
      },
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
})



export function Border(props: BorderProps) {
  const { borderRadius = "sm",  ...rest } = props
  const recipe = useRecipe({ recipe: borderRecipe })
  const styles = recipe({ ...rest })

  return (
    <chakra.div
      css={{
        borderRadius,
        ...styles,
      }}
    />
  )
}

export default Border
