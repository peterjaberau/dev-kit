"use client"
import { serializedNormalizedPath } from "#components/jsonpath"
import { NormalizedPath } from "#components/jsonpath"
import { ActionIcon, CopyButton, Loader, Menu, Popover, TextInput, Tooltip } from "@mantine/core"
import { Button, IconButton, Text, Separator, Group } from "@chakra-ui/react"
import { IconArrowDown, IconArrowUp, IconChevronDown, IconFileUpload, IconRouteSquare } from "@tabler/icons-react"
import { memo, useRef, useState } from "react"
import JSONEditor from "../code-editors/json-editor"
import PanelShell from "../panel-shell"
import { examples } from "../../models/examples"
import { openTextFile } from "../../services/files"

/**
 * Panel for query argument JSON editation.
 */
const JSONPanel = memo(
  ({
    queryArgumentText,
    paths,
    currentPathIndex,
    onQueryArgumentTextChanged,
    onCurrentPathIndexChanged,
  }: {
    queryArgumentText: string
    paths: readonly NormalizedPath[]
    currentPathIndex: number
    onQueryArgumentTextChanged: (queryArgumentText: string) => void
    onCurrentPathIndexChanged: (currentPathIndex: number) => void
  }) => {
    const [isParsingInProgress, setIsParsingInProgress] = useState(false)
    const currentNormalizedPathGetter = useRef(() => [] as NormalizedPath)
    const [currentNormalizedPath, setCurrentNormalizedPath] = useState("$")

    return (
      <PanelShell
        toolbar={
          <>
            <Tooltip label="Previous Result">
              <IconButton
                variant="outline"
                aria-label="Previous Result"
                disabled={paths.length === 0}
                onClick={() => onCurrentPathIndexChanged((paths.length + currentPathIndex - 1) % paths.length)}
              >
                <IconArrowUp />
              </IconButton>
            </Tooltip>
            <Tooltip label="Next Result">
              <IconButton
                variant="outline"
                aria-label="Next Result"
                disabled={paths.length === 0}
                onClick={() => onCurrentPathIndexChanged((paths.length + currentPathIndex + 1) % paths.length)}
              >
                <IconArrowDown />
              </IconButton>
            </Tooltip>
            {paths.length > 0 ? (
              <Text>
                {(currentPathIndex + 1).toLocaleString("en-US")} of{" "}
                <strong>{paths.length.toLocaleString("en-US")}</strong>
              </Text>
            ) : (
              <Text>No Results</Text>
            )}
            {isParsingInProgress && (
              <>
                <Separator orientation={"vertical"} />
                <Loader size="sm" />
                <Text>Parsing...</Text>
              </>
            )}
            <Popover
              width={400}
              position="bottom"
              withArrow
              shadow="md"
              onChange={() => setCurrentNormalizedPath(serializedNormalizedPath(currentNormalizedPathGetter.current()))}
            >
              <Popover.Target>
                <Tooltip label="Normalized Path under Caret">
                  <IconButton variant="outline" aria-label="Get Normalized Path under the Caret">
                    <IconRouteSquare />
                  </IconButton>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown style={{ maxWidth: "calc(100vw - var(--mantine-spacing-xs))" }}>
                <Group>
                  <TextInput
                    label="Normalized Path under the Caret"
                    value={currentNormalizedPath}
                    readOnly
                    flex="1 1 0"
                  />
                  <CopyButton value={currentNormalizedPath}>
                    {({ copied, copy }) => (
                      <Button size={"sm"} variant={"outline"} colorPalette={copied ? "teal" : "violet"} onClick={copy}>
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </Group>
              </Popover.Dropdown>
            </Popover>
            <Separator orientation="vertical" />
            <Tooltip label="Load From File">
              <IconButton
                variant="solid"
                aria-label="Load From a File"
                onClick={async () => {
                  const content = await openTextFile(".json")
                  if (content !== null) onQueryArgumentTextChanged(content)
                }}
              >
                <IconFileUpload />
              </IconButton>
            </Tooltip>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="solid" size="xs">
                  Example Data <IconChevronDown size={14} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {examples.map((e: any, i: any) => (
                  <Menu.Item key={i} onClick={() => onQueryArgumentTextChanged(e.jsonText)}>
                    {e.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </>
        }
      >
        <JSONEditor
          value={queryArgumentText}
          paths={paths}
          currentPath={currentPathIndex < paths.length ? paths[currentPathIndex] : []}
          onValueChanged={onQueryArgumentTextChanged}
          onCurrentPathChanged={(v) => (currentNormalizedPathGetter.current = v)}
          onParsingProgressChanged={setIsParsingInProgress}
        />
      </PanelShell>
    )
  },
)
export default JSONPanel
