"use client"
import { AppShell } from "#components/app-shell-resizable"
import { useState } from "react"
import { DataList, Button, HStack } from "@chakra-ui/react"

const initialConfig: any = {
  show: {
    showHeader: true,
    showFooter: true,
    showBottom: true,
    showSidebarLeft: true,
    showSidePanelLeft: true,
    showSidebarRight: true,
    showSidePanelRight: true,
    showCanvasTop: true,
    showCanvasBottom: true,
    resizableSidePanelLeft: true,
    resizableSidePanelRight: true,
    resizableBottom: true,
    resizableCanvasBottom: true,
  },
  pinned: {
    pinnedSidePanelLeft: true,
    pinnedSidePanelRight: true,
    pinnedCanvasBottom: true,
    pinnedBottom: true,
  },
}

export default function Page() {
  const [show, setShow] = useState(initialConfig.show)
  const [pinned, setPinned] = useState(initialConfig.pinned)

  const shellProps = { ...show, ...pinned }


  return (
    <AppShell {...shellProps}>
      <DataList.Root orientation="horizontal">
        {Object.keys(initialConfig).map((key) => {
          const group: any = initialConfig[key]
          return (
            <DataList.Item key={key}>
              <DataList.ItemLabel>{key}</DataList.ItemLabel>
              <DataList.ItemValue>
                <HStack>
                  {Object.keys(group).map((itemKey) => {
                    const name = itemKey.replace("show", "").replace("pinned", "")
                    const isToggled = key === "show" ? show[itemKey] : pinned[itemKey]

                    return (
                      <Button
                        key={itemKey}
                        size={"xs"}
                        variant={isToggled ? "solid" : "outline"}
                        onClick={() => {
                          if (key === "show") {
                            setShow((prev: any) => ({ ...prev, [itemKey]: !prev[itemKey] }))
                          } else {
                            setPinned((prev: any) => ({ ...prev, [itemKey]: !prev[itemKey] }))
                          }
                        }}
                      >
                        {name}
                      </Button>
                    )
                  })}
                </HStack>
              </DataList.ItemValue>
            </DataList.Item>
          )
        })}
      </DataList.Root>
    </AppShell>
  )
}
