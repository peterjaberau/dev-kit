"use client"
import Link from "next/link"

import { IconButton, Container, Center, Card, Stack, HStack, Text, Icon, SimpleGrid, GridItem } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { registryMeta } from "#app/examples/components"
import { MenuIcon } from "@dev-kit/icons"
import { IconNamed } from "#components/icon-named"


export default function Page() {
  return (
    <Container fluid w="full" h="full" bg={"bg.subtle"}>
      <Center py={8} >
        <Card.Root size="sm" minWidth={'350px'} boxShadow={'sm'} borderRadius={'md'}>
          <Card.Header>
            <Card.Title>
              <HStack gap={4} >
                <Icon size={'lg'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </Icon>
                Examples

              </HStack>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <SimpleGrid columns={3} bg={'bg.subtle'} borderRadius={'md'}  borderWidth={'1px'} gap={4} p={4}>
              {Object.keys(registryMeta).map((keyName) => (
                <HStack
                  boxShadow={'sm'}
                  bg={'bg.panel'}
                  py="3"
                  px="2.5"
                  rounded="l2"
                  key={keyName}
                  asChild
                  justify="space-between"
                  focusRing="inside"
                  transition="backgrounds"
                  _hover={{ layerStyle: "fill.subtle" }}
                >
                  <Link href={`/examples/${keyName}` || "#"} passHref>
                    <Text as="span">{keyName}</Text>
                    <Icon color="colorPalette.fg">
                      <LuArrowRight />
                    </Icon>
                  </Link>
                </HStack>
              ))}
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </Center>
    </Container>
  )
}
