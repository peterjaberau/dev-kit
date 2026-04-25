import { chakra, Icon } from "@chakra-ui/react"
import { RiCheckboxCircleFill, RiCloseCircleFill, RiInfinityLine, RiTimerLine } from "react-icons/ri"

interface TransitionEventIconProps {
  category: 'after' | 'always' | 'done' | 'error' | string | null;
}

export function TransitionEventIcon({ category }: TransitionEventIconProps) {
  if (category === 'after') {
    return (
      <Icon size={"sm"} color={"fg.muted"} css={{ shrink: 0 }}>
        <RiTimerLine />
      </Icon>
    )

  }

  if (category === 'always') {
    return (
      <Icon size={"sm"} color={"fg.muted"} css={{ shrink: 0 }}>
        <RiInfinityLine />
      </Icon>
    )


  }

  if (category === 'done') {

    return (
      <Icon size={"sm"} color={"fg.success"} css={{ shrink: 0 }}>
        <RiCheckboxCircleFill />
      </Icon>
    )
  }

  if (category === 'error') {

    return (
      <Icon size={"sm"} color={"fg.error"} css={{ shrink: 0 }}>
        <RiCloseCircleFill />
      </Icon>
    )

  }

  return null;
}
