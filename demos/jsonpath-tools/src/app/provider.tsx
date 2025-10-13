"use client"
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { EngineProvider } from "#machines/engine/engine.provider"


const themeConfig: any = defineConfig({
  ...defaultConfig,
  cssVarsPrefix: "ck",
} as any)
const theme = createSystem(themeConfig)

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <EngineProvider>
        <ChakraProvider value={theme}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
              {props.children}
          </ThemeProvider>
        </ChakraProvider>
    </EngineProvider>
  )
}
