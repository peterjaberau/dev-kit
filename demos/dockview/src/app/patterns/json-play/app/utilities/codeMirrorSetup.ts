import { highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor } from "@codemirror/view"
import { highlightActiveLineGutter } from "@codemirror/gutter"
import { bracketMatching } from "@codemirror/matchbrackets"
import { highlightSelectionMatches } from "@codemirror/search"
import { json as jsonLang } from "@codemirror/lang-json"
import { lineNumbers } from "@codemirror/gutter"

export function getPreviewSetup() {
  return [
    jsonLang(),
    highlightSpecialChars(),
    drawSelection(),
    dropCursor(),
    bracketMatching(),
    highlightSelectionMatches(),
    lineNumbers(),
  ]
}

export function getViewerSetup() {
  return [drawSelection(), dropCursor(), bracketMatching(), lineNumbers()]
}

export function getEditorSetup(){
  return [
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    drawSelection(),
    dropCursor(),
    bracketMatching(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    lineNumbers(),
  ]
}
