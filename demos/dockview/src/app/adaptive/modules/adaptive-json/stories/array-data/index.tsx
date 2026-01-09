import { AdaptiveJson } from "#adaptive-json"
import { ChevronRightIcon } from "lucide-react"

const testArray = [1, 2, 3, 4, 5]
Object.defineProperties(testArray, {
  customProperty: { value: "custom value", enumerable: false, writable: false },
  anotherProperty: { value: 42, enumerable: false, writable: false },
})

const Index = () => {
  return (
    <AdaptiveJson.Root
      data={{
        normalArray: [1, 2, 3],
        arrayWithNonEnumerableProperties: testArray,
        sparseArray: (() => {
          const sparse = []
          sparse[0] = "first"
          sparse[5] = "sixth"
          return sparse
        })(),
      }}
    >
      <AdaptiveJson.Tree arrow={<ChevronRightIcon />} />
    </AdaptiveJson.Root>
  )
}
export default Index
