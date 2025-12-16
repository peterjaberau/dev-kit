import { getExpectType } from "$function/getExpectType"

/**
 Collect all condition subfields in the current schema and concatenate their values ​​to form the corresponding conditionValue.
 */
export function schema2conditionValue(jsonSchema: any, jsonData: any) {
  let conditionValue = ""
  if (getExpectType(jsonSchema.type) === "object" && jsonSchema.properties) {
    let curPropertyOrder = []
    if (jsonSchema.propertyOrder) {
      curPropertyOrder = jsonSchema.propertyOrder
    } else {
      curPropertyOrder = Object.keys(jsonSchema.properties)
    }
    curPropertyOrder.map((jsonKey: string) => {
      const curJsonItem = jsonSchema.properties[jsonKey]
      let curConditionValue = jsonData[jsonKey]
      if (getExpectType(curJsonItem.type) !== "array" || getExpectType(curJsonItem.type) !== "object") {
        if (curConditionValue && curJsonItem.isConditionProp) {
          // Only record the numerical value of the condition field
          if (conditionValue.indexOf("-") > 0) {
            conditionValue += `-${curConditionValue}`
          } else {
            conditionValue = curConditionValue
          }
        }
      }
    })
  }
  return conditionValue
}
