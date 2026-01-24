export const PreferencesDefaults = {
  indent: 2,
}

export const PREFERENCES_STORAGE_KEY = "__preferences__"

export function normalizePreferences(raw: any) {
  const prefs = raw ?? {}
  return {
    indent: prefs.indent ?? PreferencesDefaults.indent,
  }
}

export const preferencesStore = {
  load() {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return normalizePreferences(parsed)
  },

  save(preferences: any) {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
  },

  get() {
    return this.load()
  },

  set(preferences: any) {
    this.save(preferences)
    return preferences
  },

  update(updater: any) {
    const current = this.load()
    const updated = updater(current)
    this.save(updated)
    return updated
  },

  remove() {
    localStorage.removeItem(PREFERENCES_STORAGE_KEY)
  },
}