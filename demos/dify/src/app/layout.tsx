import { Provider as ChakraProvider } from "./provider"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ height: '100%', userSelect: 'auto', maxWidth: '100vw', overflow: 'hidden' }}>
        <Suspense>
            <ChakraProvider>{children}</ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
