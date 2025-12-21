type EnsureKeys<ExpectedKeys extends (keyof Target)[], Target> = keyof Target extends ExpectedKeys[number]
  ? unknown
  : `Missing required keys: ${Exclude<keyof Target, ExpectedKeys[number]> & string}`

export const createSplitProps =
  (props?: any, p0?: string[]) =>
  (props?: any, keys?: any) =>
    (keys as string[]).reduce(
      (previousValue: any, currentValue: any) => {
        const [target, source] = previousValue
        const key: any = currentValue
        if (source[key] !== undefined) {
          target[key] = source[key]
        }
        delete source[key]
        return [target, source]
      },
      [{}, { ...props }],
    )
