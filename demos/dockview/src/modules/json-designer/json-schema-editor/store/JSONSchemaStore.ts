import { observable, computed, action, toJS } from "mobx" // mobx 5.0 写法
import { message } from "antd"
import { pick } from "lodash"
import { isEqual, objClone, isFunction } from "$utils/index"
import { TypeList } from "$data/TypeList"
import {
  isNewSchemaData,
  getParentIndexRoute,
  getParentIndexRoute_CurIndex,
  getSchemaByIndexRoute,
  getSchemaByKeyRoute,
  oldSchemaToNewSchema,
  isContainerSchema,
  indexRoute2keyRoute,
  keyRoute2indexRoute,
  KeyWordList,
  TypeDataList,
} from "@wibetter/json-utils"

const initJSONSchemaData = TypeDataList.jsonschema
const initInputData = TypeDataList.input

export default class JSONSchemaStore {
  /** Primarily used to automatically generate the index in the jsonKey */
  curJsonKeyIndex = 1 // Non-responsive

  /**
   * triggerChange: Used to force an update event to be triggered.
   */
  @observable triggerChange = false

  /**
   * jsonSchema: JSONSchema data object
   */
  @observable jsonSchema: any = {}

  /**
   * Optional sub-item types: SchemaTypeList (TypeList)
   */
  @observable SchemaTypeList: any = TypeList

  /**
   * onChange: The onChange event triggered by changes to jsonSchema data.
   */
  @observable onChange = (data?: any) => {} // Function type

  /**
   * triggerChangeAction: Used to actively trigger update events.
   */
  @action.bound
  triggerChangeAction() {
    this.triggerChange = !this.triggerChange
  }

  /** Initialize TypeList based on configuration data */
  @action.bound
  initSchemaTypeList(typeListOption: any) {
    if (!typeListOption || JSON.stringify(typeListOption) === "{}") {
      // Use the existing TypeList data directly
    } else if (!isEqual(typeListOption, this.SchemaTypeList)) {
      if (typeListOption) {
        Object.keys(typeListOption).map((key) => {
          this.SchemaTypeList[key] = typeListOption[key]
        })
      }
    }
  }

  /** Retrieves the corresponding JSON data based on the index path [non-linked data retrieval] */
  @action.bound
  initJSONSchemaData(jsonSchemaData: any) {
    if (!jsonSchemaData || JSON.stringify(jsonSchemaData) === "{}") {
      // Initialize using the default jsonschema data
      this.jsonSchema = objClone(initJSONSchemaData)
    } else if (!isEqual(jsonSchemaData, this.JSONSchemaObj)) {
      if (jsonSchemaData && isNewSchemaData(jsonSchemaData)) {
        // If lastUpdateTime is present, it indicates that the data is from the new JSON Schema version and can be assigned directly without conversion.
        this.jsonSchema = jsonSchemaData
      } else {
        // Perform a conversion to ensure compatibility with older data.
        const newJSONSchema = oldSchemaToNewSchema(jsonSchemaData)
        this.jsonSchema = newJSONSchema
      }
    }
    // console.info('[json-schema-editor]initJSONSchemaData:', toJS(initJSONSchemaData));
  }

  @computed get JSONSchemaObj() {
    return toJS(this.jsonSchema)
  }

  /** Initialize jsonData */
  @action.bound
  initOnChange(newOnChangeFunc: any) {
    if (newOnChangeFunc || isFunction(newOnChangeFunc)) {
      this.onChange = newOnChangeFunc
    }
  }

  @action.bound
  schemaChange(newSchemaData: any) {
    this.jsonSchema = newSchemaData
    this.jsonSchemaChange(false)
  }

  /** Trigger onChange */
  @action.bound
  jsonSchemaChange(ignore?: boolean) {
    // Update time of jsonSchema data
    this.jsonSchema.lastUpdateTime = new Date().getTime()
    // If ignore is true, skip this step to avoid triggering onChange repeatedly.
    if (!ignore) {
      this.onChange(this.JSONSchemaObj)
    }
  }

  /** Retrieves the corresponding key value path based on the index path */
  @action.bound
  indexRoute2keyRoute(indexRoute: string) {
    return indexRoute2keyRoute(indexRoute, this.jsonSchema)
  }

  /** Retrieves the corresponding index path based on the key value path */
  @action.bound
  keyRoute2indexRoute(keyRoute: string) {
    return keyRoute2indexRoute(keyRoute, this.jsonSchema)
  }

