import { TransitionActionToken } from './TransitionActionToken';
import { chakra } from "@chakra-ui/react"
interface TransitionActionsProps {
  actions: string[];
}

export function TransitionActions({ actions }: TransitionActionsProps) {
  return (
    <chakra.div
      data-testid="transition-actions"
      css={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1
      }}
    >
      {actions.map((action, index) => (
        <TransitionActionToken key={`${action}-${index}`} action={action} />
      ))}
    </chakra.div>
  )
}
