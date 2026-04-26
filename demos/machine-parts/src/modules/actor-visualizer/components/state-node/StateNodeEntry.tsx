import { StateNodeToken } from './StateNodeToken';
import { chakra, Badge } from "@chakra-ui/react"

interface StateNodeEntryProps {
  actions: string[];
}

export function StateNodeEntry({ actions }: StateNodeEntryProps) {
  return (
    <chakra.div
      data-testid="state-entry"
      css={{
        px: 2.5,
        py: 1,
        gap: 1,
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        minW: 0,
        alignItems: "center",
      }}
    >
      <Badge>Entry</Badge>
      {actions.map((action, index) => (
        <StateNodeToken key={`${action}-${index}`} value={action} />
      ))}
    </chakra.div>
  )
}
