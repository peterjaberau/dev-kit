import { enqueueActions, setup } from "xstate"

export const dockviewMachineDraft = setup({}).createMachine({
  context: ({ input }: any) => {
    return {
      api: null,
      gridview: {
        orientation: "horizontal", //'horizontal' | 'vertical'
        proportionalLayout: false,
      },
      options: {
        debug: false,
        disableAutoResizing: false,
        disableDnd: false,
        disableFloatingGroups: false,
        disableTabsOverflowList: false,
        dndCompass: {
          edges: false,
          zones: [], //'center' | 'right' | 'left' | 'bottom' | 'top'
        },
        dndEdges: false,
        dndStrategy: "auto", //'html5' | 'pointer' | 'auto'

        edgeGroupPeek: {
          animate: false,
        },
        keyboardNavigation: false,
        hideBorders: false,
        noPanelsOverlay: "watermark", //'watermark' | 'emptyGroup'
        locked: false,
        overflow: {
          // also overflow = true | false
          mode: "dropdown", //'wrap' | 'dropdown'
          mru: false,
          search: {
            placeholder: "Search panels...",
            scope: "group", //'group' | 'overflow'
          },
        },
        popoutUrl: null,
        scrollbars: "custom", //'custom' | 'native'
        singleTabMode: "default", //'default' | 'fullwidth'
        smartGuides: {
          className: null,
          disableSnapModifier: "false", //'shift' | 'meta' | 'ctrl' | 'alt' | false
          enabled: false,
          releaseDistance: null, //number | null
          showGuides: false,
          snapDistance: null, //number | null
          snapTargets: {
            container: false,
            containerInset: null, //number | null
            floats: false,
            splitters: false,
          },
          snapTogether: false,
        },
        tabGroupAccent: "off", //'off' | 'palette'
      },
    }
  },
  states: {
    ready: {
      on: {
        /** Lifecycle Events */
        onReady: {},
        onDidDrop: {},
        onWillDrop: {},

        /** Api Events */
        onDidActiveGroupChange: {},
        onDidActivePanelChange: {},
        onDidAddGroup: {},
        onDidAddPanel: {},
        onDidAddPanelToTabGroup: {},
        onDidAddPopoutGroup: {},
        onDidChangeHistory: {},
        onDidCreateTabGroup: {},
        onDidDestroyTabGroup: {},
        onDidLayoutChange: {},
        onDidLayoutFromJSON: {},
        onDidMaximizedGroupChange: {},
        onDidMovePanel: {},
        onDidMutateLayout: {},
        onDidOpenPopoutWindowFail: {},
        onDidPanelPinnedChange: {},
        onDidPopoutGroupPositionChange: {},
        onDidPopoutGroupSizeChange: {},
        onDidRemoveGroup: {},
        onDidRemovePanel: {},
        onDidRemovePanelFromTabGroup: {},
        onDidRemovePopoutGroup: {},
        onDidSnapFloat: {},
        onDidSnapTogether: {},
        onDidTabGroupChange: {},
        onDidTabGroupCollapsedChange: {},
        onUnhandledDragOver: {},
        onWillDragGroup: {},
        onWillDragPanel: {},
        onWillMutateLayout: {},
        onWillShowOverlay: {},



        /** Grid Panel Api Events */
        onDidConstraintsChange: {},

        /** Group Api Events */
        onDidActiveChange: {},
        onDidDimensionsChange: {},
        onDidFocusChange: {},
        onDidParametersChange: {},
        onDidVisibilityChange: {},
        onWillFocus: {},
        onDidCollapsedChange: {},
        onDidHeaderDirectionChange: {},
        onDidLocationChange: {},
        onDidPeekChange: {},

        /** Panel Api Events */
        // onDidActiveGroupChange: {},
        onDidChangePinned: {},
        onDidGroupChange: {},
        onDidRendererChange: {},
        onDidTitleChange: {},
      },
    },
  },
})
