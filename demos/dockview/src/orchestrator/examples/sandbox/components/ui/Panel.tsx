'use client'
import React from "react"
import { chakra } from "@chakra-ui/react"

interface PanelProps {
  children: React.ReactNode
  className?: string
  title?: string
  actions?: React.ReactNode
  css?: any
}

export function Panel({ children, className = "", title, actions, css = undefined }: PanelProps) {
  return (
    <chakra.div
      css={{
        backgroundColor: "bg.panel",
        borderColor: "gray.200",
        border: "1px solid",
        borderRadius: "lg",
        overflow: "hidden",
        ...css,
      }}
    >
      {(title || actions) && (
        <chakra.div
          css={{
            backgroundColor: "gray.50",
            borderBottom: "1px solid",
            borderColor: "gray.200",
            paddingX: 4,
            paddingY: 3,
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {title && (
              <chakra.h3
                css={{
                  fontSize: "lg",
                  fontWeight: "semibold",
                  color: "gray.900",
                }}
              >
                {title}
              </chakra.h3>
            )}
            {actions && (
              <chakra.div
                css={{
                  display: "flex",
                  alignItems: "center",
                  gapX: 2,
                }}
              >
                {actions}
              </chakra.div>
            )}
          </chakra.div>
        </chakra.div>
      )}
      <chakra.div p={4}>{children}</chakra.div>
    </chakra.div>
  )
}

interface PanelHeaderProps {
  children: React.ReactNode
  className?: string
  css?: any
}

export function PanelHeader({ children, className = "", css = undefined }: PanelHeaderProps) {
  return (
    <chakra.div
      css={{
        backgroundColor: "gray.50",
        borderBottom: "1px solid",
        borderColor: "gray.200",
        paddingX: 4,
        paddingY: 3,
        ...css,
      }}
    >
      {children}
    </chakra.div>
  )
}

interface PanelContentProps {
  children: React.ReactNode
  className?: string
  css?: any
}

export function PanelContent({ children, className = "", css = undefined }: PanelContentProps) {
  return (
    <chakra.div
      css={{
        p: 4,
        ...css,
      }}
    >
      {children}
    </chakra.div>
  )
}
