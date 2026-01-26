import "./globals.css"
import { Provider as ChakraProvider } from "./provider"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
        <Suspense>
          <ChakraProvider>{children}</ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
