import { Button } from "@chakra-ui/react"
import { ToggleTip } from "@dev-kit/components"
import { LuInfo } from "react-icons/lu"

export const ToggleTipBasic = () => {
  return (
    <ToggleTip content="This is some additional information.">
      <Button size="xs" variant="ghost">
        <LuInfo />
      </Button>
    </ToggleTip>
  )
}
