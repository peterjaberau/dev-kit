"use client"
import { ButtonStory } from "#object-ui/components/stories/button"
import { SchemaRenderer, SchemaRendererProvider } from "#object-ui/react"
import { initializeComponents } from "#object-ui/components"

initializeComponents();

export default function Page() {
  return <ButtonStory />
}
