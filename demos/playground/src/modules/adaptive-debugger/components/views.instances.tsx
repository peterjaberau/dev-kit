"use client"

import { Badge, Box, Button, Card, Container, HStack, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react"
import { type MouseEvent, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { useInstanceManager, useSandboxInstance } from "../../adaptive-view/sandbox/instance-manager/selectors"

const categories = ["All", "Forms", "Components"] as const
type Category = (typeof categories)[number]

export function DebuggerInstancesView() {
  const { instancesList } = useInstanceManager()
  const [category, setCategory] = useState<Category>("All")
  const [search, setSearch] = useState("")
  const filtered = instancesList.filter(({ id, name }) => {
    const matchesCategory = category === "All" || name.toLowerCase().includes(category.toLowerCase())
    const matchesSearch = `${id} ${name}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Container maxW="2xl" py="5">
      <Stack gap="6">
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Search instances..."
            size="sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>
        <HStack gap="2" flexWrap="wrap">
          {categories.map((item) => (
            <Button
              key={item}
              size="xs"
              variant={category === item ? "solid" : "outline"}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </HStack>
        <Stack gap="3">
          {filtered.map(({ id, name }) => (
            <InstanceCard key={id} id={id} name={name} />
          ))}
        </Stack>
        {filtered.length === 0 && (
          <Stack align="center" py="10" gap="2">
            <Icon color="fg.muted">
              <LuSearch />
            </Icon>
            <Text color="fg.muted">No instances found</Text>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

function InstanceCard({ id, name }: { id: string; name: string }) {
  const { selectedInstanceId, sentToSandboxInstance } = useSandboxInstance()
  const selected = selectedInstanceId === id
  const select = (event: MouseEvent<HTMLButtonElement>) =>
    sentToSandboxInstance?.({ type: "ON_SELECT_INSTANCE", instanceId: event.currentTarget.value })

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
