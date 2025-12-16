import { getWebCacheData } from '$utils/index';

/** Retrieve jsonData from WebCache */
/* Note: Before referencing catchJsonDataByWebCache, please ensure that the current component's props contain the following properties:
* keyRoute、targetJsonSchema、updateFormValueData
* getJSONDataByKeyRoute、getInitJsonDataByKeyRoute
* */

export function catchJsonDataByWebCache(this: any, curKeyRoute: string) {
  const { targetJsonSchema } = this.props;
  const {
    getJSONDataByKeyRoute,
    getInitJsonDataByKeyRoute,
    updateFormValueData,
  } = this.props.jsonStore || {};
  const curType = targetJsonSchema.type;
  const keyRoute = curKeyRoute || this.props.keyRoute;
  const cacheValue = getWebCacheData(`${keyRoute}-${curType}`); // Ensure that only values ​​of the same type are cached
  if (cacheValue) {
    // 1. First try to retrieve data from jsonData
    let curValue = getJSONDataByKeyRoute(keyRoute);
    if (curValue === undefined || curValue === null) {
      // 2. Try retrieving data from jsonDataTemp again.
      curValue = getInitJsonDataByKeyRoute(keyRoute);
    }
    if (curValue === undefined || curValue === null) {
      // 3. Update the cached values ​​to jsonData
      updateFormValueData(keyRoute, cacheValue);
    }
  }
}
