import { chakra, Badge, Button, Separator, Text } from "@chakra-ui/react"
import type { ReactNode } from 'react';

interface TransitionRootProps {
  isActive: boolean;
  isFirst?: boolean;
  isSim: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

export function TransitionRoot({
  isActive,
  isFirst,
  isSim,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: TransitionRootProps) {
  return (
    <chakra.div
      data-testid="transition"
      css={{
        borderRadius: "full",
        boxShadow: "xs",
        cursor: "pointer",
        border: "thin solid",
        borderColor: "border.subtle",
        px: 2,
        py: 1,
        _hover: {
          borderColor: "border.info",
          bg: "bg.info",
        },

        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,

        fontSize: "xs",
        transition: "colors",
        ...(!isFirst &&
          {
            // border: "1px solid",
            // borderColor: "border",
          }),
        ...(isSim && {
          cursor: "pointer",
          _hover: {
            borderColor: "border.info",
            bg: "bg.info",
          },
        }),

        ...(isSim &&
          !isActive && {
            opacity: 40,
          }),
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </chakra.div>
  )
}
