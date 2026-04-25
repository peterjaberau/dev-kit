import { chakra, Text, Heading } from "@chakra-ui/react"
interface MachineHeaderProps {
  name: string;
  description?: string;
}

export function MachineHeader({ name, description }: MachineHeaderProps) {
  return (
    <>
      <Heading
        data-testid="machine-name"
        css={{
          track: "wider",
        }}
      >
        {name}
      </Heading>
      {description && (
        <Text data-testid="root-description" textStyle="sm" css={{ color: "fg.muted", mt: 1}} >
          {description}
        </Text>
      )}
    </>
  )
}
