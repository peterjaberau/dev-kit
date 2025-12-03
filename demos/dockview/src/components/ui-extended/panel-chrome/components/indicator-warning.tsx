'use client'
import { IconButton } from "@chakra-ui/react"
import { PiWarning as WarningIcon } from "react-icons/pi"
import { Tooltip } from "@dev-kit/components"

export const IndicatorWarning = ({ content }: any) => {
  return (
    <Tooltip content={content}>
      <IconButton size="sm" variant={"plain"} colorPalette={'red'} borderRadius={'none'}>
        <WarningIcon />
      </IconButton>
    </Tooltip>
  )
}
