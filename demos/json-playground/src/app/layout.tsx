import { Provider as ChakraProvider } from "./provider"
import "react18-json-view/src/style.css"
import GlobalInspector from "#components/instances/inspector.global"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense>
            <ChakraProvider>{children}

            <GlobalInspector />
            </ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
