import { useState } from "react"
import { formatAppError } from "../../lib/types"
import { DeleteIcon, RenameIcon } from "../../icons"
import { useLayoutsStore } from "../../store/layouts"
import { notify } from "../../store/notifications"
import { InlineRenameInput } from "../shared/InlineRenameInput"
import { chakra, Card, Button, IconButton, HStack, EmptyState, Badge } from "@chakra-ui/react"

/**
 * Manage saved panel layouts (the View menu is the fast switch path): save
 * the current arrangement under a name, apply/override/rename/delete saved
 * ones, import/export layout files, and reset the docks to the built-in
 * default.
 */
export function LayoutsPanel() {
  const layouts = useLayoutsStore((s) => s.layouts)
  const lastApplied = useLayoutsStore((s) => s.lastApplied)
  const saveCurrent = useLayoutsStore((s) => s.saveCurrent)
  const apply = useLayoutsStore((s) => s.apply)
  const rename = useLayoutsStore((s) => s.rename)
  const remove = useLayoutsStore((s) => s.remove)
  const resetToDefault = useLayoutsStore((s) => s.resetToDefault)

  const [newName, setNewName] = useState("")
  const [renaming, setRenaming] = useState<string | null>(null)

  const run = async (action: () => Promise<void>) => {
    try {
      await action()
    } catch (e) {
      notify.error(formatAppError(e))
    }
  }

  const nameTaken = (name: string) => layouts.some((l) => l.name === name)

  const onSaveCurrent = () =>
    run(async () => {
      const name = newName.trim()
      if (!name) return
      // Saving under an existing name IS the override action - same
      await saveCurrent(name)
      setNewName("")
    })

  const onOverride = (name: string) =>
    run(async () => {
      await saveCurrent(name)
    })

  const onDelete = (name: string) =>
    run(async () => {
      await remove(name)
    })

  const onRename = (oldName: string, next: string) =>
    run(async () => {
      setRenaming(null)
      if (nameTaken(next)) {
        notify.error(`A layout named "${next}" already exists.`)
        return
      }
      await rename(oldName, next)
    })

  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <HStack css={{ flexWrap: "wrap" }}>
          <input
            data-testid="layouts-new-name"
            placeholder="New layout name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void onSaveCurrent()
            }}
          />

          <Button
            variant="solid"
            size={"sm"}
            onClick={() => void onSaveCurrent()}
            disabled={newName.trim().length === 0}
            title="Save the current arrangement of both docks as a named layout"
          >
            Save current
          </Button>
          <Button
            variant="outline"
            size={"sm"}
            onClick={resetToDefault}
            disabled={newName.trim().length === 0}
            title="Rebuild both docks' built-in default layout (saved layouts are unaffected)"
          >
            Reset to default layout
          </Button>
        </HStack>
      </Card.Header>
      <Card.Body>
        {layouts.length === 0 ? (
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Description>
                No saved layouts yet. Arrange the panels the way you like, then save the arrangement under a name - it
                becomes a one-click switch in the View menu.
              </EmptyState.Description>
            </EmptyState.Content>
          </EmptyState.Root>
        ) : (
          layouts.map((l) => (
            <chakra.div
              key={l.name}
              data-testid={`layouts-row-${l.name}`}
              css={{
                display: "flex",
                alignItems: "center",
                gap: "0.5em",
                padding: "0.25em 0",
              }}
            >
              {renaming === l.name ? (
                <InlineRenameInput
                  initialValue={l.name}
                  onSave={(next) => void onRename(l.name, next)}
                  onCancel={() => setRenaming(null)}
                  style={{ flex: 1, minWidth: 0 }}
                />
              ) : (
                <chakra.span
                  css={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={l.name}
                >
                  {l.name}
                  {lastApplied === l.name && <Badge variant="subtle">(active)</Badge>}
                </chakra.span>
              )}
              <Button size={"xs"} variant={"outline"} onClick={() => void run(() => apply(l.name))}>
                Apply
              </Button>
              <Button
                size={"xs"}
                variant={"outline"}
                onClick={() => void onOverride(l.name)}
                title="Replace this layout with the current arrangement"
              >
                Override
              </Button>
              <IconButton
                size={"xs"}
                variant={"ghost"}
                onClick={() => setRenaming(renaming === l.name ? null : l.name)}
                title="Rename layout"
                aria-label={`Rename layout ${l.name}`}
              >
                <RenameIcon />
              </IconButton>
              <IconButton
                size={"xs"}
                variant={"ghost"}
                onClick={() => void onDelete(l.name)}
                title="Delete layout"
                aria-label={`Delete layout ${l.name}`}
              >
                <DeleteIcon />
              </IconButton>
            </chakra.div>
          ))
        )}
      </Card.Body>
    </Card.Root>
  )
}
