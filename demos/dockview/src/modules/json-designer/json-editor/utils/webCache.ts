/**
 * Cache data in sessionStorage
 * */
export function saveJSONEditorCache(
  key: string,
  value: any,
  cacheMark: string = 'json-editor-cache',
): void {
  if (window.sessionStorage) {
    let cacheData: Record<string, any> = {};
    let cacheDataStr = window.sessionStorage.getItem(cacheMark);
    if (cacheDataStr) {
      cacheData = JSON.parse(cacheDataStr);
    }
    if (key) {
      cacheData[key] = value;
    }
    window.sessionStorage.setItem(cacheMark, JSON.stringify(cacheData));
  }
}

/**
 * Read previously cached data from sessionStorage
 * */
export function getJSONEditorCache(
  valueKey: string,
  cacheMark: string = 'json-editor-cache',
): any {
  let curKeyValue: any;
  if (window.sessionStorage) {
    let cacheData: Record<string, any> = {};
    let cacheDataStr = window.sessionStorage.getItem(cacheMark);
    if (cacheDataStr) {
      cacheData = JSON.parse(cacheDataStr);
    }
    if (valueKey) {
      curKeyValue = cacheData[valueKey];
    }
  }
  return curKeyValue;
}

/**
 * Delete previously cached data from sessionStorage
 * */
export function deleteJSONEditorCache(
  valueKey: string,
  cacheMark: string = 'json-editor-cache',
): void {
  if (window.sessionStorage) {
    let cacheData: Record<string, any> = {};
    let cacheDataStr = window.sessionStorage.getItem(cacheMark);
    if (cacheDataStr) {
      cacheData = JSON.parse(cacheDataStr);
    }
    if (valueKey) {
      cacheData[valueKey] = undefined;
    }
  }
}
