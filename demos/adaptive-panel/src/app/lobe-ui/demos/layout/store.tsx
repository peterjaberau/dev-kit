import { createStore, useSelector, createStoreHook, createAtom, useAtom } from "@xstate/store-react"
import { produce } from "immer"


const useDraggableStore = createStoreHook({
  context: {
    headerHeight: 0,
    fullscreen: false,
    maxHeight: undefined,
    pin: true,
    mode: "fixed",
    placement: "right",
    resize: undefined,
    style: undefined,
    showBorder: true,
    showHandleHighlight: false,
    showHandleWideArea: true,
    backgroundColor: undefined,
    size: undefined,
    defaultSize: undefined,
    minWidth: undefined,
    minHeight: undefined,
    expandable: true,
    expand: undefined,
    defaultExpand: true,
    className: undefined,
    showHandleWhenCollapsed: undefined,
    destroyOnClose: undefined,
    styles: undefined,
    classNames: undefined,
    dir: "ltr",
  },
  on: {

  },
})
