"use client"
import { Prec } from "@codemirror/state"
import { type EditorView, keymap } from "@codemirror/view"
import { type HtmlPortalNode, OutPortal } from "react-reverse-portal"
import { Box, Icon, IconButton, CloseButton, Button, HStack, Badge } from "@chakra-ui/react"
import { Pane } from "../../../components/pane"
import { CodeEditor } from "../../../components/code-editor"
import { runQueryKeymap } from "../../../editor"
import { queryEditorField, setQueryEditor } from "../../../editor"
import { useDebouncedFunction, useStable, useDatabaseVersionLinter } from "../../../hooks"
import { RiResetLeftFill as IconReset } from "react-icons/ri"
import { LuX as IconClose, LuDollarSign as IconDollar } from "react-icons/lu"
import { useCodeEditorStore, useConfigStore, useDatabaseStore } from "../../../store"
import { useEffect, useMemo, useState } from "react"

export interface VariablesPaneProps {
  editor: EditorView
  isValid: boolean
  switchPortal?: HtmlPortalNode<any>
  lineNumbers: boolean
  setIsValid: (isValid: boolean) => void
  closeVariables: () => void
}

export function VariablesPane({
  isValid,
  switchPortal,
  lineNumbers,
  editor,
  setIsValid,
  closeVariables,
}: VariablesPaneProps) {
  const [snapshot, store] = useCodeEditorStore()
  const configStoreRef: any = useConfigStore()

  const [databaseContext, databaseRef]: any = useDatabaseStore((s: any) => s)

  const [variableEditor, setVariableEditor] = useState<EditorView | null>(null)
  const surqlVersion = useDatabaseVersionLinter(variableEditor)

  const setVariables = useDebouncedFunction((content: string | undefined) => {
    const json = content || ""

    store.trigger.setVariables({ value: json })

    try {
      const parsed = JSON.parse(json)
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new TypeError("Must be object")
      }

      setIsValid(true)

      // store.trigger.setVariablesValid(true)
    } catch {
      setIsValid(false)
      // store.trigger.setVariablesValid(false)
    }
  }, 50)

  const clearVariables = useStable(() => {
    store.trigger.setVariables("{}")
  })

  // useEffect(() => {
  //   if (variableEditor && editor) {
  //     setQueryEditor(variableEditor, editor);
  //   }
  // }, [variableEditor, editor])
  //
  // const extensions = useMemo(
  //   () => [surrealql(), surqlLinting(), queryEditorField, Prec.high(keymap.of(runQueryKeymap))],
  //   [],
  // );

  const extensions = useMemo(
    () => [
      // surqlVersion,
      // jsonata(),

      queryEditorField,
      Prec.high(keymap.of(runQueryKeymap)),
    ],
    [],
  )

  return (
    <Pane
      title={"Variables"}
      icon={<IconDollar />}
      infoSection={"info"}
      rightSection={
        <>
          {!isValid && <Badge colorPalette="red">Invalid syntax</Badge>}
          <IconButton size={"sm"} variant={"ghost"} onClick={clearVariables}>
            <IconReset />
          </IconButton>
          <IconButton size={"sm"} variant={"ghost"} onClick={closeVariables}>
            <IconClose />
          </IconButton>
        </>
      }
    >
      <CodeEditor
        inset={0}
        autoFocus
        value={snapshot.context?.variables || ""}
        onChange={setVariables}
        onMount={setVariableEditor}
        lineNumbers={lineNumbers}
        extensions={extensions}
      />
    </Pane>
  )
}
