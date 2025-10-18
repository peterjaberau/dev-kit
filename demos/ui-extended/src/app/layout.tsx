import { Provider as ChakraProvider } from "./provider"
import { Suspense } from "react"
import "react18-json-view/src/style.css"
import { Container, Flex, HStack, Stack, Wrap, Box } from "@chakra-ui/react"
import { FilterAndNavigate } from './_app/components/filter-and-navigate'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense>
          <ChakraProvider>
            <Container
              fluid
              css={{
                zIndex: 30,
                position: "sticky",
                top: "0px",
                borderBottomWidth: "var(--navbar-border)",
              }}
            >
              <Container fluid w={"full"}>
                <HStack
                  css={{
                    width: "full",
                    height: "var(--navbar-height)",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FilterAndNavigate />


                </HStack>
              </Container>
            </Container>
            <Container
              fluid
              padding={0}
              paddingTop={3}
              css={{
                display: "block",
                boxSizing: "border-box",
                width: "full",
                backgroundColor: "bg.subtle",
                height: "var(--global-sticky-height)",
              }}
            >
              <Stack
                css={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Flex flex={1} overflowX={"auto"} paddingBottom={3}>
                  <Flex width={"full"} flex={1} paddingX={3}>
                    <Box
                      borderRadius={"lg"}
                      css={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        isolation: "isolate",
                      }}
                    >
                      {children}
                    </Box>
                  </Flex>
                </Flex>
                <Wrap
                  position={"sticky"}
                  bottom={0}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  paddingX={3}
                  paddingY={3}
                  backgroundColor={"bg.panel"}
                >
                  bottom
                </Wrap>
              </Stack>
            </Container>
          </ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
