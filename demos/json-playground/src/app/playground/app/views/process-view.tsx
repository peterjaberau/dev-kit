import { AdaptiveCard } from "#components/adaptive/adaptive-card"

export const ProcessView = ({ children }: any) => {
  return (
    <AdaptiveCard.Root actions={[]} title={"Process"}>
      {children}
    </AdaptiveCard.Root>
  )
}
