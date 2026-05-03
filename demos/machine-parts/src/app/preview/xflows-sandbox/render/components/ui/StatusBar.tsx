import React from 'react';
import { chakra } from "@chakra-ui/react"

interface StatusBarProps {
  children: React.ReactNode
  css?: any
  className?: string
}

export function StatusBar({ children, css, className = '' }: StatusBarProps) {
  return (
    <chakra.div
      css={{
        borderTop: "1px solid",
        borderColor: "border",
        bg: "bg.panel",
        px: 6,
        py: 2,
        ...css,
      }}
      data-id="statusbar"
      className={className}
    >
      <chakra.div className="flex items-center justify-between text-sm text-gray-600">{children}</chakra.div>
    </chakra.div>
  )
}

interface StatusItemProps {
  children: React.ReactNode;
  css?: any;
  className?: string;
}

export function StatusItem({ children, css, className = '' }: StatusItemProps) {
  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        ...css,
      }}
      data-id="status-item"
      className={className}
    >
      {children}
    </chakra.div>
  )
}

interface StatusLabelProps {
  children: React.ReactNode
  css?: any
  className?: string
}

export function StatusLabel({ children, css, className = '' }: StatusLabelProps) {
  return (
    <chakra.span
      css={{
        fontWeight: "medium",
        ...css,
      }}
      data-id="status-label"
      className={className}
    >
      {children}
    </chakra.span>
  )
}

interface StatusValueProps {
  children: React.ReactNode
  css?: any
  className?: string
}

export function  StatusValue({ children, css, className = '' }: StatusValueProps) {
  return (
    <chakra.span
      css={{
        fontFamily: "mono",
        fontSize: "sm",
      }}
      data-id="status-value"
      className={className}
    >
      {children}
    </chakra.span>
  )
}
