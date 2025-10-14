"use client"
import Link from "next/link"

import { IconButton, Container, Center, Card, Stack, HStack, Text, Icon } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { registryMetadata } from "#app/examples/components"
import { MenuIcon } from "@dev-kit/icons"
import { IconNamed } from "#components/icon-named"


export default function Page() {
  return (
    <Container fluid w="full" h="full" bg={"bg.subtle"}>
      <Center py={8} >
        <Card.Root size="sm" minWidth={'350px'}>
          <Card.Header>
            <Stack>
              <HStack gap={4}>
                <MenuIcon />

                <Icon size={'2xl'}>
                  <MenuIcon />
                </Icon>
                <Icon size={'sm'}>
                  <MenuIcon />
                </Icon>

                <IconButton size={'2xl'}>
                  <MenuIcon />
                </IconButton>
                <IconButton size={'sm'}>
                  <MenuIcon />
                </IconButton>

                <IconButton variant={'ghost'} size={'2xl'}>
                  <MenuIcon />
                </IconButton>
                <IconButton variant={'ghost'} size={'sm'}>
                  <MenuIcon />
                </IconButton>

              </HStack>
              <HStack gap={4}>
                <IconNamed name={'align-self-stretch-icon'} />

                <Icon size={'2xl'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </Icon>
                <Icon size={'sm'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </Icon>

                <IconButton size={'2xl'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </IconButton>
                <IconButton size={'sm'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </IconButton>

                <IconButton variant={'ghost'} size={'2xl'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </IconButton>
                <IconButton variant={'ghost'} size={'sm'}>
                  <IconNamed name={'align-self-stretch-icon'} />
                </IconButton>



              </HStack>
            </Stack>
          </Card.Header>
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
