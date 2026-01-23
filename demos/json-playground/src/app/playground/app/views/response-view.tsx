import { AdaptiveCard } from "#components/adaptive/adaptive-card"

export const ResponseView = ({ children }: any) => {
  return (
    <AdaptiveCard.Root actions={[]} title={"Response"}>
      {children}
    </AdaptiveCard.Root>
  )
}
