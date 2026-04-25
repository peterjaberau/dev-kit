import { chakra } from "@chakra-ui/react"
interface TransitionGuardProps {
  guard?: string
  prefix?: string
}

export function TransitionGuard({ guard, prefix }: TransitionGuardProps) {
  if (guard && prefix) {
    return (
      <chakra.div
        css={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "sm",
        }}
      >
        <chakra.span
          css={{
            color: "fg.muted",
            fontWeight: "semibold",
            fontStyle: "italic",
          }}
        >
          {prefix}
        </chakra.span>
        <chakra.span
          css={{
            fontFamily: "mono",
          }}
        >
          {guard}
        </chakra.span>
      </chakra.div>
    )
  }

  if (guard) {
    return (
      <chakra.div
        css={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "sm",
        }}
      >
        <chakra.span
          css={{
            fontFamily: "mono",
          }}
        >
          {guard}
        </chakra.span>
      </chakra.div>
    )
  }

  if (prefix === "else") {
    return (
      <chakra.div
        css={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "sm",
        }}
      >
        <chakra.span
          css={{
            color: "fg.muted",
            fontWeight: "semibold",
            fontStyle: "italic",
          }}

        >
          else
        </chakra.span>
      </chakra.div>
    )
  }

  return null
}
