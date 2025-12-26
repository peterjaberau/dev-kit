
export const createSplitProps =
  () =>
  (props: any, keys: any) =>
    (keys as string[]).reduce(
      (previousValue, currentValue) => {
        const [target, source] = previousValue
        const key = currentValue
        if (source[key] !== undefined) {
          target[key] = source[key]
        }
        delete source[key]
        return [target, source]
      },
      [{}, { ...props }],
    )
