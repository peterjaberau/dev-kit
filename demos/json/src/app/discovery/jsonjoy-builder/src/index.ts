// exports for public API

import JsonSchemaEditor, { type JsonSchemaEditorProps } from "./components/SchemaEditor/JsonSchemaEditor"
import JsonSchemaVisualizer, { type JsonSchemaVisualizerProps } from "./components/SchemaEditor/JsonSchemaVisualizer"
import SchemaVisualEditor, { type SchemaVisualEditorProps } from "./components/SchemaEditor/SchemaVisualEditor"

export * from "./components/features/JsonValidator"
export * from "./components/features/SchemaInferencer"
export * from "./i18n/locales/de"
export * from "./i18n/locales/en"
export * from "./i18n/translation-context"
export * from "./i18n/translation-keys"

export {
  JsonSchemaEditor,
  type JsonSchemaEditorProps,
  JsonSchemaVisualizer,
  type JsonSchemaVisualizerProps,
  SchemaVisualEditor,
  type SchemaVisualEditorProps,
}

export type { baseSchema, JSONSchema } from "./types/jsonSchema"
