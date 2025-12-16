import { getExpectType } from '$function/getExpectType';
/**
 * General operation methods for JSONSchema (JSON format) objects [A collection of methods for manipulating non-reactive data]
 */

/** Check if the schema is empty. */
/* Includes general schemas and schemas specific to component configurations.
* */
export function isEmptySchema(targetJsonSchema: any) {
  let isEmpty = true;
  if (!targetJsonSchema) {
    return isEmpty;
  }
  const curType = targetJsonSchema.type;
  if (
    curType === 'object' &&
    targetJsonSchema.properties &&
    targetJsonSchema.propertyOrder &&
    targetJsonSchema.propertyOrder.length > 0
  ) {
    // Object type
    isEmpty = false;
  } else if (
    curType === 'array' &&
    targetJsonSchema.items &&
    targetJsonSchema.items.properties &&
    targetJsonSchema.items.propertyOrder &&
    targetJsonSchema.items.propertyOrder.length > 0
  ) {
    // Array type
    isEmpty = false;
  } else if (
    (targetJsonSchema.type &&
      targetJsonSchema.type !== 'array' &&
      targetJsonSchema.type !== 'object') ||
    targetJsonSchema.type
  ) {
    // Other basic types
    isEmpty = false;
  }
  return isEmpty;
}

/**
 * Determine if the schema data is the latest version.
 * Note: Ensure the current schema data was generated using @wibetter/json-schema-editor
 * */
export function isNewSchemaData(schemaData: any) {
  let isNewVersion = false;
  const { lastUpdateTime } = schemaData;
  // From that moment on, it was considered to be the new version of JSON Schema
  // const newVersionTime = new Date('2020-07-29T07:30:00.691Z').getTime();
  const newVersionTime = new Date('2024-10-05T00:01:00.691Z').getTime();
  if (lastUpdateTime && new Date(lastUpdateTime).getTime() >= newVersionTime) {
    isNewVersion = true;
  }
  return isNewVersion;
}

/** Determine if an element is a container type ... */
/* Container type field: object numeric type
* Primarily used to determine whether clicking "Add" on the current element adds a child element or a sibling node. For container types, clicking "Add" adds a child node.
* Note: Array type fields have only one fixed item attribute and cannot have additional child elements added.
* */
export function isContainerSchema(curSchema: any) {
  let isContainerElem = false;
  const valueType = getExpectType(curSchema.type);
  const isContainer =
    curSchema.isContainer !== undefined ? curSchema.isContainer : true; // 默认 isContainer 为 true
  if (valueType === 'object' && isContainer) {
    isContainerElem = true;
  }
  return isContainerElem;
}

/** Determine if the data is structured schema data. */
/* Decision criterion: If the first-level schema is of type object, all its second-level schemas must also be of type object.
* */
export function isStructuredSchema(jsonSchema: any) {
  let isStructured = true;
  const currentType = jsonSchema.type;
  if (
    currentType !== 'object' ||
    !jsonSchema.propertyOrder ||
    !jsonSchema.properties
  ) {
    isStructured = false;
  } else {
    jsonSchema.propertyOrder.map((key: string) => {
      /** 1. Get the current schema object */
      const curSchemaData = jsonSchema.properties[key];
      /** 2. Determine if it is a container element; if so, disable selection. */
      const curType = jsonSchema.type;
      if (
        curType !== 'object' ||
        !curSchemaData.propertyOrder ||
        !curSchemaData.properties
      ) {
        isStructured = false;
      }
    });
  }
  return isStructured;
}

/**
 * Determine if they are from the same parent element
 * Note: Used to determine whether two elements are in the same parent container.
 */
export function isSameParent(curIndex: string, targetIndex: string) {
  const curIndexArr = curIndex.split('-');
  const targetIndexArr = targetIndex.split('-');
  curIndexArr.pop();
  targetIndexArr.pop();
  if (curIndexArr.join('-') === targetIndexArr.join('-')) {
    return true;
  }
  return false;
}

/**
 * Determine whether the current element is before or after the target element (based on the positions of both the current and target elements).
 */
export function getCurPosition(curIndex: string, targetIndex: string) {
  const curIndexArr = curIndex.split('-');
  const targetIndexArr = targetIndex.split('-');
  let curPosition = 'before'; // Defaults to before the target element.
  // Use the shortest path for traversal (to avoid null pointer exceptions)
  const forEachArr =
    curIndexArr.length > targetIndexArr.length ? targetIndexArr : curIndexArr;
  for (let index = 0, size = forEachArr.length; index < size; index += 1) {
    const curIndexItem = Number(curIndexArr[index]);
    const targetIndexItem = Number(targetIndexArr[index]);
    if (curIndexItem > targetIndexItem) {
      curPosition = 'after'; // Indicates that the current element is after the target element.
    }
  }
  return curPosition;
}

/**
 * Get the path value of the parent element
 */
export function getParentIndexRoute(curIndexRoute: string | number) {
  const curIndexArr =
    typeof curIndexRoute === 'string'
      ? curIndexRoute.split('-')
      : [curIndexRoute.toString()];
  curIndexArr.pop();
  return curIndexArr.join('-');
}

/**
 Get the path value of the next sibling element.
 */
export function getNextIndexRoute(curIndexRoute: string | number) {
  const curIndexArr =
    typeof curIndexRoute === 'string'
      ? curIndexRoute.split('-')
      : [curIndexRoute.toString()];
  const lastIndex = curIndexArr.pop();
  const endIndex = Number(lastIndex) + 1;
  curIndexArr.push(`${endIndex}`);
  return curIndexArr.join('-');
}

/**
 * Get the path value of the parent element and the current index.
 */
export function getParentIndexRoute_CurIndex(curIndexRoute: string | number) {
  const curIndexArr =
    typeof curIndexRoute === 'string'
      ? curIndexRoute.split('-')
      : [curIndexRoute.toString()];
  const curIndex: string = curIndexArr.pop() || '';
  return [curIndexArr.join('-'), curIndex];
}

/**
 * Move the current path value one position forward.
 */
export function moveForward(curIndexRoute: string | number) {
  const curIndexArr: any =
    typeof curIndexRoute === 'string'
      ? curIndexRoute.split('-')
      : [curIndexRoute.toString()];
  const curIndex: any = curIndexArr.pop();
  curIndexArr.push(Number(curIndex) - 1);
  return curIndexArr.join('-');
}

/**
 * Shift the current path value one position to the right.
 */
export function moveBackward(curIndexRoute: string | number) {
  const curIndexArr: any =
    typeof curIndexRoute === 'string'
      ? curIndexRoute.split('-')
      : [curIndexRoute.toString()];
  const curIndex = curIndexArr.pop();
  curIndexArr.push(Number(curIndex) + 1);
  return curIndexArr.join('-');
}

/**
 * Get the value of the first option
 */
export function getDefaultOptionVal(jsonSchema: any, multiple?: boolean) {
  let defaultVal: any = '';
  let hasOptions = false;
  if (
    jsonSchema.defaultActiveFirstOption === false ||
    !jsonSchema.defaultActiveFirstOption
  ) {
    // If the first data item is not selected by default, no value will be automatically generated.
    return undefined;
  }
  if (jsonSchema.options && jsonSchema.options[0]) {
    defaultVal = jsonSchema.options[0].value;
    hasOptions = true;
  }
  if (multiple || jsonSchema.multiple) {
    defaultVal = hasOptions ? [defaultVal] : [];
  }
  return defaultVal;
}
