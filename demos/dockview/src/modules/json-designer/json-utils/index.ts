/**
 * json-utils: A collection of json utilities
 * [List of tools and methods provided]
 *
 * [12 essential JSON utility methods]
 * getJsonDataByKeyRoute: Retrieves the corresponding value based on the key index path.
 * getSchemaByIndexRoute: Retrieves the schema data based on the index path.
 * getSchemaByKeyRoute: Retrieves the schema data based on the key path.
 * indexRoute2keyRoute: Retrieves the corresponding key value path based on the index path.
 * keyRoute2indexRoute: Retrieves the corresponding index path based on the key value path.
 * json2schema: Retrieves the corresponding schema data based on the JSON data content.
 * oldSchemaToNewSchema: Converts the old jsonSchema to the new jsonSchema
 * schema2json: Generates a corresponding JSON dataset based on the schema data.
 * schemaMetaList: A list of metadata provided by the current JSON data visualization
 * metaElemAnalyzer: Based on the current JSON and its corresponding schema, analyzes the metadata used in the current JSON.
 *
 * [Other smaller JSON utility methods]
 *
 * Methods for manipulating JSON data content
 * getParentKeyRoute: Retrieves the key path value of the parent element.
 * getParentKeyRoute_CurKey: Retrieves the key path value of the parent element and the current key.
 *
 * [Schema-related operation methods]
 * isEmptySchema: Checks if the schema is empty.
 * isNewSchemaData: Determines if the schema data is the latest version.
 * isContainerSchema: Determines whether the element is a container type, used to confirm whether child elements can be added.
 * isStructuredSchema: Determines whether the data is structured schema (the first-level schema is of type object, and all its second-level schemas are of type object).
 * isSameParent: Determines whether elements share the same parent element.
 * getCurPosition: Determines whether the current element is before or after the target element (based on the positions of both the current and target elements).
 * getParentIndexRoute: Retrieves the path value of the parent element.
 * getNextIndexRoute: Gets the path value of the next sibling element.
 * getParentIndexRoute_CurIndex: Retrieves the path value and current index of the parent element.
 * moveForward: Moves the current path value one position forward.
 * moveBackward: Moves the current path value one position to the right.
 *
 * [Purely Utility Method]
 * objClone: ​​Deep copy of JavaScript object data to avoid data linkage.
 * isEqual: Compares two JSON data sets to see if they are equal.
 * hasProperties: Determines if the current property exists (identifies values ​​of false, 0, or null).
 *
 * [Basic Metadata Type Determination]
 * isURL
 * isString
 * isNumber
 * isBoolean
 * isDateStr
 * isDateTimeStr
 * isTimeStr
 * isArray
 * isSelect
 * isObject
 * isQuantity
 * isColor
 * isFunction
 */

// [8 Main JSON Utility Methods]
export * from './function/getJsonDataByKeyRoute';
export * from './function/getSchemaByIndexRoute';
export * from './function/getSchemaByKeyRoute';
export * from './function/indexRoute2keyRoute';
export * from './function/keyRoute2indexRoute';
export * from './function/json2schema';
export * from './function/metaElemAnalyzer';
export * from './function/oldSchemaToNewSchema';
export * from './function/schema2json';
export * from './function/schemaMetaList';
export * from './function/json2treeData';
export * from './function/getExpectType';
export * from './function/schema2conditionValue';

// [Other smaller JSON utility methods]
export * from './utils/index'; // Pure utility method
export * from './utils/jsonData'; // Methods for manipulating JSON data content
export * from './utils/jsonSchema'; // Methods for manipulating JSON data structures

// Numerical judgment
export * from './utils/typeof';

// JSON keywords: used to avoid naming keys
export * from './data/KeyWordList';

// JSON objects corresponding to all types
export * from './data/TypeDataList'; // TypeDataList、EventTypeDataList、DataSourceTypeList、DynamicDataList
