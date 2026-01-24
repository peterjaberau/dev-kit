import { customRandom } from "nanoid"

export const createRandomId = () => {
  const nanoid = customRandom("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12, (bytes) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return array
  })

  return nanoid()
}

export const isJSON = (possibleJson: any) => {
  try {
    JSON.parse(possibleJson)
    return true
  } catch (e: any) {
    throw new Error(e.message)
  }
}
