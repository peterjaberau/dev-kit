const DOCUMENT_STORAGE_KEY = "__documents__"

export const documentStore = {
  load() {
    const raw = localStorage.getItem(DOCUMENT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  },

  save(store: any) {
    localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(store))
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

