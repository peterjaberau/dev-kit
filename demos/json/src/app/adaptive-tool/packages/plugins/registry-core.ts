import dynamic from "next/dynamic"

type Loader = () => Promise<any>
type LoaderMap = Record<string, Loader>

const store: Record<string, any> = {}

export const registerComponent = (prefix: string, loaders: LoaderMap) => {
  Object.entries(loaders).forEach(([name, loader]) => {
    const id = `${prefix}${name}`

    if (store[id]) return
    store[id] = dynamic(loader, { ssr: false })
  })
}


// 🔒 INTERNAL — used only by registry.tsx
export const getRegisteredComponent = (id: string) => store[id]
export const getRegistryNames = () => Object.keys(store)
