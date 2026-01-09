import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const data = new Error("Error")

const Index = () => {
  return (
    <AdaptiveJson.Root data={data}>
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.Root>
  )
}
export default Index
