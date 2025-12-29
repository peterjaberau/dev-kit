import React, { useCallback, useContext } from "react"
import { Card, HStack } from "@chakra-ui/react"

export interface FlyoutBodyProps {

  children: React.ReactNode
  [key: string]: any

}

export const FlyoutBody = (props: FlyoutBodyProps) => {
  const { children, ...rest } = props

  return (
    <Card.Body {...rest}>
      {children}
    </Card.Body>
  )
}
