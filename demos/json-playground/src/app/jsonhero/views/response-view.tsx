'use client'
import { AdaptiveCard } from "#components/adaptive/adaptive-card"
import JsonView from "react18-json-view"
import { useAppActor } from "../machines/use-app-actor"
import { usePreferencesActor } from "../machines/use-preferences-actor"

export const ResponseView = ({ children }: any) => {
  const { appContext } = useAppActor()
  const { preferencesContext } = usePreferencesActor()


  return (
    <AdaptiveCard.Root actions={[]} title={"Response"}>
      <JsonView
        src={{
          app: appContext,
          preferences: preferencesContext,
        }}
        collapsed={1}
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </AdaptiveCard.Root>
  )
}
