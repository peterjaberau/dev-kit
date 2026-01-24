import { customRandom } from "nanoid"
import safeFetch from "./utilities/safeFetch"
import createFromRawXml from "./utilities/xml/createFromRawXml"
import isXML from "./utilities/xml/isXML"


const STORAGE_KEY = "__documents__"

function loadStore() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

function saveStore(store: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function saveDocument(doc: any) {
  const store = loadStore()
  store[doc.id] = doc
  saveStore(store)
}

function removeDocument(id: any) {
  const store = loadStore()
  delete store[id]
  saveStore(store)
}


export const createFromUrlOrRawJson: any = async (urlOrJson: any, title: any) => {
  if (isUrl(urlOrJson)) {
    return createFromUrl(new URL(urlOrJson), title)
  }

  if (isJSON(urlOrJson)) {
    return createFromRawJson("Untitled", urlOrJson)
  }

  if (isXML(urlOrJson)) {
    return createFromRawXml("Untitled", urlOrJson)
  }
}

export const createFromUrl: any = async (url: any, title: any, options: any) => {
  if (options?.injest) {
    const response = await safeFetch(url.href)

    if (!response.ok) {
      throw new Error(`Failed to injest ${url.href}`)
    }

    return createFromRawJson(title || url.href, await response.text(), options)
  }

  const doc = {
    id: createId(),
    type: "url",
    url: url.href,
    title: title ?? url.hostname,
    readOnly: options?.readOnly ?? false,
  }

  saveDocument(doc)
  return doc
}

export const createFromRawJson: any = (filename: any, contents: any, options: any) => {
  JSON.parse(contents) // validate JSON

  const doc: any = {
    id: createId(),
    type: "raw",
    contents,
    title: filename,
    readOnly: options?.readOnly ?? false,
  }

  saveDocument(doc)
  return doc
}


export async function getDocument(slug: any) {
  const store = loadStore()
  return store[slug]
}

export async function updateDocument(slug: any, title: any) {
  const store = loadStore()
  const document = store[slug]

  if (!document) return

  const updated = { ...document, title }
  store[slug] = updated
  saveStore(store)

  return updated
}

export async function deleteDocument(slug: any) {
  removeDocument(slug)
}


function createId() {
  const nanoid = customRandom("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12, (bytes) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return array
  })
  return nanoid()
}

function isUrl(possibleUrl: any) {
  try {
    new URL(possibleUrl)
    return true
  } catch {
    return false
  }
}

function isJSON(possibleJson: any) {
  try {
    JSON.parse(possibleJson)
    return true
  } catch (e: any) {
    throw new Error(e.message)
  }
}
