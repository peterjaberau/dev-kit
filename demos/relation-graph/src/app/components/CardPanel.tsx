"use client"
import { Card } from "@chakra-ui/react"

import { ReactNode } from "react"

interface CardPanelProps {
  children?: ReactNode
  footer?: ReactNode

  title?: string
  descritpion?: string;
  cardStyle?: any
}

export const CardPanel = (props: CardPanelProps) => {
  return (
    <Card.Root css={{ boxShadow: "sm", borderRadius: "md", ...props.cardStyle }}>
      {(props.title || props.descritpion) && (
        <Card.Header>
          {props.title && <Card.Title>{props.title}</Card.Title>}
          {props.descritpion && <Card.Description>{props.descritpion}</Card.Description>}
        </Card.Header>
      )}
      {props.children && <Card.Body gap={4} backgroundColor='transparent' >{props.children}</Card.Body>}
      {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
    </Card.Root>
  )
}
