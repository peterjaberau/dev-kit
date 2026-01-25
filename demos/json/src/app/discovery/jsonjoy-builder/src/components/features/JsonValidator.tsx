"use client"
import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import type * as Monaco from "monaco-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { useMonacoTheme } from "../../hooks/use-monaco-theme"
import { formatTranslation, useTranslation } from "../../hooks/use-translation"
import type { JSONSchema } from "../../types/jsonSchema"
import { type ValidationResult, validateJson } from "../../utils/jsonValidator"

/** @public */
export interface JsonValidatorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schema: JSONSchema
}

/** @public */
export function JsonValidator({ open, onOpenChange, schema }: JsonValidatorProps) {
  const t = useTranslation()
  const [jsonInput, setJsonInput] = useState("")
  const [validationResult, setValidationResult]: any = useState<ValidationResult | null>(null)
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)
  const debounceTimerRef: any = useRef<number | null>(null)
  const monacoRef = useRef<typeof Monaco | null>(null)
  const schemaMonacoRef = useRef<typeof Monaco | null>(null)
  const { currentTheme, defineMonacoThemes, configureJsonDefaults, defaultEditorOptions } = useMonacoTheme()

  const validateJsonAgainstSchema = useCallback(() => {
    if (!jsonInput.trim()) {
      setValidationResult(null)
      return
    }

    const result = validateJson(jsonInput, schema)
    setValidationResult(result)
  }, [jsonInput, schema])

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      validateJsonAgainstSchema()
    }, 500)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [validateJsonAgainstSchema])

  const handleJsonEditorBeforeMount: BeforeMount = (monaco) => {
    monacoRef.current = monaco
    defineMonacoThemes(monaco)
    configureJsonDefaults(monaco, schema)
  }

  const handleSchemaEditorBeforeMount: BeforeMount = (monaco) => {
    schemaMonacoRef.current = monaco
    defineMonacoThemes(monaco)
  }

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  const handleEditorChange = (value: string | undefined) => {
    setJsonInput(value || "")
  }

  const goToError = (line: number, column: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(line)
      editorRef.current.setPosition({ lineNumber: line, column: column })
      editorRef.current.focus()
    }
  }

  // Create a modified version of defaultEditorOptions for the editor
  const editorOptions = {
    ...defaultEditorOptions,
    readOnly: false,
  }

  // Create read-only options for the schema viewer
  const schemaViewerOptions = {
    ...defaultEditorOptions,
    readOnly: true,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="jsonjoy flex max-h-[700px] flex-col sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t.validatorTitle}</DialogTitle>
          <DialogDescription>{t.validatorDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex h-[600px] flex-1 flex-col gap-4 overflow-hidden py-4 md:flex-row">
          <div className="flex h-full flex-1 flex-col">
            <div className="mb-2 text-sm font-medium">{t.validatorContent}</div>
            <div className="h-full flex-1 rounded-md border">
              <Editor
                height="600px"
                defaultLanguage="json"
                value={jsonInput}
                onChange={handleEditorChange}
                beforeMount={handleJsonEditorBeforeMount}
                onMount={handleEditorDidMount}
                loading={
                  <div className="bg-secondary/30 flex h-full w-full items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
                options={editorOptions}
                theme={currentTheme}
              />
            </div>
          </div>

          <div className="flex h-full flex-1 flex-col">
            <div className="mb-2 text-sm font-medium">{t.validatorCurrentSchema}</div>
            <div className="h-full flex-1 rounded-md border">
              <Editor
                height="600px"
                defaultLanguage="json"
                value={JSON.stringify(schema, null, 2)}
                beforeMount={handleSchemaEditorBeforeMount}
                loading={
                  <div className="bg-secondary/30 flex h-full w-full items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
                options={schemaViewerOptions}
                theme={currentTheme}
              />
            </div>
          </div>
        </div>

        {validationResult && (
          <div
            className={`rounded-md p-4 ${validationResult.valid ? "border border-green-200 bg-green-50" : "border border-red-200 bg-red-50"} transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center">
              {validationResult.valid ? (
                <>
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <p className="font-medium text-green-700">{t.validatorValid}</p>
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                  <p className="font-medium text-red-700">
                    {validationResult.errors.length === 1
                      ? validationResult.errors[0].path === "/"
                        ? t.validatorErrorInvalidSyntax
                        : t.validatorErrorSchemaValidation
                      : formatTranslation(t.validatorErrorCount, {
                          count: validationResult.errors.length,
                        })}
                  </p>
                </>
              )}
            </div>

            {!validationResult.valid && validationResult.errors && validationResult.errors.length > 0 && (
              <div className="mt-3 max-h-[200px] overflow-y-auto">
                {validationResult.errors[0] && (
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700">
                      {validationResult.errors[0].path === "/"
                        ? t.validatorErrorPathRoot
                        : validationResult.errors[0].path}
                    </span>
                    {validationResult.errors[0].line && (
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {validationResult.errors[0].column
                          ? formatTranslation(t.validatorErrorLocationLineAndColumn, {
                              line: validationResult.errors[0].line,
                              column: validationResult.errors[0].column,
                            })
                          : formatTranslation(t.validatorErrorLocationLineOnly, {
                              line: validationResult.errors[0].line,
                            })}
                      </span>
                    )}
                  </div>
                )}
                <ul className="space-y-2">
                  {validationResult.errors.map((error: any, index: any) => (
                    <button
                      key={`error-${error.path}-${index}`}
                      type="button"
                      className="shadow-xs w-full cursor-pointer rounded-md border border-red-100 bg-white p-3 text-left transition-shadow duration-200 hover:shadow-md"
                      onClick={() => error.line && error.column && goToError(error.line, error.column)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-700">
                            {error.path === "/" ? t.validatorErrorPathRoot : error.path}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">{error.message}</p>
                        </div>
                        {error.line && (
                          <div className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                            {error.column
                              ? formatTranslation(t.validatorErrorLocationLineAndColumn, {
                                  line: error.line,
                                  column: error.column,
                                })
                              : formatTranslation(t.validatorErrorLocationLineOnly, { line: error.line })}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
