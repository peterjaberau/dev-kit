import { StateNodeTypeIndicator } from "./StateNodeTypeIndicator"
import { chakra, Card, Separator, HStack, VStack, Badge } from "@chakra-ui/react"

interface StateNodeHeaderProps {
  historyType?: "shallow" | "deep"
  isChoice: boolean
  isFinal: boolean
  isHistory: boolean
  isInitial?: boolean
  isParallel: boolean
  label: string
  description?: string
}

export function StateNodeHeader({
  historyType,
  isChoice,
  isFinal,
  isHistory,
  isInitial,
  isParallel,
  label,
  description,
}: StateNodeHeaderProps) {
  return (
    <Card.Header
      css={{
        py: 2,
        borderBottom: "1px solid",
        borderBottomColor: "border",
      }}
    >
      <HStack css={{ alignItems: "center" }}>
        <StateNodeTypeIndicator
          historyType={historyType}
          isChoice={isChoice}
          isFinal={isFinal}
          isHistory={isHistory}
          isInitial={isInitial}
          isParallel={isParallel}
        />
        <Badge>state</Badge>
        <Card.Title>{label}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </HStack>
    </Card.Header>
  )
}
