import React from 'react';
import { chakra } from "@chakra-ui/react"

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  css?: React.CSSProperties | any;
}

export function Layout({ children, css, className = '' }: LayoutProps) {
  return (
    <chakra.div
      data-id="layout"
      css={{
        display: "flex",
        flexDirection: "column",
        h: "full",
        bg: "bg.subtle",
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.div>
  )
}

export function LayoutHeader({ children, css, className = '' }: LayoutProps) {
  return (
    <chakra.header
      data-id="layout-header"
      css={{
        bg: "bg.panel",
        borderBottom: "1px solid",
        borderBottomColor: "border",
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.header>
  )
}

export function LayoutContent({ children, css, className = '' }: LayoutProps) {
  return (
    <chakra.main
      data-id="layout-content"
      css={{
        flex: 1,
        overflow: "hidden",
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.main>
  )
}

export function LayoutFooter({ children, css, className = "" }: LayoutProps) {
  return (
    <chakra.footer
      data-id="layout-footer"
      css={{
        borderTop: "1px solid",
        borderColor: "border",
        bg: "bg.panel",
        px: 6,
        py: 2,
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.footer>
  )
}

export function SplitLayout({ children, css, className = '' }: LayoutProps) {
  return (
    <chakra.div
      css={{
        display: "flex",
        h: "full",
        ...css,
      }}
      data-id="split-layout"
      className={className}
    >
      {children}
    </chakra.div>
  )
}

interface SplitPanelProps {
  children: React.ReactNode
  className?: string
  css?: React.CSSProperties | any;
  size?: "1/3" | "1/2" | "2/3" | "flex-1" | "full"
}

export function SplitPanel({ children, css, className = '', size = 'full' }: SplitPanelProps) {
  const sizeClasses = {
    "1/3": "w-1/3",
    "1/2": "w-1/2",
    "2/3": "w-2/3",
    "flex-1": "flex-1",
    "full": "flex-1",
  }

  const sizeCss = {
    "1/3": 33.3,
    "1/2": 50,
    "2/3": 66.6,
    "flex-1": "full",
    full: "full",
  }

  return (
    <chakra.div
      data-id="split-panel"
      css={{
        w: sizeCss[size],
        flex: 1,
        borderRight: "1px solid",
        borderRightColor: "border",
        _last: {
          borderRight: "none",
        },
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.div>
  )
}