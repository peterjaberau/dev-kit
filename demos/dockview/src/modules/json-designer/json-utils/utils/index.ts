import {
  cloneDeep,
  isEqual as _isEqual,
  truncate as truncateStr,
} from 'lodash';
import qs from 'qs';
import { isObject } from '$utils/typeof';

/**
 Get all parameters from the URL
 For example: If the current page's address is xx?a1=123, then urlParse() => {a1: 123}
 */
export function urlParse() {
  let urlParams = {};
  if (location.search) {
    urlParams = qs.parse(location.search.substring(1));
  }
  return urlParams;
}

/**
 * Convert to a parameter string in the URL
 * @param {*} urlParams
 For example: {a1: 123} => a1=123
 */
export function urlStringify(urlParams: any) {
  let urlStr = '';
  if (urlParams) {
    urlStr = qs.stringify(urlParams);
  }
  return urlStr;
}

/** Performs a deep copy of JavaScript object data to avoid data linkage */
export function objClone(targetObj: any) {
  // const newObj = JSON.stringify(targetObj);
  // return JSON.parse(newObj);
  return cloneDeep(targetObj);
}

/** Compare two JSON data sets to see if they are equal */
export function isEqual(targetObj: any, nextTargetObj: any) {
  if (
    (hasProperties(targetObj) && !hasProperties(nextTargetObj)) ||
    (!hasProperties(targetObj) && hasProperties(nextTargetObj)) ||
    typeof targetObj !== typeof nextTargetObj
  ) {
    return false;
  }
  if (
    isObject(targetObj) &&
    (targetObj.id !== nextTargetObj.id ||
      targetObj.lastUpdateTime !== nextTargetObj.lastUpdateTime)
  ) {
    return false;
  }
  const curTime = new Date().getTime();
  if (
    isObject(targetObj) &&
    targetObj.lastUpdateTime &&
    targetObj.lastUpdateTime === nextTargetObj.lastUpdateTime &&
    curTime - targetObj.lastUpdateTime < 500
  ) {
    // If two objects have the same timestamp and the difference between their timestamps and the current timestamp is less than 500 milliseconds, then the two objects are considered to be identical.
    return true;
  }
  return _isEqual(targetObj, nextTargetObj);
}

// Determine if data is equal based on id or lastUpdateTime
export function isEqualByIdT(targetObj: any, nextTargetObj: any) {
  if (
    (hasProperties(targetObj) && !hasProperties(nextTargetObj)) ||
    (!hasProperties(targetObj) && hasProperties(nextTargetObj)) ||
    typeof targetObj !== typeof nextTargetObj
  ) {
    return false;
  }
  if (
    isObject(targetObj) &&
    (targetObj.id !== nextTargetObj.id ||
      targetObj.lastUpdateTime !== nextTargetObj.lastUpdateTime)
  ) {
    return false;
  }

  const curTime = new Date().getTime();
  if (
    isObject(targetObj) &&
    targetObj.lastUpdateTime &&
    targetObj.lastUpdateTime === nextTargetObj.lastUpdateTime &&
    curTime - targetObj.lastUpdateTime < 500
  ) {
    // If two objects have the same timestamp and the difference between their timestamps and the current timestamp is less than 500 milliseconds, then the two objects are considered to be identical.
    return true;
  }

  if (
    isObject(targetObj) &&
    ((hasProperties(targetObj.id) && targetObj.id === nextTargetObj.id) ||
      (hasProperties(targetObj.lastUpdateTime) &&
        targetObj.lastUpdateTime === nextTargetObj.lastUpdateTime))
  ) {
    return true;
  } else {
    return _isEqual(targetObj, nextTargetObj);
  }
}

/** Check if the current property exists /** Check if the current property exists */
/*Note: This is to identify boolean type values.*/
export function hasProperties(targetProperties: any) {
  let hasProperties = false;
  if (targetProperties !== undefined && targetProperties !== null) {
    // targetProperties is considered to exist if it equals "", 0, or false.
    hasProperties = true;
  }
  return hasProperties;
}

// Truncate the string to avoid expanding the element
// https://www.lodashjs.com/docs/lodash.truncate
export function truncate(str: string, paramConfig: any) {
  if (str) {
    return truncateStr(str, paramConfig);
  }
  return truncateStr(str, paramConfig);
}

/**
 * Supports property expressions
 */
export function evalExpression(expressionStr: string, data: any) {
  const curData = data || {};
  if (!expressionStr) return false;
  const expressionFunc = new Function(
    'data',
    `with(data) { return (${expressionStr});}`,
  );
  let expressionResult = '';
  try {
    expressionResult = expressionFunc(curData);
  } catch (error) {
    console.warn(`An expression evaluation error: ${expressionStr}, error message: `, error);
    return expressionResult;
  }

  return expressionResult;
}
