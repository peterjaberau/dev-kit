import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useJSchemaZudoku = () => {
  const { rootJSchemaZudokuRef: jSchemaZudokuRef } = useRootActors()

  const sendToJSchemaZudoku = jSchemaZudokuRef.send
  const jSchemaZudokuState: any = useSelector(jSchemaZudokuRef, (state) => state)
  const jSchemaZudokuContext = jSchemaZudokuState.context

  const schema = jSchemaZudokuContext.schema

  const isSchemaNoData = !schema || Object.keys(schema).length === 0

  const isSchemaConst = schema.const

  const isSchemaOneOf = Array.isArray(schema.oneOf)

  const isSchemaAnyOf = Array.isArray(schema.anyOf)

  const isSchemaAllOf = Array.isArray(schema.allOf)

  const isSchemaBasicType = isBasicType(schema.type)

  const isSchemaBasicTypeWithEnum = isSchemaBasicType && schema.enum

  const isSchemaArrayType = schema.type === "array" && typeof schema.items === "object"

  const isSchemaObjectType = schema.type === "object"

  const isSchemaAdditionalPropertiesObjectType = typeof schema.additionalProperties === "object"

  const isSchemaAdditionalPropertiesAllowed = schema.additionalProperties === true

  const objectGroupedProperties = groupBy(Object.entries(schema.properties ?? {}), ([propertyName, property]: any) => {
    return property.deprecated ? "deprecated" : schema.required?.includes(propertyName) ? "required" : "optional"
  })

  return {
    jSchemaZudokuRef,
    sendToJSchemaZudoku,

    jSchemaZudokuState,
    jSchemaZudokuContext,
  }
}

export const CIRCULAR_REF = "$[Circular Reference]"

export const isBasicType = (type: unknown): type is "string" | "number" | "boolean" | "integer" | "null" => {
  return (typeof type === "string" && ["string", "number", "boolean", "integer", "null"].includes(type)) || (Array.isArray(type) && type.every(isBasicType))
}

export const isArrayType = (value: any) => {
  return value.type === "array" ||
    (Array.isArray(value.type) && value.type.includes("array"))
}

export const isComplexType = (value?: any) => {
  return value &&
    ((value.type === "object" && Object.keys(value.properties ?? {}).length > 0) ||
      (value.type === "array" && typeof value.items === "object" && (!value.items.type || value.items.type === "object")))
}

export const isCircularRef = (schema: unknown): schema is string => typeof schema === "string" && schema.startsWith(CIRCULAR_REF)

export const isArrayCircularRef = (schema: any): schema is any & { items: any } => isArrayType(schema) && "items" in schema && isCircularRef(schema.items)

export const extractCircularRefInfo = (ref?: string | any): string | undefined => (typeof ref === "string" ? ref.split(":")[1] : undefined)

export const groupBy = <T extends Record<PropertyKey, any>, KeySelector extends (item: T) => PropertyKey>(
  arr: T[],
  keySelector: KeySelector,
): Partial<Record<ReturnType<KeySelector>, T[]>> => {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = keySelector(val) as ReturnType<KeySelector>
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = []
      }
      accumulator[groupedKey].push(val)
      return accumulator
    },
    {} as Record<ReturnType<KeySelector>, T[]>,
  )
}
