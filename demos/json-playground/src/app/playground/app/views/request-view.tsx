import { AdaptiveCard } from "#components/adaptive/adaptive-card"

export const RequestView = ({ children }: any) => {
  return (
    <AdaptiveCard.Root actions={[]} title={"Request"}>
      {children}
    </AdaptiveCard.Root>
  )
}
