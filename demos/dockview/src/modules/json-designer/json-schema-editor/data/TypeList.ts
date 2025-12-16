/** 11 basic data types */
export const BASE_TYPE = [
  'input',

  'boolean',

  'number',

  'color',

  'url',

  'textarea',

  'radio',

  'select',

  'cascader',

  'checkboxes',

  'date',

  'date-time',

  'time',

  'input-image',

];

// Inherent container type
export const Fixed_CONTAINER_TYPE = [
  'datasource',

  'event',

  'dynamic-data',

  'api',

];

// Current container type
export const CONTAINER_TYPE = ['object', ...Fixed_CONTAINER_TYPE];

/** 10 advanced data types */
export const HIGH_TYPE = [
  'quantity',

  'box-style',

  'padding-margin',

  'text-editor',

  'json',

  'codearea',

  'htmlarea',

  'array',

  ...CONTAINER_TYPE,

];

/** All types, including basic and advanced types */

export const ALL_TYPE = [...BASE_TYPE, ...HIGH_TYPE];

// Optional object type

export const OBJECT_TYPE = [

  'input',

  'number',

  'radio',

  'select',

  'cascader',

  'boolean',

  'color',

  'url',

  'textarea',

  'date',

  'date-time',

  'time',

  'input-image',

  'text-editor',

  'checkboxes',

  'object',

  'array',

  'box-style',

  'padding-margin',

  'api',

];

// Array type with available sub-item types

export const ARRAY_ITEM_TYPE = [
  'object',

  'array',

  'input',

  'number',

  'select',

  'cascader',

  'color',

  'url',

  'date',

  'date-time',

  'time',

  'input-image',

];

// Radio single-select type options

export const RADIO_TYPE = ['string'];

// Select multiple-select type options

export const SELECT_TYPE = ['string'];

// Type list

export const TypeList = {

  object: ALL_TYPE,

  array: ARRAY_ITEM_TYPE,

  radio: RADIO_TYPE,

  select: SELECT_TYPE,

  all: ALL_TYPE,

};

// Type description

export const TypeInfoList = {

  input: 'String/Single-line text',

  boolean: 'Boolean/Switch',

  number: 'Number value',

  color: 'Color value',

  url: 'URL value',

  textarea: 'Multi-line text',

  radio: 'Single selection',

  select: 'Dropdown selection/Multi-select',

  cascader: 'Cascading selection',

  checkboxes: 'Multi-select boxes',

  date: 'Date',

  'date-time': 'Date and time',

  time: 'Time',

  'input-image': 'Image upload',

  quantity: 'Unit setting',

  'box-style': 'Box model/Margin setting',

  'padding-margin': 'Margin settings',

  'text-editor': 'Rich text content',

  json: 'JSON content',

  codearea: 'Code content',

  htmlarea: 'HTML content',

  object: 'Object',

  array: 'Array',

  datasource: 'Static data source (legacy)',

  event: 'Event (legacy)',

  'dynamic-data': 'Dynamic data source (legacy)',

  api: 'API configuration',

};
