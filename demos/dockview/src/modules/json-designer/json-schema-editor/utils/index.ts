import { BASE_TYPE, CONTAINER_TYPE } from '../data/TypeList';

/** Default value (default) */
/* Determine whether to display default configuration items based on type.
* 11 basic component types (input, boolean, date, date-time, time, url, textarea, number, color, radio, select)
* Three special component types (Json, CodeArea, htmlArea)
* */
export function isNeedDefaultOption(curType: string) {
  const supportedTypeList = [...BASE_TYPE, 'json', 'codearea', 'htmlarea'];
  return supportedTypeList.indexOf(curType) > -1;
}

export function hasOptions(curType: string) {
  const supportedTypeList = ['select', 'radio'];
  return supportedTypeList.indexOf(curType) > -1;
}

/** Input suggestion (placeholder) */
/* Determine whether to display input prompts based on the type configuration option.
* Supports a total of 9 component types: input, date, date-time, time, url, textarea, Json, CodeArea, and htmlArea.
* */
export function isNeedPlaceholderOption(curType: string) {
  const supportedTypeList = [
    'input',
    'url',
    'textarea',
    'text-editor',
    'date',
    'date-time',
    'time',
    'json',
    'codearea',
    'html',
  ];
  return supportedTypeList.indexOf(curType) > -1;
}

/** Whether it supports configuration as a condition field (conditionProps) */
/* Determine whether to display read-only configuration items based on the type.
  Numeric values ​​of types radio, boolean, number, and string can be set as conditional fields.
* */
export function isNeedConditionOption(curType: string) {
  const supportedTypeList = [
    'boolean',
    'input',
    'number',
    'color',
    'url',
    'radio',
    'select',
    'date',
    'date-time',
    'time',
    'input-image',
  ];
  return supportedTypeList.indexOf(curType) > -1;
}

/** Whether read-only configuration is supported (readOnly) */
/* Determine whether to display read-only configuration items based on the format.
* Supports a total of 9 component types: input, number, date, date-time, time, url, textarea, JSON, CodeArea, and htmlArea.
* */
export function isNeedReadOnlyOption(curType: string) {
  const supportedTypeList = [
    ...BASE_TYPE,
    'quantity',
    'text-editor',
    'json',
    'codearea',
    'html',
  ];
  return supportedTypeList.indexOf(curType) > -1;
}

/** Is this field required? (isRequired)
 * Determine whether to display read-only configuration items based on the format.
 * Supports a total of 9 component types: input, date, date-time, time, url, textarea, Json, CodeArea, and htmlArea.
 * */
export function isNeedIsRequiredOption(curType: string) {
  const supportedTypeList = [
    ...BASE_TYPE,
    'quantity',
    'text-editor',
    'json',
    'codearea',
    'html',
  ];
  return supportedTypeList.indexOf(curType) > -1;
}

/** Used to display control showCodeViewBtn */

export function isNeedCodeViewOption(curType: string) {
  const supportedTypeList = [...CONTAINER_TYPE, 'array'];
  return supportedTypeList.indexOf(curType) > -1;
}
