"use client"

import { Badge, Box, Button, Card, Container, HStack, Icon, Input, InputGroup, Stack, Text } from "@chakra-ui/react"
import { type MouseEvent, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { useLayoutManager, useSandboxLayout } from "../../adaptive-view/sandbox/layout-manager/selectors"

export function DebuggerPanelsView() {
  const { panelsList } = useLayoutManager()
  const [search, setSearch] = useState("")
  const filtered = panelsList.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Container maxW="2xl" py="5">
      <Stack gap="6">
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Search panels..."
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
          {filtered.map((panel) => (
            <PanelCard key={panel.id} {...panel} />
          ))}
        </Stack>
        {filtered.length === 0 && <EmptyState label="No panels found" />}
      </Stack>
    </Container>
  )
}

function PanelCard({ id, name }: { id: string; name: string }) {
  const { selectedPanelId, sentToSandboxLayout } = useSandboxLayout()
  const selected = selectedPanelId === id
  const select = (event: MouseEvent<HTMLButtonElement>) =>
    sentToSandboxLayout?.({ type: "ON_SELECT_PANEL", panelId: event.currentTarget.value })

  return <ItemCard id={id} name={name} selected={selected} value={id} onSelect={select} />
}

function ItemCard({
  id,
  name,
  selected,
  value,
  onSelect,
}: {
  id: string
  name: string
  selected: boolean
  value: string
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Card.Root size="sm" variant={selected ? "elevated" : "outline"}>
      <Card.Body>
        <HStack gap="4">
          <Box flex="1">
            <HStack gap="2">
              <Card.Title textStyle="sm">{name}</Card.Title>
              <Badge size="sm" variant="outline">
                {id}
              </Badge>
            </HStack>
          </Box>
          <Button
            type="button"
            value={value}
            onClick={onSelect}
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

function EmptyState({ label }: { label: string }) {
  return (
    <Stack align="center" py="10" gap="2">
      <Icon fontSize="2xl" color="fg.muted">
        <LuSearch />
      </Icon>
      <Text color="fg.muted" textStyle="sm">
        {label}
      </Text>
    </Stack>
  )
}
