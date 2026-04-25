import type { ReactNode } from 'react';
import { chakra } from "@chakra-ui/react"

interface StateNodeTransitionItemProps {
  children: ReactNode;
}

export function StateNodeTransitionItem({ children }: StateNodeTransitionItemProps) {
  return (
    <chakra.div
      css={{
        "--tree-color": "colors.bg.emphasized",
        position: "relative",
        pl: 1,
        borderLeftWidth: "medium",
        borderLeftStyle: "solid",
        borderLeftColor: "var(--tree-color)",
        _before: {
          content: "''",
          position: "absolute",
          top: 0,
          left: -2,
          width: 1,
          h: "50%",
          borderLeftWidth: "medium",
          borderLeftStyle: "solid",
          borderLeftColor: "var(--tree-color)",
          borderBottomWidth: "medium",
          borderBottomStyle: "solid",
          borderBottomColor: "var(--tree-color)",
          borderBottomLeftRadius: "md",
        },
        "&:last-child": {
          borderLeftWidth: "medium",
          borderLeftStyle: "solid",
          borderLeftColor: "transparent",
        },
      }}
      className="tree-edge"
    >
      {children}
    </chakra.div>
  )
}
