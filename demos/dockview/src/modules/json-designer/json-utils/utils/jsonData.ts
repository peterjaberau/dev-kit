/**
 * Get the key path value of the parent element
 */
export function getParentKeyRoute(curKeyRoute: string) {
  const curKeyArr = curKeyRoute.split('-');
  curKeyArr.pop();
  return curKeyArr.join('-');
}

/**
 * Get the key path value of the parent element and the current key.
 */
export function getParentKeyRoute_CurKey(
  curKeyRoute: string,
): [string, string] {
  const curKeyArr: string[] = curKeyRoute.split('-');
  const curKey: string = curKeyArr.pop() || '';
  return [curKeyArr.join('-'), curKey];
}
