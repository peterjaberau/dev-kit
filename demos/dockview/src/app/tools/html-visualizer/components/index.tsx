"use client"
import { HtmlTree } from "./html-tree"
import { htmlToJson } from "./html-to-json"
import { useEffect, useState } from "react"



function Index(html: any) {
  const [tree, setTree] = useState(null)

  useEffect(() => {
    if (!html) return
    setTree(htmlToJson(html))
  }, [html])

  return <HtmlTree data={tree} />

}
export default Index
