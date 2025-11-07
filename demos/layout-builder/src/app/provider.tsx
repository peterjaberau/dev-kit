"use client"
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import ActorsApp from "#actors"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "#store"

const themeConfig: any = defineConfig({
  ...defaultConfig,
  cssVarsPrefix: "ck",
} as any)
const theme = createSystem(themeConfig)

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ActorsApp>
          <ReduxProvider store={store}>{props.children}</ReduxProvider>
        </ActorsApp>
      </ThemeProvider>
    </ChakraProvider>
  )
}
