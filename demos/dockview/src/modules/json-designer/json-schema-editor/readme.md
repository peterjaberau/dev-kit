# json-schema-editor

> JSON data visualization/JSONSchema, edit JSON schema in form format, and can be used to design configuration panels for online components.

### Technology Stack
React/Mobx/Ant Design

### Features
1. Supports 14 basic component types (input, boolean, date, date-time, time, url, ...).
   textarea、number、color、radio、 checkboxes、select、cascader、input-image）
2. Supports 12 special component types (object, array, json, datasource, dynamic-data, event, ...).
   codearea, htmlarea, text-editor ([Usage instructions](https://github.com/wibetter/json-editor/blob/master/docs/TextEditor.md)), quantity, box-style, padding-margin)
3. Supports drag-and-drop sorting
4. Supports functions such as delete, copy, and advanced configuration.
5. Supports complex nesting
6. Supports configuration linkage via expressions.
7. Supports switching to source code mode (enabling source code mode enables edit mode).

### Special Note
JSONSchema is only used to generate structured JSON data, and its content needs to be rendered in conjunction with JSONEditor ([git address](https://github.com/wibetter/json-editor)).


## Install

```bash
npm install --save @wibetter/json-schema-editor
```

## Usage Examples

```js
import * as React from 'react';
import JSONSchemaEditor from '@wibetter/json-schema-editor';
import '@wibetter/json-schema-editor/lib/index.css';

class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      jsonSchema: {},
    };
  }

  render() {
    const { jsonSchema } = this.state;
    return (
      <>
        <div className="json-action-container">
          <div className="json-schema-box">
             JSONSchemaEditor
                data={jsonSchema}
                onChange={(newJsonSchema) => {
                  this.setState({
                    jsonSchema: newJsonSchema,
                  });
                }}
             />
          </div>
        </div>
      </>
    );
  }
}
```

## JSON Schema Configurable Parameter Description

| name         | type     | default | desc                            |
| ------------ | -------- | ------- | ------------------------------- |
| `data` | object | {} | Required, JSON schema (structured JSON data) |
| `typeList` | object | {} | Optional field, used to set the optional types of child items in func, style, and data |
| `onChange` | function | () => {} | The `onChange` function is triggered when the schemaData content changes.
