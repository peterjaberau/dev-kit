import { chakra } from "@chakra-ui/react"
interface StateNodeDescriptionProps {
  description: string;
}

export function StateNodeDescription({ description }: StateNodeDescriptionProps) {
  return (
    <chakra.div
      data-testid="state-description"
      css={{
        borderTopWidth: "thin",
        borderTopStyle: "solid",
        borderTopColor: "border",
        color: "fg.muted",
        px: 2.5,
        py: 1,
        fontSize: "xs",
        fontStyle: "italic"
      }}
    >
      {description}
    </chakra.div>
  )
}
