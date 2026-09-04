import { PlaygroundProvider } from "./render/playground-provider"
import { Flex } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex m="0" maxW="full" p="2.5" h="100dvh" minH="0" gap="2.5" bg="bg" direction={"row"}>
      <PlaygroundProvider>
        {children}
      </PlaygroundProvider>
    </Flex>
  )
}
