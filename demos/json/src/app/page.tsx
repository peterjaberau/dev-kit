'use client';
import Link from 'next/link'
import { Container, Button, Stack, Wrap } from '@chakra-ui/react'
import { Provider as ChakraProvider } from "./provider"

export default function Page() {

  return (
    <ChakraProvider>
      <Container p={10}>
        <Wrap>
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
      </Container>
    </ChakraProvider>
  )
}
