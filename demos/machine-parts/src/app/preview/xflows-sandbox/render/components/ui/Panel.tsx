import React from 'react';
import { chakra } from "@chakra-ui/react"

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  css?: any;
  title?: string;
  actions?: React.ReactNode;
}

export function Panel({ children, className = '', css, title, actions }: PanelProps) {
  return (
    <chakra.div
      css={{
        bg: "bg.panel",
        borderColor: "border",
        border: "1px solid",
        borderRadius: "lg",
        overflow: "hidden",
        ...css
      }}
      className={className}
    >
      {(title || actions) && (
        <chakra.div
          css={{
            borderBottom: '1px solid',
            borderColor: 'border',
            bg: 'bg.subtle',
            px: 4,
            py: 3
          }}
          >
          <chakra.div
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            >
            {title && <chakra.h3
              css={{
                fontSize: 'lg',
                fontWeight: 'semibold',
                color: 'gray.900'
              }}
              >{title}</chakra.h3>}
            {actions && <chakra.div
              css={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}

              >{actions}</chakra.div>}
          </chakra.div>
        </chakra.div>
      )}
      <chakra.div css={{ p: 4}}>{children}</chakra.div>
    </chakra.div>
  )
}

interface PanelHeaderProps {
  children: React.ReactNode;
  css?: any;
  className?: string;
}

export function PanelHeader({ children, css, className = '' }: PanelHeaderProps) {
  return (
    <chakra.div
      css={{
        bg: "gray.50",
        borderBottom: "1px solid",
        borderColor: "border",
        px: 4,
        py: 3,
      }}
      className={className}
    >
      {children}
    </chakra.div>
  )
}

interface PanelContentProps {
  children: React.ReactNode
  css?: any
  className?: string
}

export function PanelContent({ children, css, className = "" }: PanelContentProps) {
  return (
    <chakra.div
      css={{
        p: 4,
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.div>
  )
}
