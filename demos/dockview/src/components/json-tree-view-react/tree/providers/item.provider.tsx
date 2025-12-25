import { createContext } from "../helpers/utils"

export const ItemContext = (props: any) => props.children(useItemContext())

export const [ItemProvider, useItemContext]: any = createContext({
  name: "ItemContext",
  hookName: "useItemContext",
  providerName: "<ItemProvider />",
})
