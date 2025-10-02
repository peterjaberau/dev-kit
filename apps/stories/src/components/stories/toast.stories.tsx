import type { Meta } from "@storybook/react-vite"
import { Toaster } from "@dev-kit/components"
import { Box } from "@chakra-ui/react"

export default {
  title: "Chakra / Components / Toast",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
        <Toaster />
      </Box>
    ),
  ],
} as Meta

export { ToasterBasic as Basic } from "../compositions/examples/toaster-basic"
export { ToasterClosable as Closable } from "../compositions/examples/toaster-closable"
export { ToasterLifecycle as Lifecycle } from "../compositions/examples/toaster-lifecycle"
export { ToasterPersistent as Persistent } from "../compositions/examples/toaster-persistent"
export { ToasterStatic as Static } from "../compositions/examples/toaster-static"
export { ToasterWithAction as Action } from "../compositions/examples/toaster-with-action"
export { ToasterWithDuration as Duration } from "../compositions/examples/toaster-with-duration"
export { ToasterWithExternalClose as ExternalClose } from "../compositions/examples/toaster-with-external-close"
export { ToasterWithPromise as Promise } from "../compositions/examples/toaster-with-promise"
export { ToasterWithStatus as Status } from "../compositions/examples/toaster-with-status"
export { ToasterWithUpdate as Update } from "../compositions/examples/toaster-with-update"
