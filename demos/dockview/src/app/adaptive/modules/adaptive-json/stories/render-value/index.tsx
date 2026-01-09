import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const Index = () => {
  return (
    <AdaptiveJson.Root
      defaultExpandedDepth={2}
      data={{
        name: "John Doe",
        age: 30,
        number: Number.NaN,
        email: "john.doe@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
      }}
    >
      <AdaptiveJson.Tree
        arrow={<ChevronRightIcon />}
        renderValue={(node: any) => {
          if (node.type === "text" && typeof node.value === "string" && isEmail(node.value)) {
            return (
              <a href={`mailto:${node.value}`} target="_blank" rel="noreferrer">
                {node.value}
              </a>
            )
          }
        }}
      />
    </AdaptiveJson.Root>
  )
}

const isEmail = (value: string) => {
  const strippedValue = value.replace(/^"(.*)"$/, "$1")
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strippedValue)
}
export default Index
