"use client"
import { useState } from 'react'
import { MovableModal } from "#components/ui-common/panel/movableModal"
import JsonView from "react18-json-view"
import { useDockViewDebugger } from "#modules/dockview/actors/selectors"
import { useOas } from "#modules/dockview/actors/selectors/okas.selector"
import { Stack } from '@chakra-ui/react'




export default function Debugger(props: any) {
  const { dockViewDebugger } = useDockViewDebugger()
  const { oasContext } = useOas()
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
        <Stack>
          <JsonView
            src={{
              ...dockViewDebugger,
            }}
            collapsed={1}
            theme="github"
            displaySize
            displayArrayIndex
            style={{ fontSize: 13, fontWeight: "bold" }}
          />
          <JsonView
            src={{
              oas: {
                apiSpec: oasContext.props.apiSpec,
                oasInstance: oasContext.instance.oas,
                executionCache: oasContext.executionCache
              }
            }}
            collapsed={2}
            theme="github"
            displaySize
            displayArrayIndex
            style={{ fontSize: 13, fontWeight: "bold" }}
          />
        </Stack>
      }
      onClose={onClose}
    />
  )
}
