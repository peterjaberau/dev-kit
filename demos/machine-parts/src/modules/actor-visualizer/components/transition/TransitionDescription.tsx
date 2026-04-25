import { chakra } from "@chakra-ui/react"
interface TransitionDescriptionProps {
  description: string;
}

export function TransitionDescription({ description }: TransitionDescriptionProps) {
  return (
    <chakra.div
      css={{
        fontSize: "xs",
        fontStyle: "italic",
        color: "fg.muted",
      }}
    >
      {description}
    </chakra.div>
  )
}
