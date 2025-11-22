'use client'
import React from 'react';
import { chakra } from "@chakra-ui/react"
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  css?: any
}

export function Layout({ children, className = '', css = undefined }: LayoutProps) {
  return (
    <chakra.div
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'gray.100',
        ...css,
      }}
      >
      {children}
    </chakra.div>
  );
}

export function LayoutHeader({ children, className = '', css = undefined }: LayoutProps) {
  return (
    <chakra.header
      css={{
        backgroundColor: 'bg.panel',
        borderColor: 'gray.200',
        borderBottom: '1px solid',
      }}
      >
      {children}
    </chakra.header>
  );
}

export function LayoutContent({ children, className = '', css = undefined }: LayoutProps) {
  return (
    <chakra.main

      css={{

        flex: 1,
        overflow: 'hidden',
        ...css,
      }}
      >
      {children}
    </chakra.main>
  );
}

export function LayoutFooter({ children, className = '', css = undefined }: LayoutProps) {
  return (
    <chakra.footer
      css={{
        backgroundColor: 'bg.panel',
        borderColor: 'gray.200',
        borderTop: '1px solid',
        paddingX: 6,
        paddingY: 2,
        ...css,
      }}
      >
      {children}
    </chakra.footer>
  );
}

export function SplitLayout({ children, className = '', css = undefined }: LayoutProps) {
  return (
    <chakra.div
      css={{

        display: 'flex',
        height: '100%',
        ...css

      }}
      >
      {children}
    </chakra.div>
  );
}

interface SplitPanelProps {
  children: React.ReactNode;
  className?: string;
  size?: '1/3' | '1/2' | '2/3' | 'flex-1';
  css?: any
}

export function SplitPanel({ children, className = '', size = 'flex-1', css = undefined }: SplitPanelProps) {
  const sizeClasses = {
    '1/3': "33%",
    '1/2': "50%",
    '2/3': "66%",
    'flex-1': 'full',
    33: "33%",
    50: "50%",
    66: "66%",
    1: "full"
  };

  return (
    <chakra.div
    css={{
      width: sizeClasses[size],
      borderColor: 'gray.200',
      borderRight: '1px solid',
      _last: {
        borderRight: '0px',
      },
      ...css,
    }}
      >
      {children}
    </chakra.div>
  );
}
