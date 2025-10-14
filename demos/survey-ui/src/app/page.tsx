"use client"
import Link from "next/link"

import { Container, Center, Card, Stack, HStack, Text, Icon } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { registryMetadata } from "#app/examples/components"

export default function Page() {
  return (
    <Container fluid w="full" h="full" bg={"bg.subtle"}>
      <Center py={8} >
        <Card.Root size="sm" minWidth={'350px'}>
          <Card.Body>
            <Stack gap="2">
              {registryMetadata.map((registryItem) => (
                <HStack
                  py="3"
                  px="2.5"
                  rounded="l2"
                  key={registryItem.id}
                  asChild
                  justify="space-between"
                  focusRing="inside"
                  transition="backgrounds"
                  _hover={{ layerStyle: "fill.subtle" }}
                >
                  <Link href={`/examples/${registryItem.id}` || "#"} passHref>
                    <Text as="span">{registryItem.title}</Text>
                    <Icon color="colorPalette.fg">
                      <LuArrowRight />
                    </Icon>
                  </Link>
                </HStack>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
      </Center>
    </Container>
  )
}
