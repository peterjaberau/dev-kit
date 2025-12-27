import React, { type ComponentProps, type ReactNode } from "react"

import type { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
export { type Instruction, type Operation } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

import { Border } from "./border"
import { Box as Line } from "./box"

const axisLookup = {
  vertical: {
    start: "top",
    end: "bottom",
  },
  horizontal: {
    start: "left",
    end: "right",
  },
} as const

type LineProps = ComponentProps<typeof Line>

export function ListItem({
  instruction,
  lineGap,
  lineType,
}: {
  instruction: Instruction
  lineGap?: LineProps["gap"]
  lineType?: LineProps["type"]
}): ReactNode {
  const appearance = instruction.blocked ? "warning" : "default"
  const axis = axisLookup[instruction.axis]

  if (instruction.operation === "combine") {
    return <Border status={appearance} />
  }

  if (instruction.operation === "reorder-before") {
    return <Line edge={axis.start} status={appearance} gap={lineGap} type={lineType} />
  }
  if (instruction.operation === "reorder-after") {
    return <Line edge={axis.end} status={appearance} gap={lineGap} type={lineType} />
  }

  return null
}
