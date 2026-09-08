'use client';
import { Badge, Box, Button, Card, Container, HStack, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react"
import { type MouseEvent, useState } from "react"
import { LuSearch } from "react-icons/lu"

import {
    useInstanceManager,
    useSandboxInstance,
} from '../../instance-manager/selectors';


export const categories = ["All", "Forms", "Components"] as const
type Category = (typeof categories)[number]


export function ViewSandboxPlayground() {
    const { instancesList } = useInstanceManager();

  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [search, setSearch] = useState("")

  const filtered = instancesList.filter(({ id, name }) => {
    const normalizedId = id.toLowerCase()
    const normalizedName = name.toLowerCase()
    const normalizedSearch = search.toLowerCase()
    const matchesCategory =
      activeCategory === "All" ||
      normalizedName.includes(activeCategory.toLowerCase())
    const matchesSearch =
      normalizedId.includes(normalizedSearch) ||
      normalizedName.includes(normalizedSearch)
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Container maxW="2xl" py="5">
        <Stack gap="6">
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input
              placeholder="Search instances..."
              size="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <HStack gap="2" flexWrap="wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="xs"
                variant={activeCategory === cat ? "solid" : "outline"}
                colorPalette={activeCategory === cat ? undefined : "gray"}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </HStack>

          <Stack gap="3">
            {filtered.map(({ id, name }) => (
              <InstanceCard
                key={id}
                id={id}
                name={name}
              />
            ))}
          </Stack>

          {filtered.length === 0 && (
            <Stack align="center" py="10" gap="2">
              <Icon fontSize="2xl" color="fg.muted">
                <LuSearch />
              </Icon>
              <Text color="fg.muted" textStyle="sm">
                No instances found
              </Text>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  )
}


interface InstanceCardProps {
  id: string
  name: string
}

const InstanceCard = (props: InstanceCardProps) => {
  const { id, name } = props
  const { selectedInstanceId, sentToSandboxInstance } = useSandboxInstance()
  const selected = selectedInstanceId === id

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    sentToSandboxInstance?.({
      type: "ON_SELECT_INSTANCE",
      instanceId: event.currentTarget.value,
    })
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
