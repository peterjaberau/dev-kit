import { Card, Separator, Badge, HStack, VStack, Stack } from "@chakra-ui/react"
import { ReactNode } from "react"
interface MachineHeaderProps {
  name: string;
  description?: string;
  toolbar?: ReactNode;
}

export function MachineHeader({ name, description, toolbar }: MachineHeaderProps) {
  return (
    <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border" }}>
      <HStack>
        <Stack css={{ flex: 1, alignItems: "flex-start" }}>
          <Card.Title  data-testid="machine-name">
            <Badge>Machine</Badge> {name}
          </Card.Title>
          {description && <Card.Description data-testid="root-description">{description}</Card.Description>}
        </Stack>
        {toolbar && <HStack>{toolbar}</HStack>}
      </HStack>
    </Card.Header>
  )
}
