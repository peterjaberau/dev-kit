// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
//
import { defineSlotRecipe } from '@chakra-ui/react'

export const edgeLabel = defineSlotRecipe({
  className: 'likec4-edge-label',
  slots: ['root', 'stepNumber', 'contents', 'label', 'technology'],
  base: {
    root: {
      fontFamily: 'likec4.relation',
      paddingBlock: '1',
      paddingInline: '1.5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 'max-content',
      maxWidth: '100%',
      gap: '0.5',
      color: 'var(--xy-edge-label-color)',
      background: 'var(--xy-edge-label-background-color)',
      border: '0px solid transparent',
      borderRadius: '4px',
    },
    stepNumber: {
      alignSelf: 'stretch',
      flex: '0 0 auto',
      fontWeight: 600,
      fontSize: '14px',
      padding: '1',
      textAlign: 'center',
      minWidth: '22px',
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      _only: {
        borderRadius: '4px',
        minWidth: '24px',
      },
      background: `color-mix(in oklab, var(--xy-edge-label-background-color), {colors.likec4.mixColor} 12%)`,
      fontVariantNumeric: 'tabular-nums',
      [':where([data-likec4-color="gray"]) &']: {
        _dark: {
          background: `color-mix(in oklab, var(--xy-edge-label-background-color), {colors.likec4.mixColor} 15%)`,
        },
      },
    },
    contents: {
      display: 'contents',
      _empty: {
        display: 'none !important',
      },
    },
    label: {
      whiteSpaceCollapse: 'preserve-breaks',
      overflowWrap: 'anywhere',
      fontSize: '14px',
      lineHeight: '1.2',
      margin: '0',
    },
    technology: {
      textAlign: 'center',
      whiteSpaceCollapse: 'preserve-breaks',
      overflowWrap: 'anywhere',
      fontSize: '11px',
      lineHeight: '1',
      opacity: 0.75,
    },
  },
  variants: {
    pointerEvents: {
      none: {
        root: {
          pointerEvents: 'none',
        },
      },
      all: {
        root: {
          pointerEvents: 'all',
        },
      },
    },
    cursor: {
      pointer: {
        root: {
          cursor: 'pointer',
        },
      },
      default: {
        root: {
          cursor: 'default',
        },
      },
    },
    isStepEdge: {
      false: {},
      true: {
        root: {
          flexDirection: 'row',
          gap: '1',
          padding: '0',
        },
        contents: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '0.5',
          paddingRight: '1',
          paddingBottom: '1',
          gap: '0.5',
        },
        label: {
          py: '0.5',
          paddingRight: '0.5',
        },
      },
    },
  },
  defaultVariants: {
    pointerEvents: 'all',
    isStepEdge: false,
    cursor: 'default',
  },
} as any)
