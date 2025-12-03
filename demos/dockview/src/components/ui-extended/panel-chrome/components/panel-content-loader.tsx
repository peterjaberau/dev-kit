import React from "react"
import { EmptyState, VStack, Spinner } from "@chakra-ui/react"

export interface PanelContentLoaderProps {
  title?: any
  description?: any
  showIndicator?: boolean
}

export const PanelContentLoader = ({ title, description, showIndicator = true }: PanelContentLoaderProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>{showIndicator && <Spinner size="lg" />}</EmptyState.Indicator>
        <VStack textAlign="center">
          {title && <EmptyState.Title>{title}</EmptyState.Title>}
          {description && <EmptyState.Description>{description}</EmptyState.Description>}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
