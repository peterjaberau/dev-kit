import { objClone } from '$utils/index';
/**
 * getSchemaByKeyRoute: Retrieves the schema data based on the key path.
 * 【Method Parameter Description】
 * keyRoute: Path to the key value
 * targetJsonSchemaObj: schema data object
 * useObjClone: ​​Whether to perform a deep copy to avoid affecting existing data. (Deep copy is not performed by default)
 */
export function getSchemaByKeyRoute(
  keyRoute: string,
  targetJsonSchemaObj: any,
  useObjClone?: boolean,
) {
  let curJsonSchemaObj = targetJsonSchemaObj;
  if (useObjClone) {
    curJsonSchemaObj = objClone(targetJsonSchemaObj); // Perform a deep copy to avoid affecting the original data.
  }
  if (keyRoute && curJsonSchemaObj) {
    const keyRouteArr = keyRoute.split('-');
    for (let index = 0, size = keyRouteArr.length; index < size; index++) {
      // To retrieve a JSON data object from a specified path, follow these steps (Note: Ensure the data is in JSON format that conforms to the rules).
      const curKey = keyRouteArr[index];
      if (curKey && curJsonSchemaObj.properties) {
        // Retrieve the corresponding JSON data object based on the key value
        curJsonSchemaObj = curJsonSchemaObj.properties[curKey];
      }
    }
  }
  return curJsonSchemaObj;
}
