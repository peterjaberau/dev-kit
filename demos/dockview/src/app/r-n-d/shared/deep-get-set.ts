export const deepSet = (obj: any, path: string, value: any) => {
  const parts = path.split(".")

  const last = parts.pop()
  if (!last) return

  const parent = parts.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {}
    return acc[key]
  }, obj)

  parent[last] = value
}

export const deepGet = (obj: any, path: string) => {
  const parts = path.split(".")

  return parts.reduce((obj, key) => {
    if (!obj) return
    return obj[key]
  }, obj)
}

export const deepExpand = (obj: any) => {
  const result: any = {} as any

  for (const key in obj) {
    const value = obj[key]
    if (value == null) continue
    deepSet(result, key, obj[key])
  }

  return result
}
