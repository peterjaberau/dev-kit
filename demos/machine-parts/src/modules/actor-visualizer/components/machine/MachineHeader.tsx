import { Card, Separator, Badge } from "@chakra-ui/react"
interface MachineHeaderProps {
  name: string;
  description?: string;
}

export function MachineHeader({ name, description }: MachineHeaderProps) {
  return (
    <Card.Header>
      <Card.Title data-testid="machine-name">{name} <Badge>Machine</Badge></Card.Title>
      <Card.Description data-testid="root-description">{description}</Card.Description>
      <Separator/>
    </Card.Header>
  )
}
