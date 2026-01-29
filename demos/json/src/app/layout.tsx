import "./globals.css"
import { ProviderWithoutPreflight as ChakraProvider } from "./provider-without-preflight"
import { ProviderActorApp } from './provider-actor-app'
import { Suspense } from "react"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ height: "100vh", width: "100%" }}>
        <Suspense>
          <ProviderActorApp>
            <ChakraProvider>{children}</ChakraProvider>
          </ProviderActorApp>
        </Suspense>
      </body>
    </html>
  )
}
