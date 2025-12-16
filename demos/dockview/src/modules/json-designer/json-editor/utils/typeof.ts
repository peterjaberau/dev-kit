import { TypeDataList } from '@wibetter/json-utils';

// Check if it is a URL address type
export function isURL(s: string): boolean {
  return /^http[s]?:\/\/.*/.test(s);
}
// Check if it is a string type
export function isString(o: any): boolean {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String';
}
// Check if it is a number type
export function isNumber(value: any): boolean {
  return (
    typeof value === 'number' ||
    Object.prototype.toString.call(value) === '[object Number]'
  );
}
// Check if it is a Boolean type
export function isBoolean(o: any): boolean {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
}

// Determine if it is a year-month-day time type
export function isDateStr(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// Determine if it is a year, month, day, hour, or minute time type
export function isDateTimeStr(dateStr: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(dateStr) ||
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(dateStr)
  );
}

// Determine if it is a time-division time type
export function isTimeStr(dateStr: string): boolean {
  return /^\d{2}:\d{2}:\d{2}$/.test(dateStr) || /^\d{2}:\d{2}$/.test(dateStr);
}

/**
 * Determine if it is an array type
 * */
export function isArray(curObj: any): boolean {
  let isArray = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Array') {
    isArray = true;
  }
  return isArray;
}

/**
 * Determine if it is a select type (an array of basic types)
 * The select type must be an array type.
 * */
export function isSelect(curObj: any): boolean {
  if (!isArray(curObj)) {
    return false;
  }
  for (let ind = 0, size = curObj.length; ind < size; ind++) {
    const arrItem = curObj[ind];
    if (!isString(arrItem)) {
      // If any element is not a string, it is considered not a select.
      return false;
    }
  }
  return true;
}

/**
 * Determine if it is an object type
 * */
export function isObject(curObj: any): boolean {
  let isObject = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
    isObject = true;
  }
  return isObject;
}

/**
 * Determine if it is a unit type
 * */
export function isQuantity(val: any): boolean {
  let isObject = false;
  // Get the available unit types for the current unit of measurement element
  const quantityList = TypeDataList.quantity.properties.quantity.enum;
  if (quantityList.indexOf(val) >= 0) {
    isObject = true;
  }
  return isObject;
}

/**
 * Determine if it is a color value
 * */
export function isColor(colorVal: string): boolean {
  return /^#[0-9a-f]{3,6}$/.test(colorVal);
}

/**
 * Determine if it is a function type
 * */
export function isFunction(curObj: any): boolean {
  let isFunction = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Function') {
    isFunction = true;
  }
  return isFunction;
}
