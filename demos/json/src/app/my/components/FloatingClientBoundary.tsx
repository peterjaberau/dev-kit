// FloatingClientBoundary.tsx
"use client"

import { useMemo } from "react"
import { createHtmlPortalNode, InPortal, OutPortal } from "react-reverse-portal"

const portalOptions: any = {
  attributes: {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
}

export function FloatingClientBoundary({ docked, children }: { docked: boolean; children: React.ReactNode }) {
  const portal = useMemo(() => createHtmlPortalNode(portalOptions), [])

  return (
    <>
      {docked && <InPortal node={portal}>{children}</InPortal>}
      {!docked && <OutPortal node={portal} />}
    </>
  )
}
