# json-utils
Provides various JSON-related utility methods, such as schema to JSON, JSON to schema, and JSON metadata analysis.

JSON: JSON (JavaScript Object Notation) is a lightweight data interchange format.

> schema: Generally used to describe the data format of JSON, often used for JSON data format validation. ([JSON Schema Official Website](http://json-schema.org/learn/getting-started-step-by-step.html))

## Collection of JSON Utilities / List of JSON Utility Methods

### 8 Common JSON Utility Methods
- getJsonDataByKeyRoute([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/getJsonDataByKeyRoute.md)): Retrieves the corresponding JSON numeric object based on the key path (e.g., to retrieve the data corresponding to 'data-user-name' in JSON data).
- getSchemaByIndexRoute([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/getSchemaByIndexRoute.md)): A schema utility method that retrieves the corresponding schema data object based on the index path (e.g., retrieving the data corresponding to the second field in the third sub-object of the schema using '2-1').
- getSchemaByKeyRoute: A schema utility method that retrieves the corresponding schema data object based on the key path (e.g., retrieving schema data via 'style-padding').
- indexRoute2keyRoute([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/indexRoute2keyRoute.md)): A schema utility method that converts the index path into the corresponding key path.
- keyRoute2indexRoute: A schema utility method that retrieves the corresponding index path based on the key value path.
- json2schema([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/json2schema.md)): Generates corresponding schema data based on JSON data content.
- schema2json([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/schema2json.md)): Generates a corresponding JSON data content based on schema structure data.
- json2treeData([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/json2treeData.md)): Generates the corresponding treeData based on the current JSON (for use by Ant Design's TreeSelect, etc.)
- `metaElemAnalyzer` ([Usage Example](https://github.com/wibetter/json-utils/blob/master/docs/metaElemAnalyzer.md)): Calculates the metadata used in the current JSON based on the corresponding schema. [To be deprecated]

### Methods for manipulating JSON data content
- getParentKeyRoute: Retrieves the key path value of the parent element.
- getParentKeyRoute_CurKey: Retrieves the key path value of the parent element and the current key.

### Schema-related operation methods
- isSameParent: Determines whether elements share the same parent element.
- getParentIndexRoute: Retrieves the path value of the parent element.
- getNextIndexRoute: Gets the path value of the next sibling element.
- getParentIndexRoute_CurIndex: Retrieves the path value and current index of the parent element.
- moveForward: Moves the current path value forward one position.
- moveBackward: Moves the current path value one position to the right.
- getCurPosition: Determines whether the current element is before or after the target element (based on the positions of both the current and target elements).
- isStructuredSchema: Determines whether the data is structured schema (the first-level schema is of type object, and all its second-level schemas are of type object).

### Pure Utility Methods
- objClone: ​​Deep copy of JavaScript object data to avoid data linkage.
- isEqual: Compares whether two JSON data sets are equal.
- hasProperties: Checks if the current property exists (it will also be considered a property if the value is false, 0, or null).

### Numeric type judgment
- isURL
- isString
- isNumber
- isBoolean
- isDateStr
- isDateTimeStr
- isTimeStr
- isArray
- isSelect
- isObject
- isQuantity
- isColor
- isFunction

### Business-related JSON utility methods
It is primarily used in JSON data visualization components ([JSONSchema](https://github.com/wibetter/json-schema-editor), [JSONEditor](https://github.com/wibetter/json-editor)).
- isNewSchemaData: Determines if the schema data is the latest version [To be deprecated]
- oldSchemaToNewSchema: Converts the old jsonSchema to the new jsonSchema [To be deprecated]
- schemaMetaList: A list of metadata types currently provided by JSON data visualization components (JSONSchema, JSONEditor) [To be deprecated]
- isContainerSchema: Determines whether the element is a container type to confirm whether child elements can be added.
- isEmptySchema: Checks if a schema is empty.

## Quick Start

```
npm install --save @wibetter/json-utils
```

```js
// Method for getting schema and converting to JSON
const { schema2json } = require('@wibetter/json-utils');
const jsonSchema = {
  ...
};
const curJsonData = {
  ...
}

const jsonData = schema2json(jsonSchema, curJsonData); // schema2json
``
