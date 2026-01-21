"use client"
import { chakra } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
export function JsonResponse() {
  return (
    <chakra.div px={4}>
      <JsonView
        src={{}}
        collapsed={2}
        customizeCopy={(node, nodeMeta) => console.log("---node----", { node, nodeMeta })}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </chakra.div>
  )
}
