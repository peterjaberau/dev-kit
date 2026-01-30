import { memo } from "react"
import { Center, Splitter } from "@chakra-ui/react"

type Props = {
  from: string
  to: string
  enabled: boolean
}

// When enabled=true, this renders a real Splitter.Panel (must be under Splitter.Root context).
// When enabled=false, render only content (no Splitter.*), so zag doesn't look for panel indices.
const FloatingSplitterPanel = memo(function FloatingSplitterPanel({
                                                                    to,
                                                                    enabled,
                                                                  }: Props) {
  if (!enabled) {
    return (
      <Center boxSize="full" textStyle="2xl">
        floating panel
      </Center>
    )
  }

  return (
    <Splitter.Panel id={to}>
      <Center boxSize="full" textStyle="2xl">
        floating panel
      </Center>
    </Splitter.Panel>
  )
})

export default FloatingSplitterPanel