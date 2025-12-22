import type { Ref } from 'react'


export function composeRefs(...refs: any[]): (node: any) => void {
  return (node) => {
    const cleanUps: VoidFunction[] = []

    for (const ref of refs) {
      if (typeof ref === 'function') {
        const cb = ref(node)
        if (typeof cb === 'function') {
          cleanUps.push(cb)
        }
      } else if (ref) {
        ref.current = node
      }
    }

    if (cleanUps.length) {
      return () => {
        for (const cleanUp of cleanUps) {
          cleanUp()
        }
      }
    }
  }
}
