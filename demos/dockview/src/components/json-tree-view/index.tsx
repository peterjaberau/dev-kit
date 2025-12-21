import { chakra, useSlotRecipe } from "@chakra-ui/react"
import { JsonTreeView } from '@ark-ui/react'
import { ChevronRightIcon } from 'lucide-react'
import { jsonTreeViewSlotRecipe } from './recipe'

const testArray = [1, 2, 3, 4, 5]
Object.defineProperties(testArray, {
  customProperty: { value: 'custom value', enumerable: false, writable: false },
  anotherProperty: { value: 42, enumerable: false, writable: false },
})

const Index = () => {
  const recipe = useSlotRecipe({ recipe: jsonTreeViewSlotRecipe })
  const styles: any = recipe()


  return (
    <JsonTreeView.Root
      style={styles.root}
      data={{
        normalArray: [1, 2, 3],
        arrayWithNonEnumerableProperties: testArray,
        sparseArray: (() => {
          const sparse = []
          sparse[0] = 'first'
          sparse[5] = 'sixth'
          return sparse
        })(),
      }}
    >
      <JsonTreeView.Tree
        style={styles.tree}
        arrow={<ChevronRightIcon />}
      />
    </JsonTreeView.Root>
  )
}
export default Index
