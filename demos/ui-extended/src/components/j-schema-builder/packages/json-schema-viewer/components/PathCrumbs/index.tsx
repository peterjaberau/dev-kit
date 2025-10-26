"use client"

import { Box, HStack } from "@chakra-ui/react"
import { useAtom } from "jotai"
import * as React from "react"

import { useJSVOptionsContext } from "../../context"
import { pathCrumbsAtom, showPathCrumbsAtom } from "./state"

export const PathCrumbs = ({ parentCrumbs = [] }: { parentCrumbs?: string[] }) => {
  const [showPathCrumbs] = useAtom(showPathCrumbsAtom)
  const [pathCrumbs] = useAtom(pathCrumbsAtom)
  const { disableCrumbs } = useJSVOptionsContext()

  if (disableCrumbs) {
    return null
  }

  const parentCrumbElems: any = []
  parentCrumbs.forEach((crumb, i) => {
    parentCrumbElems.push(<Box key={i}>{crumb}</Box>)
  })

  const pathCrumbElems: any = []
  pathCrumbs.forEach((crumb, i) => {
    if (pathCrumbs[i + 1]) {
      pathCrumbElems.push(<Box key={i}>{crumb}</Box>)
    } else {
      pathCrumbElems.push(
        <Box key={i} color="red" fontWeight="semibold">
          {crumb}
        </Box>,
      )
    }
  })

  // only show when have a path, and only when we've scrolled enough such that a portion of the JSV is no longer visible
  if (!showPathCrumbs || (!parentCrumbElems.length && !pathCrumbElems.length)) {
    return null
  }

  return (
    <HStack border={"3px solid red"} data-id="path-crumbs" gap={1} color={"fg.subtle"} alignItems="center">
      /{parentCrumbElems}
      {pathCrumbElems.length && <HStack>/{pathCrumbElems}</HStack>}
    </HStack>
  )
}
