import { StateNodeToken } from './StateNodeToken';
import { chakra } from "@chakra-ui/react"

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
      <chakra.span
        css={{
          textTransform: "uppercase",
          color: "fg.muted",
          mr: 0.5,
          fontSize: "md",
          fontWeight: "semibold",
          letterSpacing: "wider"
        }}
      >
        entry
      </chakra.span>
      {actions.map((action, index) => (
        <StateNodeToken key={`${action}-${index}`} value={action} />
      ))}
    </chakra.div>
  )
}
