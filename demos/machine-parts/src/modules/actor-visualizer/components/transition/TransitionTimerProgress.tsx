import { chakra } from "@chakra-ui/react"
interface TransitionTimerProgressProps {
  progress: number;
}

export function TransitionTimerProgress({ progress }: TransitionTimerProgressProps) {
  return (
    <chakra.div
      data-testid="timer-progress"
      className="pointer-events-none absolute inset-0 rounded-sm"
      aria-hidden
      css={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        borderRadius: 'sm',
        background: `linear-gradient(to right, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.5) ${progress * 100}%, transparent ${progress * 100}%)`,
      }}
    />
  );
}
