import type { ReactNode } from "react"
import { chakra } from "@chakra-ui/react"

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
    <chakra.div
      data-testid="state-card"
      data-sim-active={isSimActive && (isAtomic || isFinal) ? "" : undefined}
      css={{
        bg: "bg.panel",
        display: "flex",
        flexDirection: "column",
        borderRadius: "md",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border",
        boxShadow: "sm",
        ...(isFinal && {
          borderWidth: "medium",
          borderStyle: "double",
        }),
        ...(isRegion && {
          borderStyle: "dashed",
        }),
        ...(isHighlighted && {
          borderColor: "blue",
          boxShadow: "md",
        }),
        ...(isSimActive &&
          (isAtomic || isFinal) && {
            borderColor: "border.info",
            bg: "blue.100",
          }),
      }}
    >
      {children}
    </chakra.div>
  )
}
