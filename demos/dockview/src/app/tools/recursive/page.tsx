"use client"
import React, { useState } from "react"
import { RenderRecursive } from './render-recursive'

const data = {
  id: "node-0",
  value: "A",
  children: [
    {
      id: "node-0-0",
      value: "B",
      children: [
        {
          id: "node-0-0-0",
          value: "D",
        },
      ],
    },
    {
      id: "node-0-1",
      value: "C",
    },
  ],
}

export default function Page() {

  return <RenderRecursive source={data} />
}
