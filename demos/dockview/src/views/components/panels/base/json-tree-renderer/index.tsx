import { JsonTreeView, useJsonTreeView } from '#components/json-tree-renderer'
import { ChevronRightIcon } from 'lucide-react'

const Index = () => {

  const jsonTreeView = useJsonTreeView({
    data: {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      tags: ['tag1', 'tag2', 'tag3'],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    },
  })


  return (
    <JsonTreeView.RootProvider
      value={jsonTreeView}
    >
      <JsonTreeView.Tree
        arrow={<ChevronRightIcon />}
        renderValue={(node) => {
          if (node.type === 'text' && typeof node.value === 'string' && isEmail(node.value)) {
            return (
              <a href={`mailto:${node.value}`} target="_blank" rel="noreferrer">
                {node.value}
              </a>
            )
          }
        }}
      />
    </JsonTreeView.RootProvider>
  )
}

const isEmail = (value: string) => {
  const strippedValue = value.replace(/^"(.*)"$/, '$1')
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strippedValue)
}
export default Index