  /** Retrieve the corresponding schema data based on the index path [Non-linked data retrieval] */
  @action.bound
  getSchemaByIndexRoute(indexRoute: string) {
    return getSchemaByIndexRoute(indexRoute, this.jsonSchema, true) // useObjClone: ​​true to avoid subsequent data linkage
  }

  /** Retrieves the corresponding schema data based on the key path [non-linked data retrieval] */
  @action.bound
  getSchemaByKeyRoute(keyRoute: string) {
    return getSchemaByKeyRoute(keyRoute, this.jsonSchema, true) // useObjClone: ​​true to avoid subsequent data linkage
  }

  /** Automatically generate jsonKey based on parentJSONObj */
  @action.bound
  getNewJsonKeyIndex(parentJSONObj: any, prefix?: string): string {
    let newJsonKeyIndex = `${prefix || "field"}_${this.curJsonKeyIndex}`
    if (parentJSONObj.propertyOrder.indexOf(newJsonKeyIndex) >= 0) {
      // Indicates the existence of the same jsonKey
      this.curJsonKeyIndex += 1
      newJsonKeyIndex = this.getNewJsonKeyIndex(parentJSONObj, prefix)
    }
    this.curJsonKeyIndex += 1
    return newJsonKeyIndex
  }

  /** Check if there are duplicate key values ​​*/
  @action.bound
  isExitJsonKey(indexRoute: string, jsonKey: string) {
    const parentIndexRoute = getParentIndexRoute(indexRoute)
    const parentJSONObj = this.getSchemaByIndexRoute(parentIndexRoute)
    if (parentJSONObj.propertyOrder && parentJSONObj.propertyOrder.indexOf(jsonKey) >= 0) {
      // Indicates the existence of the same jsonKey
      return true
    }
    if (KeyWordList && KeyWordList.indexOf(jsonKey) >= 0) {
      // Indicates that the current jsonKey is a JSONSchema key.
      message.warning(
        `${jsonKey} is a JSONSchema keyword; we suggest you change it to avoid data anomalies later.\`
    );
    }
    if (jsonKey && jsonKey.indexOf('-') > -1) {
      message.warning(
        \`The ${jsonKey} value contains a special character ('-'), which may affect subsequent data retrieval and updates. We recommend changing the value.`,
      )
    }
    return false
  }

  /** Determine if the current type is supported */
  @action.bound
  isSupportCurType(indexRoute: string, curType: string) {
    const parentIndexRoute = getParentIndexRoute(indexRoute)
    const parentJSONObj = this.getSchemaByIndexRoute(parentIndexRoute)
    const parentTypeList = this.SchemaTypeList[parentJSONObj.type]
    if (parentTypeList && parentTypeList.indexOf(curType) >= 0) {
      // Indicates support for the current type
      return true
    }
    return false
  }

  /** Insert a new child element (JSON object) based on the index path value (indexRoute). */
  /* Note: The keyword (childKey) is automatically generated, and the JSON data object (childJson) uses initInputData by default.
   */
  @action.bound
  addChildJson(curIndexRoute: string, ignoreOnChange?: boolean) {
    const curSchema = getSchemaByIndexRoute(curIndexRoute, this.jsonSchema, false)
    if (isContainerSchema(curSchema)) {
      const childKey = this.getNewJsonKeyIndex(curSchema)
      curSchema.propertyOrder.push(childKey)
      curSchema.properties[childKey] = initInputData
      // Trigger the onChange event
      this.jsonSchemaChange(ignoreOnChange)
    } else {
      // Note: Child elements are not allowed to be inserted into fields that are not arrays or object types.
      message.warning("Child elements are not allowed to be inserted into fields that are not object type fields")
    }
  }

