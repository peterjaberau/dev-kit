import type { Meta } from "@storybook/react-vite"
import { Box } from "@chakra-ui/react"

export default {
  title: "Special / Components / Draggable Panel",
  decorators: [
    (Story: any) => (
      <Box  css={{ border: "1px solid", borderColor: "border", h: "700px" }}>
        <Story />
      </Box>
    ),
  ],
} as Meta

export {
  DraggablePanelAppShell as AppShell,
} from "../../compositions/examples/components/draggable-panel-appshell"
