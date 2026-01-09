export const createAnatomy = (name: string, parts = [] as any[]) => ({
  parts: (...values: any) => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values)
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")
  },
  extendWith: (...values: any) => createAnatomy(name, [...parts, ...values]),
  omit: (...values: any[]) => createAnatomy(name, parts.filter((part) => !values.includes(part as any)) as any[]),
  rename: (newName: any) => createAnatomy(newName, parts),
  keys: () => parts,
  build: () =>
    [...new Set(parts)].reduce(
      (prev, part) =>
        Object.assign(prev, {
          [part]: {
            selector: [
              `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
              `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
            ].join(", "),
            attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) },
          },
        }),
      {},
    ),
})

const toKebabCase = (value: string) =>
  value
    .replace(/([A-Z])([A-Z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const isEmpty = (v: any[]): boolean => v.length === 0
