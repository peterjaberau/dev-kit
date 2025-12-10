import { Center, Stack } from "@chakra-ui/react"
import { PanelDebugger } from "../../custom/panel-debugger"
import { useDockViewPanel } from "#modules/dockview/actors/selectors"

const Index = (props: any) => {
  const { panelViewScopeContext, panelViewScopedContext, sendToPanelView } = useDockViewPanel({
    panelId: props.id,
  })

  return (
    <Stack w="full" h="full" minH="200px">
      <PanelDebugger
        id={props?.id}
        data={{
          scoped: panelViewScopedContext,
        }}
      />
      <Center>Panel Base Ai Chat</Center>
    </Stack>
  )
}
export default Index
