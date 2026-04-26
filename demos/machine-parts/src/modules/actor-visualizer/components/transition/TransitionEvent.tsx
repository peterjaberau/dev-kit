import { chakra, Badge } from "@chakra-ui/react"
import { TransitionEventIcon } from './TransitionEventIcon';
import { TransitionTarget } from './TransitionTarget';

interface TransitionEventProps {
  category: 'after' | 'always' | 'done' | 'error' | string | null;
  displayEvent?: string;
  isSim: boolean;
  targetDisplay: string | null;
  targetId: string;
}

export function TransitionEvent({
  category,
  displayEvent,
  isSim,
  targetDisplay,
  targetId,
}: TransitionEventProps) {
  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <TransitionEventIcon category={category} />
      {displayEvent && (
        <chakra.span
          data-testid="transition-event"
          css={{
            fontFamily: "mono",
            fontSize: "xs",
            fontWeight: "semibold",
          }}
        >
          {displayEvent}
        </chakra.span>
      )}
      {targetDisplay && <TransitionTarget isSim={isSim} targetDisplay={targetDisplay} targetId={targetId} />}
    </chakra.div>
  )
}
