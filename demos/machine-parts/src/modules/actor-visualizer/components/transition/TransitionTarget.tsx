import { chakra } from "@chakra-ui/react"
interface TransitionTargetProps {
  isSim: boolean;
  targetDisplay: string;
  targetId: string;
}

export function TransitionTarget({ isSim, targetDisplay, targetId }: TransitionTargetProps) {
  return (
    <>
      <chakra.span
        css={{
          color: "fg.muted",
        }}
      >
        &rarr;
      </chakra.span>
      {isSim ? (
        <chakra.span
          css={{
            fontFamily: "mono",
            fontSize: "xs",
          }}
        >
          {targetDisplay}
        </chakra.span>
      ) : (
        <chakra.a
          href={`#${targetId}`}
          css={{
            textDecoration: "underline",
            textDecorationColor: "blue.300",
            fontFamily: "mono",
            fontSize: "xs",
            _hover: {
              textDecorationColor: "blue",
            },
          }}
          onClick={(event) => event.stopPropagation()}
        >
          {targetDisplay}
        </chakra.a>
      )}
    </>
  )
}
