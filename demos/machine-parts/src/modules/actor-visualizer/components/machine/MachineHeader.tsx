import { Card, Separator, Badge } from "@chakra-ui/react"
interface MachineHeaderProps {
  name: string;
  description?: string;
}

export function MachineHeader({ name, description }: MachineHeaderProps) {
  return (
    <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border" }}>
      <Card.Title data-testid="machine-name">
        <Badge>Machine</Badge> {name}
      </Card.Title>
      {description && <Card.Description data-testid="root-description">{description}</Card.Description>}
    </Card.Header>
  )
}
