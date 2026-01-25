'use client';
import Link from 'next/link'
import { Container, Button, Stack, Wrap } from '@chakra-ui/react'

export default function Page() {

  return (
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

      </Wrap>
    </Container>
  )
}
