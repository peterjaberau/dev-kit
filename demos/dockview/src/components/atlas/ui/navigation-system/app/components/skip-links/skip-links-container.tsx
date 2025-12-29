import { useMemo } from "react"
import { token } from "#atlas-ui/primitives/css"

import { chakra, Text } from "@chakra-ui/react"

import { type SkipLinkData } from "../../context/skip-links/types"

import { SkipLink } from "./skip-link"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: token("space.050"),
    paddingBlock: token("space.150"),
    paddingInline: token("space.150"),
    position: "fixed",
    insetInlineStart: token("space.250"),
    insetBlockStart: token("space.250"),
    backgroundColor: token("elevation.surface.overlay"),
    borderRadius: token("radius.small"),
    boxShadow: token("elevation.shadow.overlay"),
    zIndex: -1,
    opacity: 0,
    pointerEvents: "none", // Prevent clicks just in case
    "&:focus-within": {
      zIndex: "calc(infinity)",
      opacity: 1,
      pointerEvents: "auto",
    },
  },
  skipLinkList: {
    display: "flex",
    flexDirection: "column",
    gap: token("space.050"),
    listStylePosition: "outside",
    listStyleType: "none",
    marginBlockStart: token("space.0"),
    paddingInlineStart: token("space.0"),
  },
}

const closeOnEscape = (event: React.KeyboardEvent) => {
  if (event.key !== "Escape") {
    return
  }

  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement) {
    activeElement.blur()
  }
}

const assignIndex = (num: number, arr: number[]): number => {
  if (!arr.includes(num)) {
    return num
  }
  return assignIndex(num + 1, arr)
}

function sortSkipLinks(arr: Array<SkipLinkData>): Array<SkipLinkData> {
  const customLinks = arr.filter((link: SkipLinkData) => Number.isInteger(link.listIndex))
  if (customLinks.length === 0) {
    return arr
  }

  const usedIndexes = customLinks.map((a) => a.listIndex) as number[]

  const regularLinksWithIndex = arr
    .filter((link) => link.listIndex === undefined)
    .map((link, index) => {
      const listIndex = assignIndex(index, usedIndexes)
      usedIndexes.push(listIndex)
      return {
        ...link,
        listIndex,
      }
    })
  return [...customLinks, ...regularLinksWithIndex].sort((a, b) => a.listIndex! - b.listIndex!)
}

const isOnlyWhitespaceRegex = /^\s*$/

export function SkipLinksContainer({
  label,
  testId,
  links,
}: {
  label: string
  testId?: string
  links: Array<SkipLinkData>
}) {
  const sortedLinks = useMemo(() => {
    return sortSkipLinks(links)
  }, [links])

  if (sortedLinks.length === 0) {
    return null
  }

  const isEmptyLabel = isOnlyWhitespaceRegex.test(label)

  return (
    <chakra.div onKeyDown={closeOnEscape} css={styles.root}>
      {!isEmptyLabel && <Text fontWeight="bold">{label}</Text>}
      <chakra.ol css={[styles.skipLinkList]}>
        {sortedLinks.map(({ id, label, onBeforeNavigate }: SkipLinkData) => (
          <SkipLink key={id} id={id} onBeforeNavigate={onBeforeNavigate}>
            {label}
          </SkipLink>
        ))}
      </chakra.ol>
    </chakra.div>
  )
}
