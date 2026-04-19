import type { Meta } from "@storybook/react-vite"
import { Box } from "@chakra-ui/react"

export default {
  title: "Special / Components / Floating Panel",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} as Meta

export { FloatingPanelPlayground as Playground } from "../../compositions/examples/components/floating-panel-playground"
