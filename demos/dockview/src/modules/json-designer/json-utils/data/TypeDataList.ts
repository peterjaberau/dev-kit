import {
  initJSONSchemaData,
  /* 12 basic data types */
  initInputData,
  initBooleanData,
  initURLData,
  initDateData,
  initDateTimeData,
  initTimeData,
  initRadioData,
  initSelectData,
  initCascaderSchema,
  initCheckboxSchema,
  initTextareaData,
  initTextEditorData,
  initNumberData,
  initColorData,
  initIMGData,
  initInputImageData,
  /* 9 special types */
  initQuantityData,
  initBoxStyleData,
  initPaddingMarginData,
  initJsonData,
  initCodeAreaData,
  initHtmlAreaData,
  initObjectData,
  EmptyObject,
  initArrayData,
  EmptyArray,
  initEventData,
  initEventDataTypeON,
  initDataSourceData,
  initDataSourceDataV2,
  initDynamicData,
  initApiData,
} from '$data/index';

// List of type data
export const TypeDataList: any = {
  jsonschema: initJSONSchemaData,
  input: initInputData,
  boolean: initBooleanData,
  object: initObjectData,
  array: initArrayData,
  'empty-array': EmptyArray,
  'empty-object': EmptyObject,
  url: initURLData,
  textarea: initTextareaData,
  color: initColorData,
  image: initIMGData,
  number: initNumberData,
  'input-image': initInputImageData,
  json: initJsonData,
  codearea: initCodeAreaData,
  htmlarea: initHtmlAreaData,
  'text-editor': initTextEditorData,
  date: initDateData,
  'date-time': initDateTimeData,
  time: initTimeData,
  quantity: initQuantityData,
  'box-style': initBoxStyleData,
  'padding-margin': initPaddingMarginData,
  radio: initRadioData,
  select: initSelectData,
  cascader: initCascaderSchema,
  checkboxes: initCheckboxSchema,
  'dynamic-data': initDynamicData,
  datasource: initDataSourceData,
  event: initEventData,
  api: initApiData,
};

// Event type data
export const EventTypeDataList = {
  on: initEventDataTypeON,
  emit: initEventData,
};

// Data source type
export const DataSourceTypeList = {
  local: initDataSourceData,
  remote: initDataSourceDataV2,
};
