/**
 * schema2Json: Generates a corresponding JSON dataset based on the schema data.
 Currently, three transformation methods are included: baseSchema2JsonData, objectSchema2JsonData, and arraySchema2JsonData.
 * 【Method Parameter Description】
 * jsonSchema: A schema data object, primarily used to generate corresponding JSON data.
 * jsonData: A JSON data object; the value corresponding to this jsonData will be used first.
 * */
import { hasProperties, objClone } from "$utils/index"
// import { toJS } from 'mobx';
import { isArray, isObject, isFunction } from "$utils/typeof"
import { EmptyDynamicDataCont } from "$data/index"
import { getDefaultOptionVal } from "$utils/jsonSchema"
import { getExpectType } from "$function/getExpectType"

// Used to distinguish between object and array types
function isEqualByType(value1: any, value2: any) {
  return `${isObject(value1)}-${isArray(value1)}` === `${isObject(value2)}-${isArray(value2)}`
}

/**
 * Convert basic schema types to JSONData
 * Generate a corresponding jsonData based on jsonSchema and the old version of jsonData.
 * Note: Use older data for data merging.
 * */
function baseSchema2JsonData(jsonSchema: any, jsonData: any) {
  let curJsonData: any = undefined
  let oldValue = jsonData

  if (
    hasProperties(oldValue) &&
    hasProperties(jsonSchema.default) &&
    (typeof oldValue !== typeof jsonSchema.default || !isEqualByType(oldValue, jsonSchema.default))
  ) {
    // Indicates that if the current data type changes, the old data should be discarded.
    oldValue = undefined
  }
  /** Existing values ​​from previous versions are used first, followed by default values ​​defined in the schema. */
  let curValue = hasProperties(oldValue) ? oldValue : jsonSchema.default
  switch (jsonSchema.type) {
    case "select":
    case "radio":
      curJsonData = curValue ?? getDefaultOptionVal(jsonSchema)
      break
    case "checkboxes":
      curJsonData = curValue ?? getDefaultOptionVal(jsonSchema, true)
      break
    case "color":
      if (curValue === "#fff" || curValue === "#FFF") {
        curValue = "#ffffff" // To avoid values ​​of type 'fff', as type=color cannot be recognized.
      }
      curJsonData = hasProperties(curValue) ? curValue : "#ffffff"
      break
    case "boolean":
      curJsonData = hasProperties(curValue) ? curValue : false
      break
    case "number":
      curJsonData = hasProperties(curValue) ? curValue : undefined
      break
    case "json":
      /* Convert to JSON type and perform special processing; ensure that the JSON type value is a JSON object. */
      let curJsonItemData: any = "" // JSON data of string type
      // Check if the current jsonData is an object type
      if (isObject(curValue) || isArray(curValue)) {
        curJsonItemData = curValue
      } else if (isFunction(curValue) || curValue === "") {
        // Function types are automatically replaced with the default JSON data "{}"
        curJsonItemData = {}
      } else {
        /** The current curJsonData is a string, and we need to determine whether it can be serialized into a JSON object. */
        /*If a JSON object cannot be serialized, it will be automatically converted to a default JSON data "{}".
         */
        try {
          // Perform formatting (check if it is valid JSON data)
          curJsonItemData = JSON.parse(curValue)
        } catch (err) {
          // Invalid JSON data will be automatically converted into a default JSON data "{}"
          curJsonItemData = {}
        }
      }
      curJsonData = curJsonItemData
      break
    default:
      if (jsonSchema.type === "input" && jsonSchema.default === "0") {
        // Compatibility handling: Resolving the issue of missing default values ​​for box-style
        curJsonData = curValue ? curValue : jsonSchema.default
      } else {
        curJsonData = hasProperties(curValue) ? curValue : undefined
      }
  }
  return curJsonData
}

/**
 * Convert Object type schema to JSON Data
 * Generate a corresponding jsonData based on jsonSchema and the old version of jsonData.
 * Note: Use older data for data merging.
 * */
