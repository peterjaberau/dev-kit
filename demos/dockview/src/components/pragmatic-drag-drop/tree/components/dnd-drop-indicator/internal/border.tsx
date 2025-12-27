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
        "--stroke-color": "border",
        borderColor: "border",
      },
      warning: {
        "--stroke-color": "border.warning",
        borderColor: "border.warning",
      },
    },
    size: {
      sm: {
        "--stroke-width": "1px",
        border: "1px solid",
      },
      md: {
        "--stroke-width": "2px",
        border: "2px solid",
      },
      lg: {
        "--stroke-width": "3px",
        border: "3px solid",
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
