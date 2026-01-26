"use client"
import { useEffect, useState } from "react"
import { isValidElementType } from "react-is"
import { Container, IconButton, Button, Wrap } from "@chakra-ui/react"

let cache: Record<string, any> | null = null

async function loadIcons() {
  if (cache) return cache

  const icons = await import("@dev-kit/icons")

  cache = Object.fromEntries(Object.entries(icons).filter(([, v]) => isValidElementType(v)))

  return cache
}

export default function Page() {
  const [icons, setIcons] = useState<Record<string, any>>({})

  useEffect(() => {
    loadIcons().then(setIcons)
  }, [])

  return (
    <Container p={10}>
      <Wrap>
        {Object.entries(icons).map(([name, Icon]) => (
          <Button size={'xs'} variant="outline" key={name} aria-label={name}>
            <Icon /> {name}
          </Button>
        ))}
      </Wrap>
    </Container>
  )
}
