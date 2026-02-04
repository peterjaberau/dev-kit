import "./globals.css"
import { ProviderWithoutPreflight as ChakraProvider } from "./provider-without-preflight"
import { ProviderActorApp } from './provider-actor-app'
import { Suspense } from "react"
import { Nav } from "./nav"
import { Container, HStack, SimpleGrid } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ height: "100vh", width: "100%", overflow: 'hidden' }}>
        <Suspense>
          <ProviderActorApp>
            <ChakraProvider>
              <Nav />
              <Container w={'full'} h={'full'}>
                <HStack h={'full'} justifyContent={"flex-end"} my={4}>
                  {children}
                </HStack>
              </Container>
            </ChakraProvider>
          </ProviderActorApp>
        </Suspense>
      </body>
    </html>
  )
}
