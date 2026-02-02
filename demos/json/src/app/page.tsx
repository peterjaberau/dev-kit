'use client';
import Link from 'next/link'
import { Container, Button, Stack, Wrap, SimpleGrid } from "@chakra-ui/react"
import { Provider as ChakraProvider } from "./provider"

export default function Page() {

  return (
    <ChakraProvider>
      <Container p={10}>
        <SimpleGrid columns={1} gap={10}>
          <Wrap w={"full"}>
            <Button asChild>
              <Link href="/discovery/json-mapper">Json Mapper</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/tree-file">Tree File</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/json-inspect">Json Inspect</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/jschema-dev">jschema-dev</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/jsonjoy-builder">jsonjoy-builder</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/code-editor-x">code-editor-x</Link>
            </Button>

            <Button asChild>
              <Link href="/discovery/sureal">sureal</Link>
            </Button>
          </Wrap>

          <Wrap w={"full"}>
            <Button asChild>
              <Link href="/discovery/resizable-panels/react-sidepanes">React SidePanes</Link>
            </Button>

            <Button asChild>
              <Link href="/inspector-drawer">inspector-drawer</Link>
            </Button>

            {/*  inspector-drawer*/}
          </Wrap>
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  )
}
