"use client"

import { Badge, Box, Button, Card, Container, HStack, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react"
import { type MouseEvent, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { useLayoutManager, useSandboxLayout } from "../../adaptive-view/sandbox/layout-manager/selectors"

export function DebuggerGroupsView() {
  const { groupsList } = useLayoutManager()
  const [search, setSearch] = useState("")
  const filtered = groupsList.filter(({ id, name }) => `${id} ${name}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <Container maxW="2xl" py="5">
      <Stack gap="6">
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Search groups..."
            size="sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>
        <HStack>
          <Button size="xs" variant="solid">
            All
          </Button>
        </HStack>
        <Stack gap="3">
          {filtered.map(({ id, name }) => (
            <GroupCard key={id} id={id} name={name} />
          ))}
        </Stack>
        {filtered.length === 0 && (
          <Stack align="center" py="10" gap="2">
            <Icon color="fg.muted">
              <LuSearch />
            </Icon>
            <Text color="fg.muted">No groups found</Text>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

function GroupCard({ id, name }: { id: string; name: string }) {
  const { selectedGroupId, sentToSandboxLayout } = useSandboxLayout()
  const selected = selectedGroupId === id
  const select = (event: MouseEvent<HTMLButtonElement>) =>
    sentToSandboxLayout?.({ type: "ON_SELECT_GROUP", groupId: event.currentTarget.value })

  return (
    <Card.Root size="sm" variant={selected ? "elevated" : "outline"}>
      <Card.Body>
        <HStack gap="4">
          <Box flex="1">
            <HStack gap="2">
              <Card.Title textStyle="sm">{id}</Card.Title>
              <Badge size="sm" variant="outline">
                {name}
              </Badge>
            </HStack>
          </Box>
          <Button
            type="button"
            value={id}
            onClick={select}
            size="sm"
            variant={selected ? "solid" : "outline"}
            colorPalette={selected ? "blue" : "gray"}
            aria-pressed={selected}
          >
            {selected ? "Selected" : "Select"}
          </Button>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
