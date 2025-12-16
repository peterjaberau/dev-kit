import { TypeDataList } from '$data/TypeDataList';

// Check if it is a URL address type
export function isURL(s: any) {
  return /^http[s]?:\/\/.*/.test(s);
}
// Check if it is a string type
export function isString(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'String';
}
// Check if it is a number type
export function isNumber(value: any) {
  return (
    typeof value === 'number' ||
    Object.prototype.toString.call(value) === '[object Number]'
  );
}
// Check if it is a Boolean type
export function isBoolean(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
}

// Determine if it is a year-month-day time type
export function isDateStr(dateStr: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// Determine if it is a year, month, day, hour, or minute time type
export function isDateTimeStr(dateStr: string) {
  return (
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(dateStr) ||
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(dateStr)
  );
}

// Determine if it is a time-division time type
export function isTimeStr(dateStr: string) {
  return /^\d{2}:\d{2}:\d{2}$/.test(dateStr) || /^\d{2}:\d{2}$/.test(dateStr);
}

/**
 * Determine if it is an array type
 * */
export function isArray(curObj: any) {
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
export function isSelect(curObj: any) {
  if (!isArray(curObj)) {
    return false;
  }
  for (let ind = 0, size = curObj.length; ind < size; ind++) {
    const arrItem = curObj[ind];
    if (!isString(arrItem)) {
      // 只要有一个不是string类型就认为不是select
      return false;
    }
  }
  return true;
}

/**
 * Determine if it is an object type
 * */
export function isObject(curObj: any) {
  let isObject = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
    isObject = true;
  }
  return isObject;
}

/**
 * Determine if it is a unit type
 * */
export function isQuantity(val: string) {
  let isObject = false;
  // Get the available unit types for the current unit of measurement element
  const quantityList = TypeDataList.quantity.properties.quantity?.enum || [];
  if (quantityList.indexOf(val) >= 0) {
    isObject = true;
  }
  return isObject;
}

/**
 * Determine if it is a color value
 * */
export function isColor(colorVal: string) {
  return /^#[0-9a-f]{6}$/.test(colorVal) || /^#[0-9a-f]{3}$/.test(colorVal);
}

/**
 * Determine if it is a function type
 * */
export function isFunction(curObj: any) {
  let isFunction = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Function') {
    isFunction = true;
  }
  return isFunction;
}
