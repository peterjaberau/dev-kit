import { chakra } from "@chakra-ui/react"
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
        _hover: {
          bg: "blue.100",
        },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        px: 2.5,
        py: 1.5,
        fontSize: "xs",
        transition: "colors",
        ...(!isFirst && {
          borderWidth: "thin",
          borderStyle: "dashed",
          borderColor: "border",
        }),
        ...(isSim && {
          cursor: "pointer",
          _hover: {
            bg: "blue.100",
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
