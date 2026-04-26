import { chakra, Icon, Badge } from "@chakra-ui/react"
import { RiCheckboxCircleFill, RiFlashlightLine, RiCloseCircleFill, RiInfinityLine, RiTimerLine } from "react-icons/ri"

interface TransitionEventIconProps {
  category: "after" | "always" | "done" | "error" | string | null
}

export function TransitionEventIcon({ category }: TransitionEventIconProps) {
  if (category === "after") {
    return (
      <Badge variant={"outline"}>
        <RiTimerLine />
        after
      </Badge>
    )
  }

  if (category === "always") {
    return (
      <Badge variant={"outline"}>
        <RiInfinityLine />
        always
      </Badge>
    )
  }

  if (category === "done") {
    return (
      <Badge variant={"outline"}>
        <RiCheckboxCircleFill />
        done
      </Badge>
    )
  }

  if (category === "error") {
    return (
      <Badge colorPalette={"red"} variant={"solid"}>
        <RiCloseCircleFill />
        error
      </Badge>
    )
  }

  if (!category) {
    return (
      <Badge variant={"outline"}>
        <RiFlashlightLine />
        event
      </Badge>
    )
  }

  return null
}
