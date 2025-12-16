import { objClone } from '$utils/index';
/**
 * getJSONDataByKeyRoute: Retrieves the corresponding JSON data based on the key-value path.
 * 【Method Parameter Description】
 * keyRoute: Key value index path
 * targetJsonDataObj: JSON data object
 * useObjClone: Whether to perform a deep copy to avoid affecting existing data. (Deep copy is not performed by default)
 */

export function getJsonDataByKeyRoute(
  keyRoute: string,
  targetJsonDataObj: any,
  useObjClone?: boolean,
) {
  let curJsonDataObj = targetJsonDataObj;
  if (useObjClone) {
    curJsonDataObj = objClone(targetJsonDataObj); // Perform a deep copy to avoid affecting the original data.
  }
  if (keyRoute) {
    const keyRouteArr = keyRoute.split('-');
    for (let index = 0, size = keyRouteArr.length; index < size; index++) {
      // 1. Get the current jsonKey value
      const curKey = keyRouteArr[index];
      if (curKey) {
        // Assignment is only performed when curKey is not empty.
        // 2. Retrieve the corresponding data object based on the key value
        curJsonDataObj = curJsonDataObj && curJsonDataObj[curKey];
      }
    }
  }
  return curJsonDataObj;
}
