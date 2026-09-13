import React from "react"
import { chakra } from "@chakra-ui/react"

export interface PanelTopicBarProps {
  className?: string
  css?: any
  children: React.ReactNode
}

/**
 * Shared container for a panel's top "topic picker" row (`TopicQuickPicker`
 * plus any adjacent controls). Height comes purely from the row's content
 * (the picker's own `h-8` trigger) with horizontal-only padding, so every
 * panel using this gets the same compact height instead of each hand-rolling
 * its own wrapper with inconsistent vertical padding. Colors/borders stay
 * overridable via `className` (e.g. Image panel's permanently-dark chrome)
 * since panels can differ there while sharing the same box model.
 */
export const PanelTopicBar: React.FC<PanelTopicBarProps> = ({ className, children }) => (
  <chakra.div
    data-testid="panel-topic-bar"
    className={className}
    css={{
      display: "flex",
      px: "2",
      shrink: "0",
      gap: "2",
      alignItems: "center",
      background: "bg.muted",
      borderBottom: "1px solid",
      borderBottomColor: "border",
      ...css,
    }}
  >
    {children}
  </chakra.div>
)
