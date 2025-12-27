import { defineRecipe } from "@chakra-ui/react"

export type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';


export type LineTypeProps = "terminal" | "no-terminal" | "terminal-no-bleed"
export type PlacementProps = "top" | "right" | "bottom" | "left"
export type GapProps = "none" | "sm" | "md" | "lg"
export type IndentProps = any
export type StatusProps = "default" | "warning"
export type SizeProps = "sm" | "md" | "lg"

export type LineProps = {
  edge: PlacementProps
  type?: LineTypeProps
  gap?: GapProps
  indent?: IndentProps
  status?: StatusProps
  size?: SizeProps
}

export type BorderProps = {
  status?: StatusProps
  size?: SizeProps
  indent?: IndentProps
  borderRadius?: any
}
