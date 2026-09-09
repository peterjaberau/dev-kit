"use client"

import { Badge, Box, Button, Card, Container, HStack, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react"
import { type MouseEvent, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { useLayoutManager, useSandboxLayout } from "../../layout-manager/selectors"

const categories = ["All"] as const

export function ViewLayoutGroups() {
  const { groupsList } = useLayoutManager()
  const [search, setSearch] = useState("")
  const normalizedSearch = search.toLowerCase()
  const filteredGroups = groupsList.filter(({ id, name }) => `${id} ${name}`.toLowerCase().includes(normalizedSearch))

  return (
    <Container maxW="2xl" py="5">
      <Stack gap="6">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search groups..."
            size="sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>
        <HStack gap="2" flexWrap="wrap">
          {categories.map((category) => (
            <Button key={category} size="xs" variant="solid">
              {category}
            </Button>
          ))}
        </HStack>
        <Stack gap="3">
          {filteredGroups.map((group) => (
            <LayoutGroupCard key={group.id} id={group.id} name={group.name} />
          ))}
        </Stack>
        {filteredGroups.length === 0 && (
          <Stack align="center" py="10" gap="2">
            <Icon fontSize="2xl" color="fg.muted">
              <LuSearch />
            </Icon>
            <Text color="fg.muted" textStyle="sm">
              No groups found
            </Text>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

interface LayoutGroupCardProps {
  id: string
  name: string
}

function LayoutGroupCard({ id, name }: LayoutGroupCardProps) {
  const { selectedGroupId, sentToSandboxLayout } = useSandboxLayout()
  const selected = selectedGroupId === id

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    sentToSandboxLayout?.({ type: "ON_SELECT_GROUP", groupId: event.currentTarget.value })
  }

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
            onClick={handleSelect}
            size="sm"
            variant={selected ? "solid" : "outline"}
            colorPalette={selected ? "blue" : "gray"}
            bg={selected ? undefined : "bg"}
            aria-pressed={selected}
          >
            {selected ? "Selected" : "Select"}
          </Button>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
