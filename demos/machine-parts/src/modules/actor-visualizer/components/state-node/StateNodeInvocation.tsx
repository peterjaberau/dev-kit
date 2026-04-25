import { StateNodeToken } from './StateNodeToken';
import { chakra } from "@chakra-ui/react"
interface StateNodeInvocationProps {
  invocations: string[];
}

export function StateNodeInvocation({ invocations }: StateNodeInvocationProps) {
  return (
    <chakra.div
      data-testid="state-invocations"
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
          letterSpacing: "wider",
        }}
      >
        invoke
      </chakra.span>
      {invocations.map((invocation, index) => (
        <StateNodeToken key={`${invocation}-${index}`} value={invocation} />
      ))}
    </chakra.div>
  )
}
