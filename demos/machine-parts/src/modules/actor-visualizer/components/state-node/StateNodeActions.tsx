import { chakra } from "@chakra-ui/react"
import { StateNodeEntry } from './StateNodeEntry';
import { StateNodeExit } from './StateNodeExit';

interface StateNodeActionsProps {
  entry: string[];
  exit: string[];
}

export function StateNodeActions({ entry, exit }: StateNodeActionsProps) {
  return (
    <chakra.div
      data-testid="state-actions"
      css={{
        display: "flex",
        flexWrap: "wrap",
        borderTopWidth: "thin",
        borderStyle: "solid",
        borderColor: "border",
      }}
    >
      {entry.length > 0 && <StateNodeEntry actions={entry} />}
      {exit.length > 0 && <StateNodeExit actions={exit} hasEntry={entry.length > 0} />}
    </chakra.div>
  )
}
