import React from "react"
import { EmptyState, VStack, Icon } from "@chakra-ui/react"
import { MdOutlineSearchOff } from "react-icons/md";

export interface PanelContentEmptyProps {
  title?: any
  description?: any
  showIndicator?: boolean
}

export const PanelContentEmpty = ({ title, description, showIndicator = true }: PanelContentEmptyProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {showIndicator && (
            <Icon size="2xl">
              <MdOutlineSearchOff />
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
