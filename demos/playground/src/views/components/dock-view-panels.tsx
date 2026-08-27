import { PanelDynamic } from "./panels/dynamic"
import RegistrySelector from "#plugins/registry-manager-plugin/view/registry-selector"
export const DockViewPanels = {
  default: (props: any) => {
    return <PanelDynamic props={props} />
  },
  dynamic: (props: any) => {
    return <PanelDynamic props={props} />
  },
}


export const DockViewPluginPanels = {
  default: (props: any) => {
    return <RegistrySelector props={props} />
  },
  dynamic: (props: any) => {
    return <RegistrySelector props={props} />
  },
}