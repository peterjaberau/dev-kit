import * as React from 'react';

// JSON Schema related types
export interface JSONSchema {
  type: string;
  title?: string;
  description?: string;
  properties: Record<string, any>;
  items?: any;
  default?: any;
  style?: Record<string, any>;
  titleStyle?: Record<string, any>;
  contentStyle?: Record<string, any>;
  readOnly?: boolean;
  showKey?: boolean;
  [key: string]: any;
}

// Store type
export interface SchemaStore {
  pageScreen?: string;
  [key: string]: any;
}

export interface JSONStore {
  getJSONDataByKeyRoute: (keyRoute: string) => any;
  updateFormValueData: (keyRoute: string, value: any) => void;
  keyRoute: string;
  jsonKey: string;
  nodeKey: string;
  onChange: (value: any) => void;
  JSONEditorObj: any;
  initJSONData: (jsonData: any) => void;
  initOnChange: (onChange: any) => void;
  setDynamicDataList: (dynamicDataList: any[]) => void;
  options: Record<string, any>;
  setOptions: (options: any) => void;
  [key: string]: any;
}

export interface StoresInterface {
  JSONSchemaStore: SchemaStore;
  JSONEditorStore: JSONStore;
}

// Component General Props
export interface BaseRendererProps {
  parentType: string;
  jsonKey?: string;
  indexRoute: string;
  keyRoute: string;
  nodeKey?: string;
  targetJsonSchema: JSONSchema;
  schemaStore: SchemaStore;
  jsonStore: JSONStore;
  onChange?: (value: any) => void;
  typeSelectData?: any;
  isFixed?: any;
  [key: string]: any;
}

declare module '@wibetter/json-editor' {
  import { Component } from 'react';

  interface JSONEditorProps {
    viewStyle?: 'tabs' | 'fold';
    jsonView?: boolean;
    wideScreen?: boolean;
    schemaData?: any;
    jsonData?: any;
    dynamicDataList?: any[];
    onChange?: (newJsonData: any) => void;
  }

  export default class JSONEditor extends Component<JSONEditorProps> {}
}
