'use client'
import React from 'react';
import { chakra } from "@chakra-ui/react"

interface StatusBarProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function StatusBar({ children, className = '', css = undefined }: StatusBarProps) {
  return (
    <chakra.div
      css={{
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'gray.200',
        paddingX: 6,
        paddingY: 2,
        ...css
      }}
      >
      <chakra.div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'sm',
          color: 'gray.600',
        }}
        >
        {children}
      </chakra.div>
    </chakra.div>
  );
}

interface StatusItemProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function StatusItem({ children, className = '', css = undefined }: StatusItemProps) {
  return (
    <chakra.div
      css={{
        display: 'flex',
        alignItems: 'center',
        gapX: 2,
        ...css
      }}

      >
      {children}
    </chakra.div>
  );
}

interface StatusLabelProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function StatusLabel({ children, className = '', css = undefined }: StatusLabelProps) {
  return (
    <chakra.span
      css={{
        fontSize: 'medium',
        ...css
      }}
      >
      {children}
    </chakra.span>
  );
}

interface StatusValueProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function StatusValue({ children, className = '', css = undefined }: StatusValueProps) {
  return (
    <chakra.span
      css={{
        fontFamily: 'monospace',
        fontSize: 'sm',
        ...css
      }}

      >
      {children}
    </chakra.span>
  );
}
