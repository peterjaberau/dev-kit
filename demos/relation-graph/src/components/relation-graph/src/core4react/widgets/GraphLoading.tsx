'use client'
import React, { useContext, useState } from "react"
import { RelationGraphStoreContext } from "#components"
import { Spinner, Button } from "@chakra-ui/react"

const GraphLoading: React.FC = () => {
  const relationGraph = useContext(RelationGraphStoreContext)
  const options = relationGraph && relationGraph.options
  const clickGraphMask = (e: any) => {
    relationGraph.clickGraphMask(e)
  }
  return (
    options?.graphLoading && (
      <Button
        loading
        loadingText="Loading..."
        onClick={(e) => {
          clickGraphMask(e)
        }}
      />
    )
  )
}
//@ts-ignore
export default GraphLoading
