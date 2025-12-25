
const isFunction = (value: any) => typeof value === 'function'

export const runIfFn = (
  valueOrFn: any,
  ...args: any[]
) =>
  isFunction(valueOrFn)
    ? valueOrFn(...args)
    : (valueOrFn)
