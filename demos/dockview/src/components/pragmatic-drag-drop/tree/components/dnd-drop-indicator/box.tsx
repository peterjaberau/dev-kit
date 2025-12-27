import React from "react"

import { Line } from "./internal/line"
import { LineProps } from "./types"


export function Box(props: LineProps) {
  return <Line {...props} />
}

