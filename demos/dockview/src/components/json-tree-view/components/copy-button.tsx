import { useContext, useState } from "react"
import { IconButton, useSlotRecipe } from "@chakra-ui/react"

import { BiCopy as CopyIcon, BiCheckCircle as CopiedIcon } from "react-icons/bi"
import { jsonViewTreeSlotRecipe } from "../json-view-tree.slot-recipe"

import { JsonViewContext } from "./json-view"
import { writeClipboard } from "../utils"
import { NodeMeta } from "../types"

interface Props {
  node: any
  nodeMeta: NodeMeta
}

export default function CopyButton({ node, nodeMeta }: Props) {
  const { customizeCopy, CopyComponent, CopiedComponent } = useContext(JsonViewContext)

  const recipe = useSlotRecipe({ recipe: jsonViewTreeSlotRecipe })
  const { copy: cssCopy } = recipe()

  const [copied, setCopied] = useState(false)

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation()

    const value = customizeCopy(node, nodeMeta)

    if (typeof value === "string" && value) {
      writeClipboard(value)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return copied ? (
    typeof CopiedComponent === "function" ? (
      <CopiedComponent
        css={{
          ...cssCopy,
          // display: "inline-block",
        }}
      />
    ) : (
      <IconButton
        variant="ghost"
        size="2xs"
        css={{
          ...cssCopy,
          // display: "inline-block",
        }}
      >
        <CopiedIcon />
      </IconButton>
    )
  ) : typeof CopyComponent === "function" ? (
    <CopyComponent
      onClick={copyHandler}
      css={{
        ...cssCopy,
      }}
    />
  ) : (
    <IconButton
      onClick={copyHandler}
      variant="ghost"
      size="2xs"
      css={{
        ...cssCopy,
      }}
    >
      <CopyIcon />
    </IconButton>

    // <CopySVG onClick={copyHandler} className='json-view--copy' />
  )
}
