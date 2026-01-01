import { atom, type Atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// Storage key prefix for the app
export const STORAGE_PREFIX = "dev-kit-"

export function namedAtom<AtomType extends Atom<unknown>>(name: string, atomValue: AtomType): AtomType {
  atomValue.debugLabel = name
  return atomValue
}

export function prependBase(name: string | undefined): string {
  if (!name) return "base"
  return `base${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

export function withErrorHandling<T>(fn: () => T, context: string, fallback: T): T {
  try {
    return fn()
  } catch (error) {
    handleAtomError(error, context)
    return fallback
  }
}

export function createAtomWithStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    getOnInit?: boolean
    serialize?: (value: T) => string
    deserialize?: (value: string) => T
  },
) {
  // Use default localStorage for Jotai, but wrap in SSR check
  if (typeof window === "undefined") {
    // Return a simple atom for SSR
    return atom(initialValue)
  }

  return atomWithStorage(
    `${STORAGE_PREFIX}${key}`,
    initialValue,
    undefined, // Use default localStorage
    options,
  )
}

export const log = {
  info: (...args: unknown[]) => console.log(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
}

export function matchesDueDateFilter(): boolean {
  return true
}

export function handleAtomError(error: unknown, context?: string) {
  console.error(`Atom error${context ? ` in ${context}` : ""}:`, error)
}
