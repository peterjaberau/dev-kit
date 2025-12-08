export const applyDefaultLayout = ({ api, defaultConfig }: any) => {
  if (defaultConfig && defaultConfig.panels.length > 0) {
    const firstPanel = api.addPanel(defaultConfig.panels[0])
    defaultConfig.panels.slice(1).forEach((panel: any) => {
      api.addPanel(panel)
    })
    firstPanel.api.setActive()
  }
}
