"use client"
import React, { useEffect, useState, useMemo } from "react"
import Oas from "oas"
import { parseSchema } from "./utils/parse-schema"
import { SchemaTreeNode } from "./components/schema-tree-node"
import EditableSchemaTree from './components/editable-schema-tree'

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

  // toggle edit mode in state if desired
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <button onClick={() => setEditMode(m => !m)}>
        {editMode ? 'Switch to view' : 'Switch to edit'}
      </button>
      <EditableSchemaTree schemas={schemas} editMode={editMode} />
    </>
  );


}

export default Index
