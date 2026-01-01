"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { chakra } from "@chakra-ui/react"

/* -------------------------------------------------------------------------- */
/* Chakra-wrapped Radix primitives                                             */
/* -------------------------------------------------------------------------- */

const ChakraCollapsibleRoot = chakra(CollapsiblePrimitive.Root)
const ChakraCollapsibleTrigger = chakra(CollapsiblePrimitive.Trigger)
const ChakraCollapsibleContent = chakra(CollapsiblePrimitive.Content)

/* -------------------------------------------------------------------------- */
/* Public components (exported names unchanged)                                */
/* -------------------------------------------------------------------------- */

function AnimatedCollapsible(props: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {

  return <ChakraCollapsibleRoot data-slot="collapsible" {...props} />
}

function AnimatedCollapsibleTrigger(props: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <ChakraCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

interface AnimatedCollapsibleContentProps
  extends React.ComponentProps<typeof CollapsiblePrimitive.Content> {
  animate?: boolean
  css?: React.CSSProperties
}


function AnimatedCollapsibleContent({ animate = true, css, ...props }: AnimatedCollapsibleContentProps) {
  return (
    <ChakraCollapsibleContent
      data-slot="collapsible-content"
      css={{
        ...(animate && {
          overflow: "hidden",
          '&[data-state="closed"]': {
            animation: "collapsible-up 200ms ease-out",
          },
          '&[data-state="open"]': {
            animation: "collapsible-down 200ms ease-out",
          },
        }),
        ...css,
      }}
      {...props}
    />
  )
}

export {
  AnimatedCollapsible as Collapsible,
  AnimatedCollapsibleTrigger as CollapsibleTrigger,
  AnimatedCollapsibleContent as CollapsibleContent,
}
