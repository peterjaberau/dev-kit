import {
  objClone as _objClone,
  isEqual as _isEqual,
  evalExpression,
  isArray,
  isObject,
  isString,
  isURL,
  isColor,
} from '@wibetter/json-utils';
import camelCase from 'lodash/camelCase';
import {
  saveJSONEditorCache,
  getJSONEditorCache,
  deleteJSONEditorCache,
} from './webCache';

export function buildStyle(
  style: Record<string, any> | undefined,
): Record<string, any> {
  const curStyle: Record<string, any> = {};
  if (style) {
    Object.keys(style).forEach((styleKey: string) => {
      // Convert the hyphen-based property names to camelCase, such as background-color => backgroundColor
      if (styleKey.indexOf('-') > 0) {
        curStyle[camelCase(styleKey)] = (style as any)[styleKey];
      } else {
        curStyle[styleKey] = (style as any)[styleKey];
      }
    });
  }
  return curStyle;
}

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

/*
 * Check if the current property exists
 * Note: To identify boolean values
 */
export function hasProperties(targetPropertie: any): boolean {
  let hasProperties = false;
  if (targetPropertie !== undefined && targetPropertie !== null) {
    // targetProperty is considered to exist when it equals "", 0, or false.
    hasProperties = true;
  }
  return hasProperties;
}

/** Should it be set to a two-column layout? */
/* More suitable for elements with a fixed width.
* ：boolean、date、date-time、time、number、color、quantity
* Display: element-title and content-item are displayed on the same line.
* */
export function isNeedTwoColWarpStyle(format: string): boolean {
  let isNeedTwoColWarp = false;
  if (
    format === 'boolean' ||
    format === 'date' ||
    format === 'date-time' ||
    format === 'time' ||
    format === 'number' ||
    format === 'color' ||
    format === 'quantity' ||
    format === 'select'
  ) {
    isNeedTwoColWarp = true;
  }
  return isNeedTwoColWarp;
}

