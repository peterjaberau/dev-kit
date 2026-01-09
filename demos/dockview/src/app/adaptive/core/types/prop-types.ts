export function createNormalizer(fn: (props: any) => any) {
  return new Proxy({} as any, {
    get(_target, key: string) {
      if (key === "style")
        return (props: any) => {
          return fn({ style: props }).style
        }
      return fn
    },
  })
}
