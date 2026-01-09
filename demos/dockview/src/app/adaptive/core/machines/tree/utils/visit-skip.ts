
export function skipFn(params: any) {
  const { prop, context } = params
  return function skip({ indexPath }: any) {
    const paths = prop("collection").getValuePath(indexPath).slice(0, -1)
    return paths.some((value: any) => !context.get("expandedValue").includes(value))
  }
}
