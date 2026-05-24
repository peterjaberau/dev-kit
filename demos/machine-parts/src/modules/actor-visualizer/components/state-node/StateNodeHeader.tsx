import { StateNodeTypeIndicator } from "./StateNodeTypeIndicator"
import { chakra, Card, Separator, HStack, VStack, Badge } from "@chakra-ui/react"

interface StateNodeHeaderProps {
  historyType?: "shallow" | "deep"
  type?: string | "directed" | "compound" | "atomic" | "final" | "parallel" | null
  isChoice: boolean
  isFinal: boolean
  isHistory: boolean
  isInitial?: boolean
  isParallel: boolean
  isRegion?: boolean
  label: string
  description?: string
}

export function StateNodeHeader({
  historyType,
  type,
  isChoice,
  isFinal,
  isHistory,
  isInitial,
  isParallel,
  isRegion,
  label,
  description,
}: StateNodeHeaderProps) {
  return (
    <Card.Header
      css={{
        py: 2,
        borderBottomWidth: "thin",
        borderBottomStyle: isRegion ? "dashed" : "solid",
        // borderBottomStyle: "solid",
        borderBottomColor: "border",
      }}
    >
      <HStack css={{ alignItems: "center" }}>
        <Card.Title css={{ flex: 1 }}>{label}</Card.Title>
        <StateNodeTypeIndicator
          historyType={historyType}
          isChoice={isChoice}
          isFinal={isFinal}
          isHistory={isHistory}
          isInitial={isInitial}
          isParallel={isParallel}
        />
        <Badge>state</Badge>
        {type && <Badge variant="outline">{type}</Badge>}
      </HStack>
      {description && <Card.Description>{description}</Card.Description>}
    </Card.Header>
  )
}
