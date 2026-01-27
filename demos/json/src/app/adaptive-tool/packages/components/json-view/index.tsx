import "react18-json-view/src/style.css"
import JsonView from "react18-json-view"
import { forwardRef } from "react"


const Index = forwardRef((props: any) => {
  return (
    <JsonView
      collapsed={1}
      theme="github"
      displaySize
      displayArrayIndex
      style={{ fontSize: 13, fontWeight: "bold" }}
      {...props}
    />
  )
})


export default Index
