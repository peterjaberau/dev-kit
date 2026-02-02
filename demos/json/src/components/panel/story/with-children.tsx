"use client"

import React, { useState } from "react"
import classNames from "classnames"
import { upperFirst } from "lodash"
import { chakra, CloseButton, Button, SimpleGrid, Tabs, Heading } from "@chakra-ui/react"

import { Panel } from "../Panel"
import type { PANEL_POSITIONS } from "../constants"
import { panels } from "./data"
import "./story.css"


export function PanelTabsStory() {
  const [position, setPosition] = useState<(typeof PANEL_POSITIONS)[number]>("left")
  const [value, setValue] = useState<string | null>(panels[0].id)

  const closePanel = () => setValue(null)

  return (
    <>
      <Panel ariaLabel="Next.js panel with children">
        <Tabs.Root defaultValue={value} onValueChange={(e) => setValue(e.value)} size="sm">
          <chakra.div
            css={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tabs.List>
              {panels.map((item: any, index: any) => (
                <Tabs.Trigger key={item.id} value={item.id}>
                  {item.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <chakra.div
              css={{
                alignItems: "center",
                display: "flex",
                mr: 2,
              }}
            >
              <CloseButton size={"sm"} onClick={closePanel} />
            </chakra.div>
          </chakra.div>

          {value ? (
            panels.map(({ id, content }: any) => (
              <Tabs.Content key={id} value={id}>
                <SimpleGrid columns={3} gap={2}>
                  {new Array(6).fill(0).map((_v, index) => (
                    <chakra.div key={index}>
                      Content {index + 1} of {content}
                    </chakra.div>
                  ))}
                </SimpleGrid>
              </Tabs.Content>
            ))
          ) : (
            <div>empty panel view</div>
          )}
        </Tabs.Root>
      </Panel>
    </>
  )
}
