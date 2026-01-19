import { createFetchProxy } from "@apihero/fetch"

export function getFetch() {
  const key = process.env.APIHERO_PROJECT_KEY

  if (typeof key === "string") {
    return createFetchProxy({
      projectKey: key,
      env: process.env.NODE_ENV,
    })
  }

  return fetch
}
