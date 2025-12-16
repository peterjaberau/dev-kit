/**
 * oldSchemaToNewSchema: Convert the old jsonSchema to the new jsonSchema
 * The new version adds a `propertyOrder` property (required for sorting display), therefore the old `required` property needs to be generated based on the properties file to obtain the corresponding `propertyOrder` property.
 * Note: The new version requires the title to be obtained from the description (the old version used the value of the description field for the title).
 * */
import { objClone, hasProperties } from "$utils/index"
import { isObject } from "$utils/typeof"
import { DataSourceTypeList, EventTypeDataList, TypeDataList } from "$data/TypeDataList"

// 2020-07-29
export function oldSchemaToNewSchemaV1(oldSchema: any) {
  let newJSONSchema = objClone(oldSchema) // Perform a deep copy to avoid affecting the original data;
  // 1. Generate a title value based on the existing description value.
  if (!newJSONSchema.title && newJSONSchema.description) {
    newJSONSchema.title = newJSONSchema.description
  }
  // 2. Reassign a value when format is empty
  if (!newJSONSchema.type) {
    newJSONSchema.type = newJSONSchema.format
  }
  // 3. Types that do not require a default property will be automatically deleted.
  if (
    (newJSONSchema.type === "quantity" ||
      newJSONSchema.type === "array" ||
      newJSONSchema.type === "datasource" ||
      newJSONSchema.type === "event" ||
      newJSONSchema.type === "object") &&
    hasProperties(newJSONSchema.default)
  ) {
    delete newJSONSchema.default // Move the default value for unit input types to the unit property.
  }
  // Convert the old radio type data structure
  if (newJSONSchema.type === "radio") {
    newJSONSchema.type = "string"
    if (newJSONSchema.enum && newJSONSchema.enumextra) {
      // Convert to items
      newJSONSchema.items = {
        type: "string",
        enum: objClone(newJSONSchema.enum),
        enumextra: objClone(newJSONSchema.enumextra),
      }
      // Delete the previous enum and enumextra
      delete newJSONSchema.enum
      delete newJSONSchema.enumextra
    }
  }
  // Convert the old version of the quantity type data structure
  if (newJSONSchema.type === "quantity") {
    const curProperties = newJSONSchema.properties
    const newQuantitySchema = objClone(TypeDataList.quantity) // The schema data object for the new quantity
    if (curProperties.quantity && isObject(curProperties.quantity) && curProperties.quantity.default) {
      const oldDefault = curProperties.quantity.default
      // Percentages are automatically converted to %
      newQuantitySchema.properties.quantity.default = oldDefault === "percent" ? "%" : oldDefault
    }
    // Integrate new schema data
    newJSONSchema = newQuantitySchema
  }
  // Convert the old datasource type data structure
  if (newJSONSchema.type === "datasource") {
    const curProperties = newJSONSchema.properties
    // First, retrieve the key data from the old version.
    const typeProp = curProperties.type && curProperties.type.default
    const dataProp = curProperties.data && curProperties.data.default
    const filterProp = curProperties.filter && curProperties.filter.default
    if (typeProp === "local") {
      newJSONSchema = objClone(DataSourceTypeList.local)
      newJSONSchema.properties.data.default = dataProp ? objClone(dataProp) : "{}"
    } else {
      newJSONSchema = objClone(DataSourceTypeList.remote)
      newJSONSchema.properties.data.default = dataProp ? objClone(dataProp) : "http://xxx"
    }
    newJSONSchema.properties.filter.default = filterProp ? objClone(filterProp) : "() => {}"
  }
  // Convert the old event type data structure
  if (newJSONSchema.type === "event") {
    const curProperties = newJSONSchema.properties
    // First, retrieve the key data from the old version.
    const eventType = curProperties.type && curProperties.type.default
    // Refactor the Event data structure
    if (eventType === "in" || eventType === "on") {
      // Compatible with both the old 'in' and the new 'on'
      // Registration-related events: The new version changes the type to 'on'
      const eventFunc = (curProperties.filter && curProperties.filter.default) || "() => {}"
      newJSONSchema = objClone(EventTypeDataList.on)
      if (curProperties.actionFunc && isObject(curProperties.actionFunc)) {
        newJSONSchema.properties.actionFunc.default = curProperties.actionFunc.default || objClone(eventFunc)
      }
    } else {
      // Other events are triggered by default.
      // Registration-related events: The new version changes the type to 'emit'
      const eventFunc = (curProperties.filter && curProperties.filter.default) || "{}"
      newJSONSchema = objClone(EventTypeDataList.emit)
      if (curProperties.eventData && isObject(curProperties.eventData)) {
        newJSONSchema.properties.eventData.default = curProperties.eventData.default || objClone(eventFunc)
      }
    }
  }
  // Check if the propertyOrder property exists
  if (newJSONSchema.properties) {
    if (!newJSONSchema.propertyOrder) {
      // Generate propertyOrder property
      newJSONSchema.propertyOrder = Object.keys(newJSONSchema.properties)
    }
    // Continue iterating through the properties properties and performing the conversion.
    newJSONSchema.propertyOrder.map((jsonKey: string) => {
      newJSONSchema.properties[jsonKey] = oldSchemaToNewSchema(newJSONSchema.properties[jsonKey])
    })
  }
  // Check if the items attribute exists
  if (newJSONSchema.items) {
    // 6. Transform the data in items
    newJSONSchema.items = oldSchemaToNewSchema(newJSONSchema.items)
  }
  return newJSONSchema
}

