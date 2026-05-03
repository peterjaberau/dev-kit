import React from 'react';
import { chakra, Button, Separator } from '@chakra-ui/react'
interface ToolbarProps {
  children: React.ReactNode;
  css?: any;
  className?: string;
}

export function Toolbar({ children, css, className = '' }: ToolbarProps) {
  return (
    <chakra.div
      data-id="toolbar"
      css={{
        borderBottom: "1px solid",
        bg: "bg.panel",
        px: 6,
        py: 3,
        ...css,
      }}
      className={className}
    >
      {children}
    </chakra.div>
  )
}

interface ToolbarGroupProps {
  children: React.ReactNode
  css?: any
  className?: string
}

export function ToolbarGroup({ children, css, className = '' }: ToolbarGroupProps) {
  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        ...css,
      }}
      data-id="toolbar-group"
      className={className}
    >
      {children}
    </chakra.div>
  )
}

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'debug';
  className?: string;
  css?: any
}

export function ToolbarButton({ 
  children, 
  onClick, 
  active = false, 
  variant = 'primary',
  className = '',
                                css,
}: ToolbarButtonProps) {

  const colorPaletteValues = {
    primary: active ? "blue" : "gray",
    secondary: active ? "blue" : "gray",
    debug: active ? "blue" : "gray",
  }


  return (
    <Button
      size="xs"
      colorPalette={colorPaletteValues[variant]}
      css={{...css}}
      variant={active ? "solid" : "surface"}
      data-id="toolbar-botton"
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  )
}

export function ToolbarSeparator() {
  return <Separator orientation="vertical" />
}
