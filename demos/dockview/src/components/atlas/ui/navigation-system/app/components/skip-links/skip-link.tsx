import React, { type ReactNode, useCallback } from "react"

import { chakra, Button } from "@chakra-ui/react"
import { Anchor } from "#atlas-ui/primitives/components"
import { bind } from "#atlas-packages/bind-event-listener"
import { allSpaceMap } from "#atlas-ui/primitives/css"

const styles = {
  skipLinkListItem: {
    marginBlockStart: allSpaceMap["space.0"],
  },
}

function focusElement(element: HTMLElement | any) {
  element.setAttribute("tabindex", "-1")
  bind(element, {
    type: "blur",
    listener() {
      element.removeAttribute("tabindex")
    },
    options: {
      once: true,
    },
  })
  element.focus({
    focusVisible: true,
  })
}

export const SkipLink = ({ id, children, onBeforeNavigate }: any) => {
  const href = `#${id}`

  const onClick: any = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()

      const target = document.getElementById(id)
      if (!target) {
        return
      }
      onBeforeNavigate?.()

      focusElement(target)
      window.scrollTo(0, 0)
    },
    [id, onBeforeNavigate],
  )

  return (
    <chakra.li css={styles.skipLinkListItem}>
      <Anchor tabIndex={0} href={href} onClick={onClick}>
        {children}
      </Anchor>
    </chakra.li>
  )
}
