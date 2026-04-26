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
      }}
    >
      <HStack>
        <StateNodeTypeIndicator
          historyType={historyType}
          isChoice={isChoice}
          isFinal={isFinal}
          isHistory={isHistory}
          isInitial={isInitial}
          isParallel={isParallel}
        />
        <HStack css={{ alignItems: "center" }}>
          <Card.Title>{label}</Card.Title>
          <Badge>state</Badge>
        </HStack>

        <Card.Description>{description}</Card.Description>
      </HStack>
      <Separator />
    </Card.Header>
  )
}
