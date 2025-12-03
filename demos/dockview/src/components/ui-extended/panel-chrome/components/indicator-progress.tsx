'use client'
import { Progress } from "@chakra-ui/react"
import * as React from "react"

export const IndicatorProgress = () => {
  return (
    <Progress.Root width={'full'} height={'1px'} value={null}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