  /** Update the corresponding JSON data object based on the index path value (indexRoute). */
  /* Note: Primarily used to change the corresponding type attribute value.
   * */
  @action.bound
  changeType(
    curIndexRoute: string,
    jsonKey: string,
    newSchemaData: any,
    targetJsonSchema: any,
    ignoreOnChange?: boolean,
  ) {
    const parentIndexRoute = getParentIndexRoute(curIndexRoute)
    const parentSchemaData = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    // Retain existing configuration data()
    const curNewSchemaData = Object.assign(
      {},
      newSchemaData,
      pick(targetJsonSchema, ["title", "description", "isConditionProp", "showKey", "showCodeViewBtn", "onShow"]),
    )
    if (parentSchemaData.properties && parentSchemaData.properties[jsonKey]) {
      parentSchemaData.properties[jsonKey] = objClone(curNewSchemaData)
    } else if (parentSchemaData[jsonKey]) {
      // Supports switching between Array and item types
      parentSchemaData[jsonKey] = objClone(curNewSchemaData)
    }

    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Edit the corresponding JSON data object based on the index path value (indexRoute) */
  /* Note: Used to overwrite the entire JSON object
   * */
  @action.bound
  updateSchemaData(curIndexRoute: string, newSchemaData: any, ignoreOnChange?: boolean) {
    const curJSONObj = getSchemaByIndexRoute(curIndexRoute, this.jsonSchema, false)
    Object.assign(curJSONObj, objClone(newSchemaData))
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Edit the corresponding JSON data object based on the index path value (indexRoute) */
  /* Note: Used to edit the corresponding attribute values ​​(type, title, description, placeholder, isRequired, default, readOnly)
   * */
  @action.bound
  editSchemaData(curIndexRoute: string, jsonKey: string, newSchemaData: any, ignoreOnChange?: boolean) {
    const parentIndexRoute = getParentIndexRoute(curIndexRoute)
    const parentSchemaObj = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    parentSchemaObj.properties[jsonKey] = {
      ...objClone(parentSchemaObj.properties[jsonKey]),
      ...newSchemaData,
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }
  /** Edit the corresponding jsonKey based on the index path value (indexRoute) */
  /* Note: This is only for modifying the jsonKey value.
   * */
  @action.bound
  editJsonKey(curIndexRoute: string, newJsonKey: string, ignoreOnChange?: boolean) {
    const curJSONObj = getSchemaByIndexRoute(curIndexRoute, this.jsonSchema, true)
    // The last parameter true is used to avoid data association.
    // Insert object values ​​first
    this.insertJsonData(curIndexRoute, newJsonKey, curJSONObj, "", true)
    // Delete the existing JSON data object
    this.deleteJsonByIndex(curIndexRoute, true)
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Insert a new sibling node element based on the index path value (indexRoute) - JSON data object */
  /* Note: The keyword (childKey) is automatically generated; the JSON data object uses initInputData by default.
   * */
  @action.bound
  addNextJsonData(curIndexRoute: string) {
    // 1. Get the path value of the parent element and the last path value of the current element in order to locate the insertion position.
    const parentIndexRoute = getParentIndexRoute(curIndexRoute)
    // 2. Generate a new jsonKey value
    const parentJSONObj = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    /** If no jsonKey is set, a new jsonKey will be automatically generated. */
    const newJsonKey = this.getNewJsonKeyIndex(parentJSONObj)
    this.insertJsonData(curIndexRoute, newJsonKey, initInputData, "", false) // Adds a new input type field by default.
  }

  /** Insert a specified JSON data object (jsonKey, curJSONObj) based on the index path value (indexRoute). */
  /* position (optional): after (indicates insertion after the specified position, default value), before (indicates insertion before the specified position)
   * */
  @action.bound
  insertJsonData(curIndexRoute: string, jsonKey: string, curJSONObj: any, position?: string, ignoreOnChange?: boolean) {
    // 1. Get the path value of the parent element and the last path value of the current element in order to locate the insertion position.
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(curIndexRoute)
    const parentIndexRoute = parentIndexRoute_CurIndex[0] || ""
    const curIndex = parentIndexRoute_CurIndex[1]
    // 2. Get the parent element
    const parentJSONObj = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    // 3. Insert newly added object data
    parentJSONObj.properties[jsonKey] = curJSONObj
    // 4. Insert newJsonKey at the corresponding position in propertyOrder [insert newJsonKey in an ordered manner]
    const currentPropertyOrder = parentJSONObj.propertyOrder
    // 5. Get the insertion position
    const positionIndex = position === "before" ? Number(curIndex) : Number(curIndex) + 1
    const startArr = currentPropertyOrder.slice(0, positionIndex)
    const endArr = currentPropertyOrder.slice(positionIndex)
    parentJSONObj.propertyOrder = [...startArr, jsonKey, ...endArr]
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Delete the corresponding JSON data object based on the index path value (indexRoute) and the key (childKey) */
  @action.bound
  deleteJsonByIndex_CurKey(indexRoute: string, curKey: string, ignoreOnChange?: boolean) {
    // 1. Get the path value of the parent element of the current element
    const parentIndexRoute = getParentIndexRoute(indexRoute)
    const parentJsonObj = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    // 2. Delete the corresponding field object in properties based on curKey
    delete parentJsonObj.properties[curKey]
    // 3. Delete the corresponding curKey in propertyOrder
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey)
    parentJsonObj.propertyOrder.splice(deleteIndex, 1)
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Delete the corresponding JSON data object based on the index path value (indexRoute) */
  @action.bound
  deleteJsonByIndex(indexRoute: string, ignoreOnChange?: boolean) {
    // 1. Get the path value of the parent element and the last path value of the current element in order to locate the insertion position.
    const parentIndexRoute_CurIndex = getParentIndexRoute_CurIndex(indexRoute)
    const parentIndexRoute = parentIndexRoute_CurIndex[0] || ""
    const curIndex: string = parentIndexRoute_CurIndex[1]
    const parentJsonObj = getSchemaByIndexRoute(parentIndexRoute, this.jsonSchema, false)
    const curKey = parentJsonObj.propertyOrder[curIndex]
    // 2. Delete the corresponding field object in properties based on curKey
    delete parentJsonObj.properties[curKey]
    // 3. Delete the corresponding curKey in propertyOrder
    const deleteIndex = parentJsonObj.propertyOrder.indexOf(curKey)
    parentJsonObj.propertyOrder.splice(deleteIndex, 1)
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Update the corresponding enum element based on the index path value (indexRoute) and the position of the enum value (enumIndex). */

  @action.bound
  updateEnumItem(
    indexRoute: string,
    enumIndex: number,
    newEnumKey: string,
    newEnumText: string,
    ignoreOnChange?: boolean,
  ) {
    // 1. Get the parent element of the current element
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum && itemJSONObj.enumextra) {
      itemJSONObj.enum[enumIndex] = newEnumKey
      itemJSONObj.enumextra[enumIndex] = newEnumText
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Determine if a corresponding key exists based on the index path (indexRoute) and the location of the enumeration value (enumIndex). */

  @action.bound
  isExitEnumKey(indexRoute: string, enumIndex: number, newEnumKey: string) {
    let isExit = false
    // 1. Get the parent element of the current element
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum) {
      // 2. Obtain the corresponding key list
      const enumKeys = objClone(itemJSONObj.enum)
      if (enumIndex >= 0) {
        // 3. Remove the key value from the original position
        enumKeys.splice(enumIndex, 1)
      }
      // 4. Check if there are duplicate key values ​​in other locations.
      if (enumKeys.indexOf(newEnumKey) >= 0) {
        isExit = true
      }
    }
    if (KeyWordList && KeyWordList.indexOf(newEnumKey) >= 0) {
      // Indicates that the current jsonKey is a JSONSchema key.
      message.warning(`${newEnumKey} is a JSON Schema keyword; we suggest you change it to avoid data anomalies later.`)
    }
    return isExit
  }

  /** Update the key value of the corresponding enum element based on the index path (indexRoute) and the position of the enum value (enumIndex). */

  @action.bound
  updateEnumKey(indexRoute: string, enumIndex: number, newEnumKey: string, ignoreOnChange?: boolean) {
    // 1. Get the parent element of the current element
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum) {
      // 2. Update the corresponding key
      itemJSONObj.enum[enumIndex] = newEnumKey
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Update the text value of the corresponding enum element based on the index path (indexRoute) and the position of the enum value (enumIndex). */

  @action.bound
  updateEnumText(indexRoute: string, enumIndex: number, newEnumText: string, ignoreOnChange?: boolean) {
    // 1. Get the parent element of the current element
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enumextra) {
      // 2. Update the corresponding text
      itemJSONObj.enumextra[enumIndex] = newEnumText
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Delete the corresponding enum element based on the index path value (indexRoute) and the enum value's position (enumIndex). */

  @action.bound
  deleteEnumItem(indexRoute: string, enumIndex: number, ignoreOnChange?: boolean) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum && itemJSONObj.enumextra) {
      itemJSONObj.enum.splice(enumIndex, 1)
      itemJSONObj.enumextra.splice(enumIndex, 1)
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  /** Insert the corresponding enum element based on the index path value (indexRoute) and the position of the enum value (enumIndex). */
  /* position: Sets whether to insert before or after the specified position. The default is to insert after the specified position.*/

  @action.bound
  insertEnumItem(
    indexRoute: string,
    enumIndex: number,
    newEnumKey: string,
    newEnumText: string,
    position?: string,
    ignoreOnChange?: boolean,
  ) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum && itemJSONObj.enumextra) {
      const positionIndex = position === "before" ? Number(enumIndex) : Number(enumIndex) + 1
      // Insert a new key value (newEnumKey) at the specified position in the enum.
      const startKeys = itemJSONObj.enum.slice(0, positionIndex)
      const endKeys = itemJSONObj.enum.slice(positionIndex)
      itemJSONObj.enum = [...startKeys, newEnumKey, ...endKeys]
      // Insert newEnumText at the specified position in the enum
      const startTexts = itemJSONObj.enumextra.slice(0, positionIndex)
      const endTexts = itemJSONObj.enumextra.slice(positionIndex)
      itemJSONObj.enumextra = [...startTexts, newEnumText, ...endTexts]
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  @action.bound
  getNewEnumIndex(enumKeys: string[], prefix?: string): string {
    let newEnumKey = `${prefix || "enum"}_${this.curJsonKeyIndex}`
    if (enumKeys.indexOf(newEnumKey) >= 0) {
      // Indicates the existence of the same jsonKey
      this.curJsonKeyIndex += 1
      newEnumKey = this.getNewEnumIndex(enumKeys, prefix)
    }
    this.curJsonKeyIndex += 1
    return newEnumKey
  }

  /** Add a new enum value based on the index path (indexRoute) and the location of the enum value (enumIndex). */

  @action.bound
  addEnumItem(indexRoute: string, enumIndex: number) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum) {
      const newEnumKey = this.getNewEnumIndex(itemJSONObj.enum)
      const newEnumText = `options${this.curJsonKeyIndex - 1}`
      this.insertEnumItem(indexRoute, enumIndex, newEnumKey, newEnumText, "", false)
      // Insert a new element
    }
  }

  /** Copy the corresponding enum enum value based on the index path value (indexRoute) and the location of the enum enum value (enumIndex). */

  @action.bound
  copyEnumItem(indexRoute: string, enumIndex: number) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.enum) {
      const curEnumKey = itemJSONObj.enum[enumIndex]
      const curEnumText = itemJSONObj.enumextra[enumIndex]
      const newEnumKey = this.getNewEnumIndex(itemJSONObj.enum, curEnumKey)
      const newEnumText = `${curEnumText}_${this.curJsonKeyIndex - 1}`
      this.insertEnumItem(indexRoute, enumIndex, newEnumKey, newEnumText, "", false)
      // Insert the enumerated element of copy;
    }
  }

  // Update options
  @action.bound
  updateOptionItem(
    indexRoute: string,
    optionIndex: number,
    optionLabel: string,
    optionValue: string,
    ignoreOnChange?: boolean,
  ) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options && itemJSONObj.options[optionIndex]) {
      itemJSONObj.options[optionIndex].label = optionLabel
      itemJSONObj.options[optionIndex].value = optionValue
    }
    // Trigger the onChange event
    this.jsonSchemaChange(ignoreOnChange)
  }

  // Check if there are duplicate Labels
  @action.bound
  isExitOptionLabel(indexRoute: string, optionLabel: string) {
    let isExit = false
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options) {
      if (
        itemJSONObj.options.find(
          (item: any) => item.label === optionLabel, //  || item.name === optionLabel
        )
      ) {
        isExit = true
      }
    }
    if (KeyWordList && KeyWordList.indexOf(optionLabel) >= 0) {
      // Indicates that the current jsonKey is a JSONSchema key.
      message.warning(`${optionLabel} is a reserved keyword in JSON Schema; we recommend you change its name.`)
    }
    return isExit
  }

  // Update option Label
  @action.bound
  updateOptionLabel(indexRoute: string, optionIndex: number, optionLabel: string, ignoreOnChange?: boolean) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options && itemJSONObj.options[optionIndex]) {
      itemJSONObj.options[optionIndex].label = optionLabel
    }
    this.jsonSchemaChange(ignoreOnChange)
  }

  // Update option values
  @action.bound
  updateOptionValue(indexRoute: string, optionIndex: number, optionValue: string, ignoreOnChange?: boolean) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options && itemJSONObj.options[optionIndex]) {
      itemJSONObj.options[optionIndex].value = optionValue
    }
    this.jsonSchemaChange(ignoreOnChange)
  }

  // Delete option
  @action.bound
  deleteOptionItem(indexRoute: string, optionIndex: number, ignoreOnChange?: boolean) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options && itemJSONObj.options[optionIndex]) {
      itemJSONObj.options.splice(optionIndex, 1)
    }
    this.jsonSchemaChange(ignoreOnChange)
  }

  // Insert options at the specified location
  @action.bound
  insertOption(
    indexRoute: string,
    optionIndex: number,
    newOptionLabel: string,
    newOptionValue: string,
    position?: string,
    ignoreOnChange?: boolean,
  ) {
    const curJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (curJSONObj.options) {
      const positionIndex = position === "before" ? Number(optionIndex) : Number(optionIndex) + 1
      // Insert a new option at the specified location in options
      const startKeys = curJSONObj.options.slice(0, positionIndex)
      const endKeys = curJSONObj.options.slice(positionIndex)
      const newOption = {
        label: newOptionLabel,
        value: newOptionValue,
      }
      curJSONObj.options = [...startKeys, newOption, ...endKeys]
    }
    this.jsonSchemaChange(ignoreOnChange)
  }

  @action.bound
  getNewOptionValue(options: any[]) {
    if (options && options.length > 0) {
      return `${options[options.length - 1].value}_${options.length + 1}`
    }
    return "value1"
  }

  // Add options
  @action.bound
  addOptionItem(indexRoute: string, optionIndex: number) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options) {
      const optionValue = this.getNewOptionValue(itemJSONObj.options)
      const optionLabel = `options${itemJSONObj.options.length + 1}`
      this.insertOption(indexRoute, optionIndex, optionLabel, optionValue, "", false)
      // Insert a new element
    }
  }

  // Copy option
  @action.bound
  copyOptionItem(indexRoute: string, optionIndex: number) {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    if (itemJSONObj.options) {
      const curOption = itemJSONObj.options[optionIndex]
      const optionValue = this.getNewOptionValue(itemJSONObj.options)
      const optionLabel = `${curOption.label || curOption.name}_copy`
      this.insertOption(indexRoute, optionIndex, optionLabel, optionValue, "", false)
    }
  }

  /** Data item sorting function */
  @action.bound
  childElemSort = (indexRoute: string) => {
    const itemJSONObj = getSchemaByIndexRoute(indexRoute, this.jsonSchema, false)
    const curPropertyOrder = itemJSONObj.propertyOrder // Array of keys to be sorted
    const baseElemArr = [] // Basic types: input, url
    const numberElemArr = [] // Number type: quantity, number
    const selectElemArr = [] // Selection type: radio, select, color, boolean
    const timeElemArr = [] // Time type: date, date-time, time
    const areaElemArr = [] // Long text types: textarea, codearea, htmlarea, json
    const imageElemArr = [] // Image type
    const objectElemArr = [] // object、array类型
    const funcElemArr = [] // Special types such as event and datasource

    for (let index = 0, size = curPropertyOrder.length; index < size; index++) {
      const curKey = curPropertyOrder[index]
      const curItem = itemJSONObj.properties[curKey]
      const curType = curItem.type
      switch (curType) {
        case "input":
        case "url":
          baseElemArr.push(curKey)
          break
        case "number":
        case "quantity":
          numberElemArr.push(curKey)
          break
        case "radio":
        case "checkboxes":
        case "boolean":
        case "color":
          selectElemArr.push(curKey)
          break
        case "date":
        case "date-time":
        case "time":
          timeElemArr.push(curKey)
          break
        case "textarea":
        case "json":
        case "codearea":
        case "htmlarea":
          areaElemArr.push(curKey)
          break
        case "image":
          imageElemArr.push(curKey)
          break
        case "object":
        case "array":
          objectElemArr.push(curKey)
          break
        default:
          funcElemArr.push(curKey)
          break
      }
    }

    // Get the latest key value in sequence array
    itemJSONObj.propertyOrder = [
      ...baseElemArr,
      ...numberElemArr,
      ...selectElemArr,
      ...timeElemArr,
      ...imageElemArr,
      ...areaElemArr,
      ...objectElemArr,
      ...funcElemArr,
    ]
    // Trigger the onChange event
    this.jsonSchemaChange(false)
  }
}
