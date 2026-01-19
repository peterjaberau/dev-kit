import invariant from "tiny-invariant"
import { deleteDocument, getDocument, JSONDocument } from "../jsonDoc.server"

export

export async function createJson(input: any, deps: any): Promise<any> {
  const { jsonUrl, base64Json, title, ttl, readOnly, injest } = input

  invariant(jsonUrl || base64Json, "Either jsonUrl or base64Json is required")

  const options: any = {}

  if (ttl !== undefined) {
    invariant(Number.isInteger(ttl), "ttl must be an integer")
    invariant(ttl >= 60, "ttl must be at least 60 seconds")
    options.ttl = ttl
  }

  if (readOnly !== undefined) {
    options.readOnly = readOnly
  }

  if (injest !== undefined) {
    options.injest = injest
  }

  if (jsonUrl) {
    const url = new URL(jsonUrl)

    const doc = await deps.createFromUrl(url, title ?? url.href, options)

    return {
      kind: "url",
      id: doc.id,
      sourceUrl: url.href,
      hostname: url.hostname,
    }
  }

  const rawJson = deps.base64Decode(base64Json!)

  const doc = await deps.createFromRawJson(title ?? "Untitled", rawJson, options)

  return {
    kind: "base64",
    id: doc.id,
  }
}
