"use client"
import { useState } from 'react'
import { MovableModal } from "#components/ui-common/panel/movableModal"
import JsonView from "react18-json-view"
import { useDockDebugger } from "#actors/model/selectors"






export default function Debugger(props: any) {
  const { dockDebugger } = useDockDebugger()
  const [position, setPosition] = useState(() => {
    const width = 500;
    const height = 600;
    const padding = 100; // distance from the right edge
    const x = window.innerWidth - width - padding;
    const y = 100;

    return { x, y, width, height };
  });


  const { onClose, ...rest } = props

  return (
    <MovableModal
      defaultPosition={position}
      title={"Debugger"}
      bodyContent={
        <JsonView
          src={{
            ...dockDebugger
          }}
          collapsed={1}
          theme="github"
          displaySize
          displayArrayIndex
          style={{ fontSize: 13, fontWeight: "bold" }}
        />
      }
      onClose={onClose}
    />
  )
}
