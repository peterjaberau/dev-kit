import { useDockViewPanel } from "#actors/model/machines/dock-view"
import { PanelWrapperDockview } from "./panels/wrappers/panel.wrapper.dockview"
import {
  PanelBaseAiChat,
  PanelBaseCode,
  PanelBaseDefault,
  PanelBaseEmpty,
  PanelBasePlaceholder,
  PanelBaseRenderer,
  PanelBaseJsonViewer,
} from "./panels/base"
import { PanelCustomJsonViewer } from "./panels/custom/panel.custom.json-viewer"
import { PanelDynamic, PanelDynamicSelectScope } from "./panels/dynamic"
// PanelWrapperDockview
export const DockViewPanels = {
  default: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelCustomJsonViewer {...props} />
      </PanelWrapperDockview>
    )
  },

  dynamic: (props: any) => {
    return (
      <PanelDynamic />

      // <PanelDynamicSelectScope {...props} />
    )
  },

  placeholder: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBasePlaceholder />
      </PanelWrapperDockview>
    )
  },

  code: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseCode />
      </PanelWrapperDockview>
    )
  },

  renderer: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseRenderer />
      </PanelWrapperDockview>
    )
  },

  empty: (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseEmpty />
      </PanelWrapperDockview>
    )
  },

  "ai-chat": (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseAiChat />
      </PanelWrapperDockview>
    )
  },

  "json-viewer": (props: any) => {
    return (
      <PanelWrapperDockview>
        <PanelBaseJsonViewer />
      </PanelWrapperDockview>
    )
  },
}
