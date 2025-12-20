import "react18-json-view/src/style.css"
import "./globals.css"
import { Provider as ChakraProvider } from "./provider"
import { DebuggerTrigger } from "#components/ui-common/debugger/debugger-trigger"
import { PlaygroundTrigger } from "#components/ui-common/playground/playground-trigger"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ overflow: "hidden" }}>
      <body suppressHydrationWarning>
        <Suspense>
          <ChakraProvider>
            {children}
            <DebuggerTrigger />
            <PlaygroundTrigger />
          </ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
