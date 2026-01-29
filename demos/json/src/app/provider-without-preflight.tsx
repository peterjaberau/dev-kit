"use client"
import { scan } from "react-scan"
import { ChakraProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import ActorsApp from "#actors"

const themeConfig: any = defineConfig({
  ...defaultConfig,
  preflight: false,
  // cssVarsPrefix: 'chakra',
} as any)
const theme = createSystem(themeConfig)

// scan({
  // enabled: true,
  // showToolbar: true,
  // animationSpeed: "off",
  // trackUnnecessaryRenders: true,
  // dangerouslyForceRunInProduction: true,
  // // log: true,
  // onRender: (fiber: any, renders: any[]) => {
  //   console.log("onRender fired")
  //   console.log("Fiber:", fiber)
  //   console.log("Renders:", renders)
  // },
  // onPaintStart: (outlines: any) => {
  //   console.log("onPaintStart fired")
  //   console.log("Outlines:", outlines)
  // },
  // onPaintEnd: (outlines: any) => {
  //   console.log("onPaintEnd fired")
  //   console.log("Outlines:", outlines)
  // },
// })

export const ProviderWithoutPreflight = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ActorsApp>{props.children}</ActorsApp>
      </ThemeProvider>
    </ChakraProvider>
  )
}