/** Determine if an element is a primitive type based on its className. */
/* Basic element types: input, boolean, date, date-time, time, url,
*  textarea、number、 radio、 select、color、quantity
* */
export function isBaseSchemaElem(elemClassName: string): boolean {
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
* */
export function isBoxSchemaElem(elemClassName: string): boolean {
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

/** Determine if an element is a first-level fixed type based on its className. */
/* Container type elements: func, style, data
* */
export function isFirstSchemaElem(elemClassName: string): boolean {
  let isFirstSchema = false;
  if (
    elemClassName.indexOf('func-schema') >= 0 ||
    elemClassName.indexOf('style-schema') >= 0 ||
    elemClassName.indexOf('data-schema') >= 0
  ) {
    isFirstSchema = true;
  }
  return isFirstSchema;
}
/**
 * Retrieves all parameters in the current URL
 */
export function getParams(): Record<string, string> {
  let params = window.location.search;
  if (!params) {
    const currentHref = window.location.href;
    const startIndex = currentHref.lastIndexOf('?');
    params = currentHref.substring(startIndex);
  }
  const paramsObj: Record<string, string> = {};
  if (params) {
    const arr = params.substr(1).split('&');
    for (let i = 0, size = arr.length; i < size; i++) {
      const data = arr[i].split('=');
      if (data[0] && data[1]) {
        paramsObj[data[0]] = data[1];
      }
    }
  }
  return paramsObj;
}
/**
 * Retrieve specified parameters from the current URL
 */
export function getURLParam(key: string): string {
  const params = window.location.search;
  if (params) {
    const arr = params.substr(1).split('&');
    for (let i = 0, size = arr.length; i < size; i++) {
      const data = arr[i].split('=');
      if (data[0] === key) {
        return data[1];
      }
    }
  }
  return '';
}

/**
 * Cache data in sessionStorage
 */
export function saveWebCacheData(valueKey: string, value: any): void {
  saveJSONEditorCache(valueKey, value, 'json-editor-formData');
}

/**
 * Read previously cached data from sessionStorage
 */
export function getWebCacheData(valueKey: string): any {
  return getJSONEditorCache(valueKey, 'json-editor-formData');
}

/**
 * Delete previously cached data from sessionStorage
 */
export function deleteWebCacheData(valueKey: string): void {
  deleteJSONEditorCache(valueKey, 'json-editor-formData');
}

/**
 * Process Props data; perform a calculation on all props ending with On or Expr.
 *
 * xxxOn
 * xxxExpr
 */
export function getExprProperties(
  schema: any,
  data: any,
  ignoreList: string[] = ['name'],
): any {
  Object.getOwnPropertyNames(schema).forEach((key: string) => {
    if (ignoreList && ~ignoreList.indexOf(key)) {
      return;
    }

    let parts = /^(.*)(On|Expr)$/.exec(key) || [];
    const type = parts[2];
    let value = schema[key];

    if (
      value &&
      typeof value === 'string' &&
      parts[1] &&
      (type === 'On' || type === 'Expr')
    ) {
      key = parts[1];
      schema[key] = evalExpression(value, data || {});
    }
  });

  return schema;
}

// Handling of abnormal options formats, automatically converting them to an available list format.
export function formatOptions(options: any): {
  options: any[];
  optionValue: Record<string, any>;
} {
  let curOptions: any[] = [];
  let optionValue: Record<string, any> = {}; // Record the value of the object type
  if (isArray(options)) {
    // curOptions = options;
    options.forEach((option: any) => {
      if (isObject(option.value)) {
        const valueStr = JSON.stringify(option.value);
        curOptions.push({
          label: option.label || option.name,
          value: valueStr,
        });
        optionValue[valueStr] = option.value;
      } else {
        curOptions.push(option);
      }
    });
  } else if (isString(options)) {
    try {
      curOptions = JSON.parse(options);
      const formatResult = formatOptions(curOptions);
      curOptions = formatResult.options;
      optionValue = formatResult.optionValue;
    } catch (error) {
      console.warn('Options data format conversion failed:', options);
    }
  }
  return {
    options: curOptions,
    optionValue,
  };
}

export function formatOptions1(options: any): {
  options: any[];
  optionValue: Record<string, any>;
} {
  let curOptions: any[] = [];
  let optionValue: Record<string, any> = {}; // Record the value of the object type
  if (isArray(options)) {
    // curOptions = options;
    options.forEach((option: any, index: number) => {
      if (isObject(option)) {
        if (isObject(option.value)) {
          let valueStr = JSON.stringify(option.value);
          valueStr.replaceAll(' ', '');
          curOptions.push({
            label: option.label || option.name,
            value: valueStr,
          });
          optionValue[valueStr] = option.value;
        } else {
          curOptions.push(option);
        }
      } else if (isString(option)) {
        // Compatibility with abnormal option data
        try {
          const curOption = JSON.parse(option);
          if (isObject(curOption.value)) {
            let valueStr = JSON.stringify(curOption.value);
            valueStr.replaceAll(' ', '');
            curOptions.push({
              label: curOption.label || curOption.name,
              value: valueStr,
            });
            optionValue[valueStr] = curOption.value;
          } else {
            curOptions.push(curOption);
          }
        } catch (error) {
          console.warn('Option error: failed to convert data format:', option);
        }
      }
    });
  } else if (isString(options)) {
    try {
      curOptions = JSON.parse(options);
      const formatResult = formatOptions(curOptions);
      curOptions = formatResult.options;
      optionValue = formatResult.optionValue;
    } catch (error) {
      console.warn('Options data format conversion failed:', options);
    }
  }
  return {
    options: curOptions,
    optionValue,
  };
}

export function getObjectTitle(objItem: any): string | any {
  if (objItem && isObject(objItem)) {
    let curObjectTitle =
      objItem.label || objItem.title || objItem.description || objItem.desc;
    if (curObjectTitle) {
      return curObjectTitle;
    }
    const objItemKeys = Object.keys(objItem);
    for (let index = 0, size = objItemKeys.length; index < size; index++) {
      const itemVal = objItem[objItemKeys[index]];
      if (
        itemVal &&
        isString(itemVal) &&
        !isURL(itemVal) &&
        !isColor(itemVal)
      ) {
        return itemVal;
      }
    }
  } else {
    return objItem;
  }
}

/**
 * options Data processing
 * Automatically wrap regular options in the options list with a layer:
 * 比如：[{label: 'xxLabel', value: 123}] => [{label: 'xxLabel', value: {label: 'xxLabel', value: 123}}]
 */
export function getWrapOptions(options: any[]): any[] {
  let curOptions: any[] = [];
  if (isArray(options)) {
    options.forEach((option: any) => {
      curOptions.push({
        label: getObjectTitle(option),
        value: option, // isObject(option.value) ? option.value : option,
      });
      /*
      if (isObject(option)) {
        curOptions.push({
          label: getObjectTitle(option),
          value: option // isObject(option.value) ? option.value : option,
        });
      } else {
        curOptions.push(option);
      }
      */
    });
  }
  return curOptions;
}
