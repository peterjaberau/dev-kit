import type { ReactNode } from "react"
import { chakra, Card } from "@chakra-ui/react"

interface StateNodeCardProps {
  isAtomic: boolean
  isFinal: boolean
  isHighlighted: boolean
  isRegion?: boolean
  isSimActive: boolean
  children: ReactNode
}

export function StateNodeCard({
  isAtomic,
  isFinal,
  isHighlighted,
  isRegion,
  isSimActive,
  children,
}: StateNodeCardProps) {
  return (
    <Card.Root

      data-testid="state-card"
      data-sim-active={isSimActive && (isAtomic || isFinal) ? "" : undefined}
      css={{
        // bg: "bg.panel",
        // display: "flex",
        // flexDirection: "column",
        // borderRadius: "md",
        // borderWidth: "thin",
        // borderStyle: "solid",
        // borderColor: "border",
        boxShadow: "sm",
        ...(isFinal && {
          borderWidth: "medium",
          borderStyle: "double",
        }),
        ...(isRegion && {
          borderStyle: "dashed",
        }),
        ...(isHighlighted && {
          bg: "bg.info",
          borderColor: "border.info",
          boxShadow: "md",
        }),
        ...(isSimActive &&
          (isAtomic || isFinal) && {
            borderColor: "border.emphasized",
            bg: "bg.muted",
          }),
      }}
    >
      {children}
    </Card.Root>
  )
}
