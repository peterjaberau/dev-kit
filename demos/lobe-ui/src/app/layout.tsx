import { Provider as ChakraProvider } from "./provider"
import { Suspense } from "react"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          // overflow: "hidden",
          backgroundColor: "white"
        }}
      >
        <Suspense>
            <ChakraProvider>{children}</ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
