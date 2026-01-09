import { AdaptiveJson, useAdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const Index = () => {
  const AdaptiveJson = useAdaptiveJson({
    data: {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      tags: ["tag1", "tag2", "tag3"],
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    },
  })

  return (
    <AdaptiveJson.RootProvider value={AdaptiveJson}>
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.RootProvider>
  )
}
export default Index
