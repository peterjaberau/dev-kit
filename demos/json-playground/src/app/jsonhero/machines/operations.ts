/**
 * jsonDoc server
 *
 * RESPONSIBILITY
 * --------------
 * - Own document persistence
 * - Enforce basic document invariants
 * - Expose a small, stable domain API
 *
 * DOES NOT
 * --------
 * - Know about UI
 * - Know about XState
 * - Know about Cloudflare
 * - Manage async orchestration
 */

import { customRandom } from "nanoid"
import safeFetch from "../utilities/safeFetch"
import createFromRawXml from "../utilities/xml/createFromRawXml"
import isXML from "../utilities/xml/isXML"

const STORAGE_KEY = "__documents__"

const documentStore = {
  load() {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  },

  save(store: any) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  },

  get(id: any) {
    return this.load()[id]
  },

  set(doc: any) {
    const store = this.load()
    store[doc.id] = doc
    this.save(store)
    return doc
  },

  update(id: any, updater: any) {
    const store = this.load()
    const current = store[id]
    if (!current) return

    const updated = updater(current)
    store[id] = updated
    this.save(store)
    return updated
  },

  remove(id: any) {
    const store = this.load()
    delete store[id]
    this.save(store)
  },
}

/**
 * Smart entry point.
 * Determines how to create a document based on input type.
 */
export async function createFromUrlOrRawJson(urlOrJson: any, title: any) {
  if (isUrl(urlOrJson)) {
    return createFromUrl(new URL(urlOrJson), title)
  }

  if (isJSON(urlOrJson)) {
    return createFromRawJson(title ?? "Untitled", urlOrJson)
  }

  if (isXML(urlOrJson)) {
    return createFromRawXml("Untitled", urlOrJson)
  }
}

export async function createFromUrl(url: any, title: any, options?: any) {
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

  return documentStore.set(doc)
}

export async function createFromRawJson(filename: any, contents: any, options?: any) {
  JSON.parse(contents) // validation

  const doc = {
    id: createId(),
    type: "raw",
    contents,
    title: filename,
    readOnly: options?.readOnly ?? false,
  }

  return documentStore.set(doc)
}

export async function getDocument(slug: any) {
  return documentStore.get(slug)
}

export async function updateDocument(slug: any, title: any) {
  return documentStore.update(slug, (doc: any) => ({
    ...doc,
    title,
  }))
}

export async function deleteDocument(slug: any) {
  documentStore.remove(slug)
}

function createId() {
  const nanoid = customRandom("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12, (bytes) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return array
  })
  return nanoid()
}

function isUrl(value: any) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function isJSON(value: any) {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
