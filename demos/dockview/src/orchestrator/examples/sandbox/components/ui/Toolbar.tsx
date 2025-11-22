'use client'
import React from 'react';
import { Flex, Box, chakra } from '@chakra-ui/react'
interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function Toolbar({ children, className = '', css=undefined }: ToolbarProps) {
  return (
    <Box css={{
      borderBottom: '1px solid',
      borderBottomColor: 'bg.panel',
      px: 6,
      py: 3,
      ...css
    }} >
      {children}
    </Box>
  );
}

interface ToolbarGroupProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function ToolbarGroup({ children, className = '', css=undefined }: ToolbarGroupProps) {
  return (
    <chakra.div
      css={{
        display: 'flex',
        alignItems: 'center',
        gapX: 4,
        ...css
      }}
      >
      {children}
    </chakra.div>
  );
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
  className = '', css=undefined
}: ToolbarButtonProps) {

  const variantClasses = {
    primary: active
      ? {
          backgroundColor: 'white',
          color: 'blue.600',
          boxShadow: 'sm',
      }
      : {
          color: 'gray.700',
          _hover: { color: 'gray.900' },
      },
    secondary: active
      ? {
          backgroundColor: 'white',
          color: 'blue.600',
          boxShadow: 'sm',
      }
      : {
          color: 'gray.500',
          _hover: { color: 'gray.700' },
      },
    debug: active
      ? {
          backgroundColor: 'white',
          color: 'blue.600',
          boxShadow: 'sm',
      }
      : {
          color: 'gray.500',
          _hover: { color: 'gray.700' },
      }
  };

  return (
    <chakra.button
      onClick={onClick}
      css={{
        paddingX: 3,
        paddingY: 1.5,
        fontSize: 'sm',
        fontWeight: 'medium',
        borderRadius: 'md',
        transitionProperty: 'colors',
        ...variantClasses[variant],
        ...css,
      }}
    >
      {children}
    </chakra.button>
  );
}

interface ToolbarSeparatorProps {
  className?: string;
  css?: any
}

export function ToolbarSeparator({ className = '', css=undefined }: ToolbarSeparatorProps) {
  return <chakra.div
    css={{
      width: '1px',
      backgroundColor: 'gray.300',
      marginX: 1
    }}

     />;
}
