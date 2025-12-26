import JsonTree from "#json-tree-view-react/json-tree"
import React from "react"
import { data } from "#datasets/metadata"

const testData = {
  id: 1,
  name: 'Root',
  settings: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: false
    }
  },
  items: [
    { id: 10, label: 'Item A' },
    { id: 11, label: 'Item B' },
    'loose string'
  ]
};

const Index = (props: any) => {
  return (
    <JsonTree
      // data={testData}
      data={data}
      // collapsed={2}
      // theme="github"
      // editable={true}
      // displaySize
      // displayArrayIndex
      // style={{ fontSize: 13, fontWeight: "bold" }}
    />
  )
}
export default Index
