import { Provider as ChakraProvider } from "./provider"
import 'react18-json-view/src/style.css'
import { Suspense } from "react"
import { AntdRegistry } from "@ant-design/nextjs-registry"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#FCF8F8",
        }}
      >
        <AntdRegistry>
          <Suspense>
            <ChakraProvider>{children}</ChakraProvider>
          </Suspense>
        </AntdRegistry>
      </body>
    </html>
  )
}
