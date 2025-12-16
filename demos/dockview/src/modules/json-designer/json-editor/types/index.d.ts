// Global type declaration

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
  parentType?: string;
  jsonKey?: string;
  indexRoute?: string | number;
  keyRoute: string;
  nodeKey?: string;
  targetJsonSchema: JSONSchema;
  schemaStore: SchemaStore;
  jsonStore: JSONStore;
  onChange?: (value: any) => void;
  [key: string]: any;
}

// MobX type declarations are defined in node_modules/mobx/lib/mobx.d.ts

declare module 'mobx-react' {
  export class Provider extends React.Component<any> {}
}

//The type declarations for lodash and antd are provided in node_modules.

// SVG file type declaration
  declare module '$assets/img/*.svg' {
  const content: React.ComponentType<any>;
  export default content;
}

declare module '*.svg' {
  const content: React.ComponentType<any>;
  export default content;
}

// Window Interface Extension
declare global {
  interface Window {
    JSONEditorCustomRenderers?: Record<string, any>;
  }
}
