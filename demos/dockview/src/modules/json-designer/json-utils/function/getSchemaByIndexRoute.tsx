import { objClone } from '$utils/index';
/**
 * getSchemaByIndexRoute: Retrieves the schema data based on the index path.
 * 【Method Parameter Description】
 * indexRoute: index path
 * targetJsonSchemaObj: schema data object
 * useObjClone: ​​Whether to perform a deep copy to avoid affecting existing data. (Deep copy is not performed by default)
 */
export function getSchemaByIndexRoute(
  indexRoute: string | number,
  targetJsonSchemaObj: any,
  useObjClone?: boolean,
) {
  let curJsonSchemaObj = targetJsonSchemaObj;
  if (useObjClone) {
    curJsonSchemaObj = objClone(targetJsonSchemaObj); // Perform a deep copy to avoid affecting the original data.
  }
  if (indexRoute) {
    const indexRouteArr =
      typeof indexRoute === 'string'
        ? indexRoute.split('-')
        : [indexRoute.toString()];
    for (let index = 0, size = indexRouteArr.length; index < size; index++) {
      // To retrieve a JSON data object from a specified path, follow these steps (Note: Ensure the data is in JSON format that conforms to the rules).
      const curIndex = indexRouteArr[index];
      if (
        curIndex === '0' &&
        (curJsonSchemaObj.type === 'array' ||
          curJsonSchemaObj.type === 'radio' ||
          curJsonSchemaObj.type === 'select' ||
          curJsonSchemaObj.type === 'checkboxes') &&
        (curJsonSchemaObj.options || curJsonSchemaObj.items)
      ) {
        // Retrieve data from items
        curJsonSchemaObj = curJsonSchemaObj.options || curJsonSchemaObj.items;
      } else if (curIndex) {
        let curKeyTemp = '0';
        // 1. First, obtain the key value based on the path value.
        if (curJsonSchemaObj.propertyOrder) {
          curKeyTemp = curJsonSchemaObj.propertyOrder[curIndex];
        } else if (curJsonSchemaObj.properties) {
          const propertyOrder: Array<string> = Object.keys(
            curJsonSchemaObj.properties,
          );
          curKeyTemp = propertyOrder[Number(curIndex)];
        }
        // 2. Retrieve the corresponding JSON data object based on the key value
        curJsonSchemaObj = curJsonSchemaObj.properties[curKeyTemp];
      }
    }
  }
  return curJsonSchemaObj;
}
