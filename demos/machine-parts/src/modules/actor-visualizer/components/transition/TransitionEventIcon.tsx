import { chakra, Icon, Badge, HStack, Text } from "@chakra-ui/react"
import { RiCheckboxCircleFill, RiFlashlightLine, RiCloseCircleFill, RiInfinityLine, RiTimerLine } from "react-icons/ri"

interface TransitionEventIconProps {
  category: "after" | "always" | "done" | "error" | "none" | string | null | any
}

const iconMap: any = {
  after: <RiTimerLine />,
  always: <RiInfinityLine />,
  done: <RiCheckboxCircleFill />,
  error: <RiCloseCircleFill />,
  event: <RiFlashlightLine />,
  none: <RiFlashlightLine />,
}

export function TransitionEventIcon({ category }: TransitionEventIconProps) {

  return (
    <HStack
      css={{
        alignItems: "center",
      }}
    >
      <Icon size="sm" color={"gray.500"}>
        {iconMap[category || "none"]}
      </Icon>
      <Text css={{ textTransform: "uppercase", color: "gray.500", fontFamily: "mono", fontSize: "xs", fontWeight: "semibold" }}>
        {category || "event"}
      </Text>
    </HStack>
  )

}
