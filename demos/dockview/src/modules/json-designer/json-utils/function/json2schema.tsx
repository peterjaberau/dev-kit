/**
 * json2schema: Retrieves the corresponding schema data based on the JSON data content.
 Currently, three transformation methods are included: baseJson2Schema, objectJson2Schema, and arrayJson2Schema.
 * */
import { objClone } from '$utils/index';
import {
  EventTypeDataList,
  DataSourceTypeList,
  TypeDataList,
} from '$data/TypeDataList';
import {
  isURL,
  isColor,
  isNumber,
  isBoolean,
  isQuantity,
  isDateStr,
  isDateTimeStr,
  isTimeStr,
  isArray,
  isSelect,
  isObject,
} from '$utils/typeof';

/**
 * Convert basic JSON Data to schema
 * Note: Currently supports conversion of Boolean, Number, URL, Date, DateTime, Time, color, and JSON types.
 * The values ​​of textarea, radio, codearea, and htmlarea are difficult to distinguish from input, so they are all converted to input type.
 * */
function baseJson2Schema(jsonData: any) {
  let curJsonSchema = '';
  if (isBoolean(jsonData)) {
    // 1. Boolean type
    curJsonSchema = objClone(TypeDataList.boolean);
  } else if (isNumber(jsonData)) {
    // 2. Number type
    curJsonSchema = objClone(TypeDataList.number);
  } else if (isURL(jsonData)) {
    // 3. URL type
    curJsonSchema = objClone(TypeDataList.url);
  } else if (isDateStr(jsonData)) {
    // 4. Date type
    curJsonSchema = objClone(TypeDataList.date);
  } else if (isDateTimeStr(jsonData)) {
    // 5. DateTime type
    curJsonSchema = objClone(TypeDataList['date-time']);
  } else if (isTimeStr(jsonData)) {
    // 6. Time type
    curJsonSchema = objClone(TypeDataList.time);
  } else if (isColor(jsonData)) {
    // 7. Color type
    curJsonSchema = objClone(TypeDataList.color);
  } else {
    try {
      // JSON data type: Format (check if it is a valid JSON string).
      const jsonDataObj = JSON.parse(jsonData);
      if (isNumber(jsonDataObj)) {
        // Simple numeric string types are all considered to be string types.
        curJsonSchema = objClone(TypeDataList.input);
      } else {
        // Exclude simple numeric string types
        curJsonSchema = objClone(TypeDataList.json);
      }
    } catch (err) {
      // textarea type
      if (jsonData && jsonData.length > 30) {
        // If the string length exceeds 50, it is considered to be of type codearea.
        curJsonSchema = objClone(TypeDataList.textarea);
      } else {
        // Other types (input, radio, codearea, htmlarea)
        curJsonSchema = objClone(TypeDataList.input);
      }
    }
  }
  return curJsonSchema;
}

/**
 * Convert jsonData of type Object to schema
 * Note: Currently supports conversion between four object types: datasource, event, quantity, and object.
 * */
function objectJson2Schema(jsonData: any) {
  let curJsonSchema: any = {};
  if (isObject(jsonData)) {
    const properties = Object.keys(jsonData);
    if (jsonData.data && jsonData.filter && properties.length === 2) {
      // DataSource data source type
      if ( isArray ( jsonData . data ) || isObject ( jsonData . data )) {
        // Local data source type
        curJsonSchema = objClone(DataSourceTypeList.local);
      } else {
        // Remote data source type
        curJsonSchema = objClone(DataSourceTypeList.remote);
      }
    } else if (
      jsonData.trigger &&
      jsonData.eventData &&
      properties.length === 2
    ) {
      // Triggering event type (fixed format Object type)
      curJsonSchema = objClone(EventTypeDataList.emit);
    } else if (
      jsonData.register &&
      jsonData.actionFunc &&
      properties.length === 2
    ) {
      // Register event type (fixed format Object type)
      curJsonSchema = objClone(EventTypeDataList.on);
    } else if (
      jsonData.quantity &&
      isQuantity(jsonData.quantity) &&
      properties.length === 2
    ) {
      // Unit of measurement type (fixed format Object type)
      curJsonSchema = objClone(TypeDataList.quantity);
    } else {
      // Other non-fixed format Object types
      curJsonSchema = objClone(TypeDataList['empty-object']); // Create an empty array object schema
      // Traverse sub-data items
      Object.keys(jsonData).map((jsonKey) => {
        const curJsonItem = jsonData[jsonKey];
        curJsonSchema.properties[jsonKey] = json2schema(curJsonItem);
      });
    }
  }
  return curJsonSchema;
}

/**
 * Convert JSON Data of Array Type to Schema
 * Note: Currently supports conversion between select and array array types.
 * */
function arrayJson2Schema(jsonData: any) {
  let curJsonSchema;
  // Check if it is an array type
  if (jsonData && isArray(jsonData)) {
    // Check if it is a select type (select type is an array of string types)
    if (isSelect(jsonData)) {
      curJsonSchema = objClone(TypeDataList.select);
      // Set the current value of jsonData to the option value of select.
      curJsonSchema.items.enum = jsonData;
      const enumextraLength = curJsonSchema.items.enumextra.length;
      const arrLength = jsonData.length;
      if (arrLength > enumextraLength) {
        // If the number of values ​​in the current jsonDats is greater than the number of options in selectSchemaData, then it needs to be supplemented.
        for (let ind = enumextraLength, size = arrLength; ind < size; ind++) {
          curJsonSchema.items.enumextra.push(`options${jsonData(ind)}`);
        }
      }
    } else {
      curJsonSchema = objClone(TypeDataList['empty-array']); // Create a new empty array object schema
      // Get the schema object of items based on the first array item
      const arrItemObj: any = json2schema(jsonData[0]); // Normally, the first-level child object of an Array is of type Object.
      curJsonSchema.items.properties = arrItemObj.properties;
    }
  }
  return curJsonSchema;
}

/**
 * Generate a corresponding jsonSchema based on jsonData.
 * */
export function json2schema(jsonData: any) {
  let curJsonSchema = {};
  if (jsonData && isObject(jsonData)) {
    curJsonSchema = objectJson2Schema(jsonData);
  } else if (jsonData && isArray(jsonData)) {
    curJsonSchema = arrayJson2Schema(jsonData);
  } else {
    curJsonSchema = baseJson2Schema(jsonData);
  }
  return curJsonSchema;
}
