import type { Meta } from "@storybook/react-vite"
import { Box } from "@chakra-ui/react"

export default {
  title: "Experiments / Components / Resizable Panel",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} as Meta

export {
  ResizablePanelBasic as Basic,
  ResizablePanelWithTabs as WithChildren,
} from "../../compositions/examples/experiments/resizable-panel"
