import { useSyncExternalStore } from "react"


// Share one native listener per event across mounted consumers. React subscription
// identity stays stable until the native event itself changes.
const subscriptions = new WeakMap()
const noopSubscribe = () => () => {}
function subscribeTo(event: any) {
  if (!event) return noopSubscribe
  let subscribe = subscriptions.get(event)
  if (!subscribe) {
    const listeners = new Set<() => void>()
    let disposable: { dispose(): void } | undefined
    subscribe = (notify: any) => {
      listeners.add(notify)
      disposable ??= event(() => listeners.forEach((listener) => listener()))
      return () => {
        listeners.delete(notify)
        if (!listeners.size) {
          disposable?.dispose()
          disposable = undefined
        }
      }
    }
    subscriptions.set(event, subscribe)
  }
  return subscribe
}

export function useNativeValue<T>(event: any, read: any) {
  return useSyncExternalStore(subscribeTo(event), read, read)
}
