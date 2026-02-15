"use client"

import { Stack } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { usePanelRegistry } from "./PanelRegistry"

/**
 * Panel
 * -----
 * - A self-registering layout container.
 * - Automatically registers its DOM node with PanelRegistry when mounted.
 * - Automatically unregisters on unmount (important for floating panels that mount/unmount).
 * - You can pass any Chakra UI Stack props.
 */
type PanelProps = {
  id: string
} & React.ComponentProps<typeof Stack>

export const Panel = ({ id, ...props }: PanelProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { registerPanel } = usePanelRegistry()

  useEffect(() => {
    registerPanel(id, ref.current) // register on mount

    return () => {
      registerPanel(id, null) // unregister on unmount
    }
  }, [id, registerPanel])

  return <Stack ref={ref} {...props} />
}