// Converting the old schema version prior to 2024-10-05 to the new schema version
export function oldSchemaToNewSchema(oldSchema: any) {
  let newJSONSchema = objClone(oldSchema) // Perform a deep copy to avoid affecting the original data;
  // Delete unnecessary attributes
  if (!newJSONSchema.required) {
    delete newJSONSchema.required
  }
  if (newJSONSchema.type && newJSONSchema.type) {
    newJSONSchema.type = newJSONSchema.type
  }
  // Types that do not require a default property will be automatically deleted.
  if (
    (newJSONSchema.type === "quantity" ||
      newJSONSchema.type === "array" ||
      newJSONSchema.type === "datasource" ||
      newJSONSchema.type === "event" ||
      newJSONSchema.type === "object") &&
    hasProperties(newJSONSchema.default)
  ) {
    delete newJSONSchema.default // Move the default value for unit input types to the unit property.
  }
  // Convert the old selection type data structure
  if (newJSONSchema.type === "radio" || newJSONSchema.type === "checkboxes" || newJSONSchema.type === "select") {
    if (newJSONSchema.items && newJSONSchema.items.enum && newJSONSchema.items.enumextra) {
      newJSONSchema.options = []
      newJSONSchema.items.enum.forEach((option: any, optionIndex: number) => {
        newJSONSchema.options.push({
          label: newJSONSchema.items.enumextra[optionIndex] || option,
          value: option,
        })
      })
      // Delete previous items
      delete newJSONSchema.items
    }
  }
  // Check if the propertyOrder property exists
  if (newJSONSchema.properties) {
    if (!newJSONSchema.propertyOrder) {
      // Generate propertyOrder property
      newJSONSchema.propertyOrder = Object.keys(newJSONSchema.properties)
    }
    // Continue iterating through the properties properties and performing the conversion.
    newJSONSchema.propertyOrder.map((jsonKey: string) => {
      newJSONSchema.properties[jsonKey] = oldSchemaToNewSchema(newJSONSchema.properties[jsonKey])
    })
  }
  if (newJSONSchema.type === "array" && newJSONSchema.items) {
    // Transform the data in items
    newJSONSchema.items = oldSchemaToNewSchema(newJSONSchema.items)
  }
  return newJSONSchema
}
