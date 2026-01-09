export const getRootId: any = (ctx: any) => ctx.ids?.root ?? `tree:${ctx.id}:root`
export const getLabelId: any = (ctx: any) => ctx.ids?.label ?? `tree:${ctx.id}:label`
export const getNodeId: any = (ctx: any, value: string) => ctx.ids?.node?.(value) ?? `tree:${ctx.id}:node:${value}`
export const getTreeId: any = (ctx: any) => ctx.ids?.tree ?? `tree:${ctx.id}:tree`
export const getTreeEl: any = (ctx: any) => ctx.getById(getTreeId(ctx))

export const focusNode = (ctx: any, value: string | null | undefined) => {
  if (value == null) return
  ctx.getById(getNodeId(ctx, value))?.focus()
}

export const getRenameInputId = (ctx: any, value: string) => `tree:${ctx.id}:rename-input:${value}`

export const getRenameInputEl = (ctx: any, value: string) => {
  return ctx.getById(getRenameInputId(ctx, value))
}
