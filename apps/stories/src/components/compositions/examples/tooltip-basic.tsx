import { Button } from "@chakra-ui/react"
import { Tooltip } from "@dev-kit/components"

export const TooltipBasic = () => {
  return (
    <Tooltip content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
