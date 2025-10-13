'use client'
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { applicationTheme, applicationCSSVariablesResolver } from "./theme"
import Page from "./page"

/**
 * Root component of the application.
 */
export const Playground = () => {
  return (
    <MantineProvider
      theme={applicationTheme}
      cssVariablesResolver={applicationCSSVariablesResolver}
      defaultColorScheme="auto"
    >
      <Page />
    </MantineProvider>
  )
}
