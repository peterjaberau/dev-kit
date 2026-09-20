"use client"

import { Box } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import { AppStoreProvider } from "#modules/app-store/providers"
import { useAppStore } from "#modules/app-store/selectors/use-app-store"

function AppStoreView() {
  const { appStoreContext } = useAppStore()

  return (
    <Box p="4" h="100dvh" overflow="auto">
      <JsonView src={appStoreContext} collapsed={1} />
    </Box>
  )
}

export default function AppStorePage() {
  return (
    <AppStoreProvider>
      <AppStoreView />
    </AppStoreProvider>
  )
}
