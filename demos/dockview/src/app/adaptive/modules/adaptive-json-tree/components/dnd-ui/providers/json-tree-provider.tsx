import { createContext } from "@chakra-ui/react"

/*

export interface CreateContextOptions<T> {
    strict?: boolean | undefined
    hookName?: string | undefined
    providerName?: string | undefined
    errorMessage?: string | undefined
    name?: string | undefined
    defaultValue?: T | undefined
}

 */


export const JsonTreeContext = (props: any) => props.children(useJsonTreeContext())
export const [JsonTreeProvider, useJsonTreeContext] = createContext({
  name: "JsonTreeContext",
  hookName: "useJsonTreeContext",
  providerName: "<JsonTreeProvider />",
})


