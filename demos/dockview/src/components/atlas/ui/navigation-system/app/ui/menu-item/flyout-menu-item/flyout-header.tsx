import React, { useCallback, useContext } from "react"
import { Card, HStack } from "@chakra-ui/react"
import { Popover } from "@chakra-ui/react"

export interface FlyoutHeaderProps {

  title: string

  closeButtonLabel: string
}

export const FlyoutHeader = (props: FlyoutHeaderProps) => {
  const { title, closeButtonLabel } = props

  return (
    <Card.Header>
      <HStack w={"full"}>
        <HStack flex={1}>
          <Card.Title>{title}</Card.Title>
        </HStack>
        <HStack>
          <Popover.CloseTrigger>{closeButtonLabel}</Popover.CloseTrigger>
        </HStack>
      </HStack>
    </Card.Header>
  )
}
