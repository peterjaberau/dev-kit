"use client"

import { useState } from "react"
import { Box, Flex, IconButton, Separator, useSlotRecipe } from "@chakra-ui/react"
import {
  Bold,
  Italic,
  Link,
  Heading,
  Quote,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Underline,
  Strikethrough,
} from "lucide-react"
import { toolbarSlotRecipe } from "./styles"

interface ToolbarButtonProps {
  label: string
  icon: React.ComponentType<{ size?: number }>
  isActive: boolean
  onClick: () => void
}

const ToolbarButton = ({ label, icon: Icon, isActive, onClick }: ToolbarButtonProps) => {
  const recipe = useSlotRecipe({ recipe: toolbarSlotRecipe })
  const styles = recipe({ active: isActive })

  return (
    <IconButton aria-label={label} onClick={onClick} variant="plain" css={styles.button}>
      <Icon size={16} />
    </IconButton>
  )
}

const Toolbar = () => {
  const recipe = useSlotRecipe({ recipe: toolbarSlotRecipe })
  const styles = recipe()

  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left")
  const [activeButtons, setActiveButtons] = useState<string[]>([])

  const toggleActiveButton = (button: string) => {
    setActiveButtons((prev) => (prev.includes(button) ? prev.filter((b) => b !== button) : [...prev, button]))
  }

  return (
    <Box
      position="relative"
      w="full"
      minH="300px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="6"
      borderRadius="lg"
    >
      <Flex css={styles.root}>
        {/* Text formatting */}
        <ToolbarButton
          label="Bold"
          icon={Bold}
          isActive={activeButtons.includes("bold")}
          onClick={() => toggleActiveButton("bold")}
        />
        <ToolbarButton
          label="Italic"
          icon={Italic}
          isActive={activeButtons.includes("italic")}
          onClick={() => toggleActiveButton("italic")}
        />
        <ToolbarButton
          label="Underline"
          icon={Underline}
          isActive={activeButtons.includes("underline")}
          onClick={() => toggleActiveButton("underline")}
        />
        <ToolbarButton
          label="Strikethrough"
          icon={Strikethrough}
          isActive={activeButtons.includes("strikethrough")}
          onClick={() => toggleActiveButton("strikethrough")}
        />
        <ToolbarButton
          label="Link"
          icon={Link}
          isActive={activeButtons.includes("link")}
          onClick={() => toggleActiveButton("link")}
        />
        <ToolbarButton
          label="Heading"
          icon={Heading}
          isActive={activeButtons.includes("heading")}
          onClick={() => toggleActiveButton("heading")}
        />
        <ToolbarButton
          label="Quote"
          icon={Quote}
          isActive={activeButtons.includes("quote")}
          onClick={() => toggleActiveButton("quote")}
        />

        <Separator orientation="vertical" css={styles.divider} />

        {/* Highlight / color */}
        <ToolbarButton
          label="Highlight"
          icon={Highlighter}
          isActive={activeButtons.includes("highlight")}
          onClick={() => toggleActiveButton("highlight")}
        />
        <ToolbarButton
          label="Change Color"
          icon={Palette}
          isActive={activeButtons.includes("color")}
          onClick={() => toggleActiveButton("color")}
        />

        <Separator orientation="vertical" css={styles.divider} />

        {/* Alignment */}
        <ToolbarButton
          label="Align Left"
          icon={AlignLeft}
          isActive={textAlign === "left"}
          onClick={() => setTextAlign("left")}
        />
        <ToolbarButton
          label="Align Center"
          icon={AlignCenter}
          isActive={textAlign === "center"}
          onClick={() => setTextAlign("center")}
        />
        <ToolbarButton
          label="Align Right"
          icon={AlignRight}
          isActive={textAlign === "right"}
          onClick={() => setTextAlign("right")}
        />
      </Flex>
    </Box>
  )
}

export { Toolbar }
