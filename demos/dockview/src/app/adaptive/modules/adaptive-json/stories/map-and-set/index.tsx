import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const data = new Map<string, any>([
  ["name", "ark-ui-json-tree"],
  ["license", "MIT"],
  //@ts-ignore
  ["elements", new Set(["ark-ui", 123, false, true, null, undefined, 456n])],
  [
    "nested",
    new Map<string, any>([
      [
        "taglines",
        new Set([
          { name: "ark-ui", feature: "headless components" },
          { name: "ark-ui", feature: "framework agnostic" },
          { name: "ark-ui", feature: "accessible by default" },
        ]),
      ],
    ]),
  ],
])

const Index = () => {
  return (
    <AdaptiveJson.Root data={data}>
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.Root>
  )
}
export default Index
