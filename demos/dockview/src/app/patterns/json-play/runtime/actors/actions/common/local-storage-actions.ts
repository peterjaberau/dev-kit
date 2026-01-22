import { Actions } from "xstate"

export interface LocalStorageContext {
  appKey: string
  store: Record<string, any>
  result: any
}

export const load = Actions.assign<LocalStorageContext, { appKey: string }>(({ context }, params) => {
  const raw = localStorage.getItem(params.appKey)

  if (raw !== null) {
    context.store = JSON.parse(raw)
  } else {
    context.store = {}
    localStorage.setItem(params.appKey, JSON.stringify(context.store))
  }
})

export const persist = Actions.action<LocalStorageContext>(({ context }) => {
  localStorage.setItem(context.appKey, JSON.stringify(context.store))
})

export const setItem = Actions.assign<LocalStorageContext, { key: string; value: any }>(({ context }, params) => {
  context.store[params.key] = params.value
  context.result = params.value
})

export const getItem = Actions.assign<LocalStorageContext, { key: string }>(({ context }, params) => {
  context.result = context.store[params.key]
})

export const removeItem = Actions.assign<LocalStorageContext, { key: string }>(({ context }, params) => {
  delete context.store[params.key]
  context.result = undefined
})

export const clear = Actions.assign<LocalStorageContext>(({ context }) => {
  context.store = {}
  context.result = undefined
})
