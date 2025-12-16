import {
  objClone as _objClone,
  isEqual as _isEqual,
} from '@wibetter/json-utils';

/** Performs a deep copy of JavaScript object data to avoid data linkage */
export function objClone(targetObj: any) {
  // const newObj = JSON.stringify(targetObj);
  // return JSON.parse(newObj);
  return _objClone(targetObj);
}

/** Compare two JSON data sets to see if they are equal */
export function isEqual(targetObj: any, nextTargetObj: any) {
  // return JSON.stringify(targetObj) === JSON.stringify(nextTargetObj);
  return _isEqual(targetObj, nextTargetObj);
}

/** Check if the current property exists /** Check if the current property exists */
/*Note: This is to identify boolean type values.*/
export function hasProperties(targetProperties: any) {
  let hasProperties = false;
  if (targetProperties !== undefined) {
    // "", 0, and false are all considered to be existing properties.
    hasProperties = true;
  }
  return hasProperties;
}

/** Determine if an element is a primitive type based on its className. */
/* Basic element types: input, boolean, date, date-time, time, url,
*  textarea、number、 radio、 select、color、quantity
*/
export function isBaseSchemaElem(elemClassName: string) {
  let isBaseSchema = false;
  if (
    elemClassName.indexOf('input-schema') >= 0 ||
    elemClassName.indexOf('boolean-schema') >= 0 ||
    elemClassName.indexOf('date-schema') >= 0 ||
    elemClassName.indexOf('date-time-schema') >= 0 ||
    elemClassName.indexOf('time-schema') >= 0 ||
    elemClassName.indexOf('url-schema') >= 0 ||
    elemClassName.indexOf('textarea-schema') >= 0 ||
    elemClassName.indexOf('number-schema') >= 0 ||
    elemClassName.indexOf('radio-schema') >= 0 ||
    elemClassName.indexOf('select-schema') >= 0 ||
    elemClassName.indexOf('color-schema') >= 0 ||
    elemClassName.indexOf('quantity-schema') >= 0
  ) {
    isBaseSchema = true;
  }
  return isBaseSchema;
}

/** Determine if an element is a container type based on its className. */
/* Container type elements: func, style, data, object
* Primarily used to determine whether clicking "Add" on the current element adds a child element or a sibling node. For container types, clicking "Add" adds a child node.
* Note: Array type fields have only one fixed item attribute and cannot have additional child elements added.
*/
export function isBoxSchemaElem(elemClassName: string) {
  let isBoxSchema = false;
  if (
    elemClassName.indexOf('func-schema') >= 0 ||
    elemClassName.indexOf('style-schema') >= 0 ||
    elemClassName.indexOf('data-schema') >= 0 ||
    elemClassName.indexOf('object-schema') >= 0
  ) {
    isBoxSchema = true;
  }
  return isBoxSchema;
}

/**
 * Determine if it is an array type
 */
export function isArray(curObj: any) {
  let isArray = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Array') {
    isArray = true;
  }
  return isArray;
}

/**
 * Determine if it is an object type
 */
export function isObject(curObj: any) {
  let isObject = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
    isObject = true;
  }
  return isObject;
}

/**
 * Determine if it is a function type
 */
export function isFunction(curObj: any) {
  let isFunction = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Function') {
    isFunction = true;
  }
  return isFunction;
}

/**
 * Cache data in sessionStorage
 */
export function saveWebCacheData(cacheKey: string, targetSourceIndex: string) {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(cacheKey, targetSourceIndex);
  }
}

/**
 * Read previously cached data from sessionStorage
 */
export function getWebCacheData(cacheKey: string): string | null | undefined {
  if (window.sessionStorage) {
    return window.sessionStorage.getItem(cacheKey);
  }
  return undefined;
}

/**
 * Delete previously cached data from sessionStorage
 */
export function deleteWebCacheData(cacheKey: string) {
  if (window.sessionStorage) {
    return window.sessionStorage.removeItem(cacheKey);
  }
}
