"use client"
import { Button, HStack } from "@chakra-ui/react"

export interface PluginButtonProps {
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain"
  content?: string
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  colorPalette?: "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"
  disabled?: boolean
}

export default function Index (props: PluginButtonProps) {
  const { variant = "solid", content = "Button", size = "md", colorPalette = "gray", disabled = false } = props

  return (
    <HStack wrap="wrap" gap="6">
      <Button variant={variant} colorPalette={colorPalette} size={size} disabled={disabled}>
        {content}
      </Button>
    </HStack>
  )
}
