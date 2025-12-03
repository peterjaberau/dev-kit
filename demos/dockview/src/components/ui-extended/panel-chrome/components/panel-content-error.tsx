import React from "react"
import { EmptyState, VStack, Icon } from "@chakra-ui/react"
import { MdErrorOutline } from "react-icons/md"

export interface PanelContentErrorProps {
  title?: any
  description?: any
  showIndicator?: boolean
}

export const PanelContentError = ({ title, description, showIndicator = true }: PanelContentErrorProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {showIndicator && (
            <Icon size="2xl">
              <MdErrorOutline />{" "}
            </Icon>
          )}
        </EmptyState.Indicator>
        <VStack textAlign="center">
          {title && <EmptyState.Title>{title}</EmptyState.Title>}
          {description && <EmptyState.Description>{description}</EmptyState.Description>}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
