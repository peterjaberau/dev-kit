import * as React from 'react';

import { IconButton } from "@chakra-ui/react"
import { PiWarning as WarningIcon } from "react-icons/pi"
import { Tooltip } from "@dev-kit/components"

export interface Props {
  message?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  ariaLabel?: string;
}

export function PanelStatus({ message, onClick, ariaLabel = 'status' }: Props) {

  return (
    <Tooltip content={message || ""}>
      <IconButton size="xs" variant="plain" colorPalette="red" onClick={onClick}>
        <WarningIcon />
      </IconButton>
    </Tooltip>
  )
}
