"use client"
import Link from "next/link"

import {
  IconButton,
  Container,
  Center,
  Card,
  Stack,
  HStack,
  Text,
  Icon,
  SimpleGrid,
  GridItem,
  For,

} from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { registryMetadata } from "#app/examples/components"
import { MenuIcon } from "@dev-kit/icons"
import { IconNamed, iconRegistry } from "#components/icon-named"

const iconRegistryList = Object.keys(iconRegistry)

export default function Page() {
  return (
    <Container fluid w="full" h="full" bg={"bg.subtle"}>
      <Center py={8}>
        <Card.Root size="sm">
          <Card.Header>
            <Card.Title>Icons</Card.Title>
          </Card.Header>
          <Card.Body>
            <SimpleGrid columns={8} gap={8}>
              <For each={iconRegistryList}>
                {(item, index) => (
                  <GridItem key={item} width={"200px"} height={"125px"}>
                    <Center width={"full"} height={"full"} boxShadow={'sm'} borderRadius={'sm'}>
                      <Stack alignItems={'center'}>
                        <Icon size={'2xl'}>
                          <IconNamed name={item} />
                        </Icon>
                        <Text textStyle={'xs'}>{item}</Text>
                      </Stack>
                    </Center>
                  </GridItem>
                )}
              </For>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </Center>
    </Container>
  )
}
