import { useDesktop } from "./desktop.selector"

const EMPTY_VIEW_PROPS: Record<string, unknown> = {}

export interface DesktopViewDefinition {
  id: string
  plugin: string
  props?: Record<string, unknown>
}

export const useView = (viewId: string) => {
  const { desktopContext } = useDesktop()
  const views: DesktopViewDefinition[] = desktopContext.view.viewProfile?.data?.views ?? []
  const view = views.find(({ id }) => id === viewId)

  return {
    viewPlugin: view?.plugin,
    viewProps: view?.props ?? EMPTY_VIEW_PROPS,
  }
}
