/**
 * indexRoute2keyRoute: Retrieves the corresponding key value path based on the index path.
 * 【Method Parameter Description】
 * indexRoute: index path
 * targetJsonSchemaObj: schema data object
 * */
export function indexRoute2keyRoute(
  indexRoute: string | number,
  targetJsonSchemaObj: any,
) {
  let curJsonSchemaObj = targetJsonSchemaObj;
  let curKeyRoute = '';
  const indexRouteArr =
    typeof indexRoute === 'string'
      ? indexRoute.split('-')
      : [indexRoute.toString()];
  for (let index = 0, size = indexRouteArr.length; index < size; index++) {
    // To retrieve a JSON data object from a specified path, follow these steps (Note: Ensure the data is in JSON format that conforms to the rules).
    const curIndex = indexRouteArr[index];
    if (curIndex === '0' && curJsonSchemaObj.items) {
      // Retrieve data from items
      curJsonSchemaObj = curJsonSchemaObj.items; // Object type data reference
      curKeyRoute = curKeyRoute ? `${curKeyRoute}-items` : 'items';
    } else if (curIndex === '0' && curJsonSchemaObj.options) {
      // Get data from options
      curJsonSchemaObj = curJsonSchemaObj.options;
      curKeyRoute = curKeyRoute ? `${curKeyRoute}-options` : 'options';
    } else if (curIndex) {
      // 1. First, obtain the key value based on the path value.
      let curKey = '0';
      // 1. First, obtain the key value based on the path value.
      if (curJsonSchemaObj.propertyOrder) {
        curKey = curJsonSchemaObj.propertyOrder[curIndex];
      } else if (curJsonSchemaObj.properties) {
        const propertyOrder = Object.keys(curJsonSchemaObj.properties);
        curKey = propertyOrder[Number(curIndex)];
      }
      // 2. Retrieve the corresponding JSON data object based on the key value
      curJsonSchemaObj = curJsonSchemaObj.properties[curKey]; // Object type data reference
      curKeyRoute = curKeyRoute ? `${curKeyRoute}-${curKey}` : curKey;
    }
  }
  return curKeyRoute;
}
