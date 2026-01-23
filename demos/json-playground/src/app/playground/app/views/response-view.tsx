'use client'
import { AdaptiveCard } from "#components/adaptive/adaptive-card"
import JsonView from "react18-json-view"
import { usePlayground, useJsonManager, useJsonViews, useJsonOperations } from ".."

export const ResponseView = ({ children }: any) => {
  const { playgroundContext } = usePlayground()
  const { jsonManagerContext } = useJsonManager()

  const { jsonViewsContext } = useJsonViews()
  const { jsonOperationsContext } = useJsonOperations()

  return (
    <AdaptiveCard.Root actions={[]} title={"Response"}>
      <JsonView
        src={{
          playground: playgroundContext,
          jsonManager: jsonManagerContext,
          jsonViews: jsonViewsContext,
          jsonOperations: jsonOperationsContext,
        }}
        collapsed={1}
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </AdaptiveCard.Root>
  )
}
