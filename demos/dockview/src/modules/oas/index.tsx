"use client"
import React, { useEffect, useState, useMemo } from "react"
import Oas from "oas"
import { parseSchema } from "./utils/parse-schema"
import { SchemaTreeNode } from "./components/schema-tree-node"

const Index = ({ apiSpec }: any) => {
  const [schemas, setSchemas]: any = useState(null)

  useEffect(() => {
    async function load() {
      const oas = new Oas(apiSpec)
      await oas.dereference()
      const def: any = oas.getDefinition()
      console.log("dereferenced definition", def)

      setSchemas(def?.components?.schemas || {})
    }
    load()
  }, [apiSpec])

  // Build tree nodes once when schemas update
  const roots = useMemo(() => {
    if (!schemas) return []
    return Object.entries(schemas).map(([name, schema]) => parseSchema(name, schema))
  }, [schemas])

  if (!schemas) {
    return <div>Loading…</div>
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {roots.map((root, index) => (
        <SchemaTreeNode key={`${root.name}-${index}`} node={root} />
      ))}
    </ul>
  )
}

export default Index
