import { StateNodeToken } from './StateNodeToken';
import { chakra, Badge } from "@chakra-ui/react"

interface StateNodeExitProps {
  actions: string[];
  hasEntry: boolean;
}

export function StateNodeExit({ actions, hasEntry }: StateNodeExitProps) {
  return (
    <chakra.div
      data-testid="state-exit"
      css={{
        px: 2.5,
        py: 1,
        gap: 1,
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        minW: 0,

        alignItems: "center",
        ...(hasEntry && {
          borderLeftWidth: "thin",
          borderLeftStyle: "solid",
          borderLeftColor: "border",
        }),
      }}
    >
      <Badge>Exit</Badge>
      {actions.map((action, index) => (
        <StateNodeToken key={`${action}-${index}`} value={action} />
      ))}
    </chakra.div>
  )
}
