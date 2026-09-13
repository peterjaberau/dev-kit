import React, { Suspense } from 'react';
import { chakra } from "@chakra-ui/react"

function PanelLoadingFallback() {
  const { formatMessage } = useIntl();
  return (
    <chakra.div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "full",
        height: "full",
        fontSize: "xs",
        color: "fg.muted",
      }}
    >
      loading
    </chakra.div>
  )
}

export function PanelSuspense({ children }: { children: React.ReactNode }): React.ReactElement {
  return <Suspense fallback={<PanelLoadingFallback />}>{children}</Suspense>;
}
