"use client"
import {
  Container,
  For,
  Center,
  SimpleGrid,
  HStack,
  Stack,
  Button,
  Text,
  GridItem,
  DataList,
  Card,
  Tag,
  Badge,
} from "@chakra-ui/react"
import { Search } from "#components/Search"
import { searchSelector } from "#actors/selectors"
import { SearchPanel } from './components'

export default function Page() {
  const { searchQuery, searchResults, searchCount, selected } = searchSelector()

  return (
    <Container fluid css={{ h: "100vh", p: 8 }}>
      <Stack css={{ h: "full" }}>
        <SimpleGrid columns={4} gap={4}>
          <SearchPanel />

          <Card.Root css={{ boxShadow: "sm", borderRadius: "md" }}>
            <Card.Header>
              <Card.Title>title</Card.Title>
              <Card.Description>description </Card.Description>
            </Card.Header>

            <Card.Body>
              <Stack gap="4">

                test
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
