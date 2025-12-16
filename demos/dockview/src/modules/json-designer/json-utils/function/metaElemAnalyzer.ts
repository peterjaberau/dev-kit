/**
 * metaElemAnalyzer: Based on the current schema, analyzes the metadata used in the current JSON.
 * 【Method Parameter Description】
 * schemaData: Required field, schema data
 * [Returned Data Format Description]
 * metaElemAnalyzer: {
 *   input: 3,
 *   color: 1,
 *   event: {
 *     emit: 1,
 *     on: 2
 *   },
 *   datasource: {
 *     local: 1,
 *     remote: 1,
 *     interfaceData: 2
 *   }
 * }
 */
import { isObject } from '$utils/typeof';
import { getExpectType } from '$function/getExpectType';

/**
 * Schema metadata analysis for Object types
 * */

function objectSchema2JsonData(jsonSchema: any, analyzerResult: any) {
  let curAnalyzerResult = analyzerResult || {};
  if (
    isObject(jsonSchema) &&
    getExpectType(jsonSchema.type) === 'object' &&
    jsonSchema.properties
  ) {
    let curPropertyOrder = [];
    if (jsonSchema.propertyOrder) {
      curPropertyOrder = jsonSchema.propertyOrder;
    } else {
      curPropertyOrder = Object.keys(jsonSchema.properties);
    }
    curPropertyOrder.map((jsonKey: string) => {
      const curSchema = jsonSchema.properties[jsonKey];
      curAnalyzerResult = metaElemAnalyzer(curSchema, curAnalyzerResult);
    });
  }
  return curAnalyzerResult;
}

/** Main method */
export function metaElemAnalyzer(curJsonSchemaObj: any, analyzerResult: any) {
  // Determine if it is the outermost call based on whether analyzerResult is empty.
  const isFirstAnalyzer = !analyzerResult ? true : false;
  let curAnalyzerResult = analyzerResult || {};
  // Metadata used in the current schem data analysis
  if (curJsonSchemaObj && JSON.stringify(curJsonSchemaObj) !== '{}') {
    const curType = curJsonSchemaObj.type;
    if (
      curType === 'object' ||
      curType === 'func' ||
      curType === 'style' ||
      curType === 'data'
    ) {
      // The outermost schema type is not included in the statistics
      if (!isFirstAnalyzer && curAnalyzerResult['object']) {
        curAnalyzerResult['object'] += 1;
      } else if (!isFirstAnalyzer) {
        curAnalyzerResult['object'] = 1;
      }
      curAnalyzerResult = objectSchema2JsonData(
        curJsonSchemaObj,
        curAnalyzerResult,
      );
    } else if (curType === 'array') {
      // The outermost schema type is not included in the statistics
      if (!isFirstAnalyzer && curAnalyzerResult['array']) {
        curAnalyzerResult['array'] += 1;
      } else if (!isFirstAnalyzer) {
        curAnalyzerResult['array'] = 1;
      }
      curJsonSchemaObj = curJsonSchemaObj.items;
      curAnalyzerResult = objectSchema2JsonData(
        curJsonSchemaObj,
        curAnalyzerResult,
      );
    } else {
      if (!isFirstAnalyzer && curAnalyzerResult[curType]) {
        curAnalyzerResult[curType] += 1;
      } else if (!isFirstAnalyzer) {
        curAnalyzerResult[curType] = 1;
      }
    }
  }
  return curAnalyzerResult;
}
