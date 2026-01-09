import { deepExpand } from "./deep-get-set"

export function defineControls(config: any) {
  return config
}

export function getControlDefaults(obj: any) {
  const result = Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [key]: obj[key].defaultValue,
    }),
    {},
  )

  return deepExpand(result)
}