function objectSchema2JsonData(jsonSchema: any, jsonData: any) {
  let curJsonData: any = {}
  const curType = jsonSchema.type
  if (isObject(jsonSchema) && getExpectType(jsonSchema.type) === "object") {
    const jsonItem = jsonSchema
    let oldValue = jsonData
    if (
      hasProperties(oldValue) &&
      ((hasProperties(jsonItem.default) && typeof oldValue !== typeof jsonSchema.default) || !isObject(oldValue))
    ) {
      // Indicates that if the current data type changes, the old data should be discarded.
      oldValue = undefined
    }
    /** Existing values ​​from previous versions are used first, followed by default values ​​defined in the schema. */
    const curValue = hasProperties(oldValue) ? oldValue : jsonItem.default

    if (curType === "dynamic-data") {
      // Dynamic data source type (fixed-format Object type)
      curJsonData = objClone(EmptyDynamicDataCont)
      if (curValue && isObject(curValue) && JSON.stringify(curValue) !== "{}") {
        curJsonData = Object.assign(curJsonData, curValue)
      }
    } else if (curType === "datasource") {
      // Data source type (fixed-format Object type)
      if (
        jsonItem.properties &&
        jsonItem.properties.type &&
        jsonItem.properties.type.default &&
        jsonItem.properties.type.default === "local"
      ) {
        // Local data source type
        curJsonData = {
          data: "{}",
          filter: "() => {}",
        }
        // Read old value
        if (curValue && curValue.data) {
          curJsonData.data = curValue.data
        }
        if (curValue && curValue.filter) {
          curJsonData.filter = curValue.filter
        }
        // Correct the default data in data
        if (curJsonData.data === "http://xxx") {
          curJsonData.data = "{}"
        }
      } else {
        // Remote data types
        curJsonData = {
          data: "http://xxx",
          filter: "() => {}",
        }
        // Read old value
        if (curValue && curValue.data) {
          curJsonData.data = curValue.data
        }
        if (curValue && curValue.filter) {
          curJsonData.filter = curValue.filter
        }
        // Correct the default data in data
        if (curJsonData.data === "{}") {
          curJsonData.data = "http://xxx"
        }
      }
    } else if (curType === "event") {
      // Event type (fixed format Object type)
      if (
        jsonItem.properties &&
        jsonItem.properties.type &&
        jsonItem.properties.type.default &&
        jsonItem.properties.type.default === "emit"
      ) {
        // Triggering event type
        if (curValue && curValue.type === "out") {
          curJsonData = {
            trigger: (curValue && curValue.filter) || "eventName", // Compatible with legacy data
            eventDate: "{}",
          }
        } else {
          curJsonData = {
            trigger: "eventName", // Compatible with legacy data
            eventDate: "{}",
          }
          // Read old value
          if (curValue && curValue.trigger) {
            curJsonData.trigger = curValue.trigger
          }
          if (curValue && curValue.eventData) {
            curJsonData.eventData = curValue.eventData
          }
        }
      } else {
        // Register event type - trigger event type
        if (curValue && curValue.type === "in") {
          curJsonData = {
            register: "eventName",
            actionFunc: (curValue && curValue.filter) || "() => {}", // Compatible with older data
          }
        } else {
          curJsonData = {
            register: "eventName", // Compatible with legacy data
            actionFunc: "() => {}",
          }
          // Read old value
          if (curValue && curValue.register) {
            curJsonData.register = curValue.register
          }
          if (curValue && curValue.actionFunc) {
            curJsonData.actionFunc = curValue.actionFunc
          }
        }
      }
    } else if (
      jsonSchema.isContainer === false &&
      curValue &&
      isObject(curValue) &&
      JSON.stringify(curValue) !== "{}"
    ) {
      curJsonData = Object.assign(curJsonData, curValue)
    } else if (oldValue === undefined && jsonItem.default && isObject(jsonItem.default)) {
      curJsonData = jsonItem.default
    } else if (jsonSchema.properties) {
      let curPropertyOrder = []
      if (jsonSchema.propertyOrder) {
        curPropertyOrder = jsonSchema.propertyOrder
      } else {
        curPropertyOrder = Object.keys(jsonSchema.properties)
      }
      // Other non-fixed format Object types
      curPropertyOrder.map((jsonKey: string) => {
        const curJsonItem = jsonSchema.properties[jsonKey]
        const curOldValue = jsonData && jsonData[jsonKey]
        switch (getExpectType(curJsonItem.type)) {
          case "array":
            curJsonData[jsonKey] = arraySchema2JsonData(curJsonItem, curOldValue)
            break
          case "object":
            // Normal object type
            curJsonData[jsonKey] = objectSchema2JsonData(curJsonItem, curOldValue)
            break
          default:
            // Other basic types
            curJsonData[jsonKey] = baseSchema2JsonData(curJsonItem, curOldValue)
        }
      })
    }
  }
  return curJsonData
}

/**
 * Convert Array-type schema to JSONData
 * Generate a corresponding jsonData based on jsonSchema and the old version of jsonData.
 * Note: Use older data for data merging.
 * */
function arraySchema2JsonData(jsonSchema: any, jsonData: any) {
  let curJsonData = []
  // Check if it is an array type
  if (jsonSchema && getExpectType(jsonSchema.type) === "array") {
    // Array data object type
    let oldValue = jsonData
    if (
      hasProperties(oldValue) &&
      ((hasProperties(jsonSchema.default) && typeof oldValue !== typeof jsonSchema.default) || !isArray(oldValue))
    ) {
      // Indicates that if the current data type changes, the old data should be discarded.
      oldValue = undefined
    }
    /** Existing values ​​from previous versions are used first, followed by default values ​​defined in the schema. */
    const curValue = hasProperties(oldValue) ? oldValue : jsonSchema.default

    if (getExpectType(jsonSchema.type) === "array") {
      if (isArray(curValue)) {
        curValue.map((arrItem: any) => {
          curJsonData.push(objectSchema2JsonData(jsonSchema.items, arrItem))
        })
      } else if (curValue) {
        curJsonData = curValue
      } else {
        const childItems = objectSchema2JsonData(jsonSchema.items, curValue)
        curJsonData.push(childItems)
      }
    } else {
      // Consider the select type (multiple selections are also recorded as array objects)
      curJsonData = hasProperties(curValue) ? curValue : []
    }
  }
  return curJsonData
}

/**
 * Generate a corresponding jsonData based on jsonSchema and the old version of jsonData.
 * Note: Use older data for data merging.
 * */
export function schema2json(jsonSchema: any, jsonData: any) {
  let curJsonData = {}
  if (getExpectType(jsonSchema.type) === "object") {
    curJsonData = objectSchema2JsonData(jsonSchema, jsonData)
  } else if (getExpectType(jsonSchema.type) === "array") {
    curJsonData = arraySchema2JsonData(jsonSchema, jsonData)
  } else {
    curJsonData = baseSchema2JsonData(jsonSchema, jsonData)
  }
  return curJsonData
}
