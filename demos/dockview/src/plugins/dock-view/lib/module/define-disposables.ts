export const defineDockDisposables = ({ api, sendBack }: any) => {
  return [
    api.onDidAddPanel((event: any) => sendBack({ type: "onDidAddPanel", payload: event })),
    api.onDidRemovePanel((event: any) => sendBack({ type: "onDidRemovePanel", payload: event })),
    api.onDidActivePanelChange((event: any) => sendBack({ type: "onDidActivePanelChange", payload: event })),
    api.onDidMovePanel((event: any) => sendBack({ type: "onDidMovePanel", payload: event })),

    api.onDidAddGroup((event: any) => sendBack({ type: "onDidAddGroup", payload: event })),
    api.onDidRemoveGroup((event: any) => sendBack({ type: "onDidRemoveGroup", payload: event })),
    api.onDidActiveGroupChange((event: any) => sendBack({ type: "onDidActiveGroupChange", payload: event })),
    api.onDidMaximizedGroupChange((event: any) => sendBack({ type: "onDidMaximizedGroupChange", payload: event })),
  ]
}
