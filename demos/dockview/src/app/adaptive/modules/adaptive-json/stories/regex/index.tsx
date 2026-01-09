import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const data = {
  regex: /^[a-z0-9]+/g,
  case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
}

const Index = () => {
  return (
    <AdaptiveJson.Root data={data}>
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.Root>
  )
}
export default Index
