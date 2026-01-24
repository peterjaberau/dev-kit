import { customRandom } from "nanoid"

export function createId() {
  const nanoid = customRandom("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12, (bytes) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return array
  })
  return nanoid()
}

export function isUrl(value: any) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function isJSON(value: any) {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
