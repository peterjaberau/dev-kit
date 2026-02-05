"use client"
import { motion } from "motion/react"
import { ThemeProvider, ConfigProvider } from "@devkit/ui"
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
// import { ThemeProvider } from 'next-themes';
import ActorsApp from "#actors"

const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any)
const theme = createSystem(themeConfig)

export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ConfigProvider motion={motion}>
      <ChakraProvider value={theme}>
        <ThemeProvider>
          <ActorsApp>{props.children}</ActorsApp>
        </ThemeProvider>
      </ChakraProvider>
    </ConfigProvider>
  )
}
