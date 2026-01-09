import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const data = [
  function sum(a: number, b: number) {
    return a + b
  },
  async (promises: Promise<any>[]) => await Promise.all(promises),
  function* generator(a: number) {
    while (a > 0) {
      yield a - 1
    }
  },
]

const Index = () => {
  return (
    <AdaptiveJson.Root data={data}>
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.Root>
  )
}
export default Index
