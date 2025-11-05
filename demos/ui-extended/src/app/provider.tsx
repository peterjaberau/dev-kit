"use client"
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { EngineProvider } from "#machines/engine/engine.provider"
import { globalCss } from "@chakra-ui/react/theme"
import "@cloudscape-design/global-styles/index.css"
import RootApp from "./_app"

const themeConfig: any = defineConfig({
  ...defaultConfig,
  globalCss: {
    ...globalCss,
    ":root": {
      "--navbar-height": "48px",
      "--navbar-border": "1px",
      "--global-sticky-height": "calc(100vh - var(--navbar-height) - var(--navbar-border))",
    },
  },

  // cssVarsPrefix: "ck",
} as any)
const theme = createSystem(themeConfig)

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <EngineProvider>
      <ChakraProvider value={theme}>
        <RootApp>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            {props.children}
          </ThemeProvider>
        </RootApp>
      </ChakraProvider>
    </EngineProvider>
  )
}
