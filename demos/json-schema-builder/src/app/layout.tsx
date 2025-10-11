import { Provider as ChakraProvider } from "./provider"
import { Suspense } from "react"
import "../styles/globals.css"
import "../styles/App.css"
import "react18-json-view/src/style.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense>
          <ChakraProvider>{children}</ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
