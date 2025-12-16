/**
 * keyRoute2indexRoute: Retrieves the corresponding index path based on the key value path.
 * 【Method Parameter Description】
 * keyRoute: Path to the key value
 * targetJsonSchemaObj: schema data object
 * */
export function keyRoute2indexRoute(
  keyRoute: string,
  targetJsonSchemaObj: any,
) {
  let curJsonSchemaObj = targetJsonSchemaObj;
  let curIndexRoute = '';
  const keyRouteArr = keyRoute.split('-');
  for (let index = 0, size = keyRouteArr.length; index < size; index++) {
    const curKey = keyRouteArr[index];
    if (curKey) {
      // 1. First, obtain the key value based on the path value.
      let curIndex = -1;
      // 1. First, obtain the key value based on the path value.
      if (curJsonSchemaObj.propertyOrder) {
        curIndex = curJsonSchemaObj.propertyOrder.indexOf(curKey);
        // 2. Retrieve the corresponding JSON data object based on the key value
        curJsonSchemaObj = curJsonSchemaObj.properties[curKey]; // Object type data reference
      } else if (curJsonSchemaObj.properties) {
        const propertyOrder = Object.keys(curJsonSchemaObj.properties);
        curIndex = propertyOrder.indexOf(curKey);
        // 2. Retrieve the corresponding JSON data object based on the key value
        curJsonSchemaObj = curJsonSchemaObj.properties[curKey]; // Object type data reference
      } else if (curJsonSchemaObj.items) {
        // Compatible array types
        curIndex = 0; // curKey;
        curJsonSchemaObj = curJsonSchemaObj.items; // Object type data reference
      } else if (curJsonSchemaObj.options) {
        // Compatible array types
        curIndex = 0;
        curJsonSchemaObj = curJsonSchemaObj.options;
      }
      curIndexRoute = curIndexRoute
        ? `${curIndexRoute}-${curIndex}`
        : curIndex.toString();
    }
  }
  return curIndexRoute;
}
