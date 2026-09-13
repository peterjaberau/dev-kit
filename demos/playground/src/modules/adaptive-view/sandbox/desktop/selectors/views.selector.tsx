import { useDesktop } from "./desktop.selector"

const EMPTY_VIEW_PROPS: Record<string, unknown> = {}

export interface DesktopViewDefinition {
  id: string
  plugin: string
  props?: Record<string, unknown>
}

export interface DesktopViewListItem {
  id: string
  name: string
}

export const useViews = () => {
  const { desktopContext } = useDesktop()
  const viewProfile = desktopContext.view.viewProfile
  const views: DesktopViewDefinition[] = viewProfile?.data?.views ?? []
  const viewIds = views.map(({ id }) => id)
  const viewsList: DesktopViewListItem[] = views.map(({ id, plugin }) => ({
    id,
    name: plugin ?? id,
  }))

  return {
    viewProfile,
    viewProfileId: viewProfile?.id ?? null,
    viewProfiles: desktopContext.presets.viewProfiles,
    views,
    viewIds,
    viewsList,
    metadata: { views: viewsList },
  }
}

export const useView = (viewId: string) => {
  const { views } = useViews()
  const view = views.find(({ id }) => id === viewId)

  return {
    view,
    viewId,
    viewPlugin: view?.plugin,
    viewProps: view?.props ?? EMPTY_VIEW_PROPS,
    viewContext: view ?? null,
    viewState: view ? { id: view.id, plugin: view.plugin, props: view.props ?? EMPTY_VIEW_PROPS } : null,
  }
}
