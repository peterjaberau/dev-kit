import React from "react"
import { EmptyState, VStack, Icon } from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi";

export interface PanelContentPlaceholderProps {
  title?: any
  description?: any
  showIndicator?: boolean
}

export const PanelContentPlaceholder = ({ title, description, showIndicator = true }: PanelContentPlaceholderProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {showIndicator && (
            <Icon size="2xl">
              <FiInfo />
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
