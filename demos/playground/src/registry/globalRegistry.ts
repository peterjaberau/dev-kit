// globalRegistry.ts
export type RegistryKey<T = unknown> = symbol & { __type?: T }

class GlobalRegistry {
  private map = new Map<symbol, unknown>()

  register<T>(key: RegistryKey<T>, value: T) {
    this.map.set(key, value)
  }

  unregister(key: symbol) {
    this.map.delete(key)
  }

  get<T>(key: RegistryKey<T>): T | undefined {
    return this.map.get(key) as T | undefined
  }
}

export const globalRegistry: any = new GlobalRegistry()

export const createRegistryKey: any = <T>() => Symbol() as RegistryKey<T>
