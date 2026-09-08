import {
  DockviewDefaultTab,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewGroupDragGhostProps,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
  DockviewApi,
  DockviewTheme,
  themeAbyss,
  IContextMenuItemComponentProps,
  GetTabContextMenuItemsParams,
  GetTabGroupChipContextMenuItemsParams,
  DEFAULT_TAB_GROUP_COLORS,
} from "#adaptive-view/react";
// Registers the enterprise feature modules in the global registry.
import '#adaptive-view/enterprise';
import * as React from 'react';
import { setupEdgeGroups } from '../sandbox-manager/defaultLayout';
import { loadDockviewLayout } from '../sandbox-manager/utils';
import { useSandboxManagerSelector } from '../sandbox-manager/provider';
import SandboxRenderer, {
    type SandboxManagerRenderProps,
} from '../sandbox-manager/sandbox-renderer';
import { instanceProfiles, layoutProfiles } from './config';
import {
    LeftControls,
    PrefixHeaderControls,
    RightControls,
} from '../components/headerActions';
import { Table, usePanelApiMetadata } from '../sandbox-manager/debugPanel';
import { EventLogPanel } from '../sandbox-manager/panels/eventLogPanel';
import { LayoutInspectorPanel } from '../sandbox-manager/panels/layoutInspectorPanel';
import { PanelDebugPanel } from '../sandbox-manager/panels/panelDebugPanel';
import { MarketProvider } from './providers/marketProvider';
import { ChartPanel } from './panels/chartPanel';
import { CorrelationPanel } from './panels/correlationPanel';
import { FxTilesPanel } from './panels/fxTilesPanel';
import { NewsPanel } from './panels/newsPanel';
import { OrderBookPanel } from './panels/orderBookPanel';
import { OrdersPanel } from './panels/ordersPanel';
import { PositionSummaryPanel } from './panels/positionSummaryPanel';
import { PriceAlertPanel } from './panels/priceAlertPanel';
import { SignalsPanel } from './panels/signalsPanel';
import { VolSurfacePanel } from './panels/volSurfacePanel';
import { WatchlistPanel } from './panels/watchlistPanel';
import { PanelRenderer } from '../components/panelRenderer';
import { MONO } from './constants';
import {
    SandboxColorsContext,
    SANDBOX_DARK_COLORS,
    SANDBOX_LIGHT_COLORS,
    useSandboxColors,
} from '../sandbox-manager/sandboxTheme';
import { RegistryViewer } from '#plugins/registry-manager-plugin/view';
import { InstanceRenderer } from '../instance-manager/instance-renderer';
import { useSandboxInstance } from '../instance-manager/selectors';
import { Box, NativeSelect, Text } from '@chakra-ui/react';
import {
    ViewInstanceInspector,
    ViewInstanceRenderer,
    ViewInstances,
    ViewLayoutGroupInspector,
    ViewLayoutInspector,
    ViewLayoutPanelInspector,
    ViewRegistryLibrary,
    ViewSandboxPlayground,
} from '../sandbox-manager/views';

export const ApiContext = React.createContext<DockviewApi | undefined>(
    undefined
);

const DebugContext = React.createContext<boolean>(false);

const Option = (props: {
    title: string;
    onClick: () => void;
    value: string;
}) => {
    return (
        <div>
            <span>{`${props.title}: `}</span>
            <button onClick={props.onClick}>{props.value}</button>
        </div>
    );
};

const ShadowIframe = (props: IDockviewPanelProps) => {
    return (
        <iframe
            onMouseDown={() => {
                if (!props.api.isActive) {
                    props.api.setActive();
                }
            }}
            style={{ border: 'none', width: '100%', height: '100%' }}
            src="https://dockview.dev"
        />
    );
};

type DynamicPanelParams = {
    componentId?: string;
    props?: Record<string, unknown>;
};

type DynamicPanelProps = IDockviewPanelProps<DynamicPanelParams> & {
    title?: string;
};

type InstancePanelParams = {
    instanceId?: string;
};

const InspectorSelect = (props: {
    value: string;
    options: readonly string[];
    label: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
}) => (
    <Box width="full" height="full" display="flex" flexDirection="column">
        <Box padding="2" flexShrink={0}>
            <NativeSelect.Root size="sm">
                <NativeSelect.Field
                    aria-label={props.label}
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                >
                    {props.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </Box>
        <Box minHeight={0} flex="1" overflow="hidden">
            {props.children}
        </Box>
    </Box>
);

const SandboxIsolatedView = ({ children }: React.PropsWithChildren) => (
    <Box
        data-sandbox-theme-isolated
        width="full"
        height="full"
        minWidth={0}
        minHeight={0}
    >
        {children}
    </Box>
);

const InstanceInspectorView = () => {
    const { selectedInstanceId } = useSandboxInstance();

    return selectedInstanceId ? (
        <ViewInstanceInspector instanceId={selectedInstanceId} />
    ) : (
        <Text padding="3">Select an instance from Spawned Instances.</Text>
    );
};

const InstanceRendererView = () => {
    const { selectedInstanceId } = useSandboxInstance();

    return selectedInstanceId ? (
        <ViewInstanceRenderer instanceId={selectedInstanceId} />
    ) : (
        <Text padding="3">Select an instance from Spawned Instances.</Text>
    );
};

const LayoutGroupInspectorView = (props: IDockviewPanelProps) => {
    const groupIds = props.containerApi.groups.map((group) => group.id);
    const [groupId, setGroupId] = React.useState(groupIds[0] ?? '');

    return (
        <InspectorSelect
            value={groupId}
            options={groupIds}
            label="Dockview group"
            onChange={setGroupId}
        >
            {groupId ? (
                <ViewLayoutGroupInspector
                    api={props.containerApi}
                    groupId={groupId}
                />
            ) : null}
        </InspectorSelect>
    );
};

const LayoutPanelInspectorView = (props: IDockviewPanelProps) => {
    const panelIds = props.containerApi.panels.map((panel) => panel.id);
    const [panelId, setPanelId] = React.useState(panelIds[0] ?? '');

    return (
        <InspectorSelect
            value={panelId}
            options={panelIds}
            label="Dockview panel"
            onChange={setPanelId}
        >
            {panelId ? (
                <ViewLayoutPanelInspector
                    api={props.containerApi}
                    panelId={panelId}
                />
            ) : null}
        </InspectorSelect>
    );
};

const components = {
  registryLibrary: () => (
    <SandboxIsolatedView><ViewRegistryLibrary /></SandboxIsolatedView>
  ),
  instances: () => (
    <SandboxIsolatedView><ViewInstances /></SandboxIsolatedView>
  ),
  instanceInspector: () => (
    <SandboxIsolatedView><InstanceInspectorView /></SandboxIsolatedView>
  ),
  instanceRenderer: () => (
    <SandboxIsolatedView><InstanceRendererView /></SandboxIsolatedView>
  ),
  sandboxPlaygroundInstance: () => (
    <SandboxIsolatedView><ViewSandboxPlayground /></SandboxIsolatedView>
  ),
  layoutStateInspector: (props: IDockviewPanelProps) => (
    <SandboxIsolatedView>
      <ViewLayoutInspector api={props.containerApi} />
    </SandboxIsolatedView>
  ),
  layoutGroupInspector: (props: IDockviewPanelProps) => (
    <SandboxIsolatedView>
      <LayoutGroupInspectorView {...props} />
    </SandboxIsolatedView>
  ),
  layoutPanelInspector: (props: IDockviewPanelProps) => (
    <SandboxIsolatedView>
      <LayoutPanelInspectorView {...props} />
    </SandboxIsolatedView>
  ),
  instance: (props: IDockviewPanelProps<InstancePanelParams>) => {
    const instanceId = props.params?.instanceId;

    return instanceId ? <InstanceRenderer instanceId={instanceId} /> : null;
  },
  dynamic: (props: DynamicPanelProps) => {
    const componentId = props.params?.componentId;
    const componentProps = props.params?.props ?? {};

    return (
      <div
        data-sandbox-theme-isolated
        style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
      >
        <RegistryViewer componentId={componentId} options={componentProps} />
      </div>
    );
  },
  default: (props: IDockviewPanelProps) => {
    const isDebug = React.useContext(DebugContext)
    const metadata = usePanelApiMetadata(props.api)
    const c = useSandboxColors()

    if (isDebug) {
      return (
        <div
          style={{
            height: "100%",
            overflow: "auto",
            background: c.bg,
            color: c.text,
            border: "2px dashed orange",
            padding: 8,
            fontSize: "0.8em",
          }}
        >
          <Option
            title="Panel Rendering Mode"
            value={metadata.renderer.value}
            onClick={() => props.api.setRenderer(props.api.renderer === "always" ? "onlyWhenVisible" : "always")}
          />
          <Table data={metadata} />
        </div>
      )
    }

    // Clean, theme-aware placeholder for generic / user-added panels: a
    // faint dotted field with the panel title and an idle status line.
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: c.bg,
          color: c.text,
          border: `1px solid ${c.border}`,
          backgroundImage: `radial-gradient(${c.border} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 26, color: c.textFaint }}>
          monitoring
        </span>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 600,
            color: c.textSecondary,
          }}
        >
          {props.api.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10.5,
            color: c.textFaint,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              background: c.green,
              boxShadow: `0 0 4px ${c.green}`,
            }}
          />
          Connected · idle
        </div>
      </div>
    )
  },
  nested: (props: IDockviewPanelProps) => {
    const theme = React.useContext(ThemeContext)
    return (
      <DockviewReact
        components={components}
        onReady={(event: DockviewReadyEvent) => {
          event.api.addPanel({ id: "panel_1", component: "default" })
          event.api.addPanel({ id: "panel_2", component: "default" })
          event.api.addPanel({
            id: "panel_3",
            component: "default",
          })

          event.api.onDidRemovePanel((e) => {
            console.log("remove", e)
          })
        }}
        theme={theme}
      />
    )
  },
  fixedPlaceholder: (props: IDockviewPanelProps) => {
    const c = useSandboxColors()
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          height: "100%",
          color: c.textMuted,
          fontFamily: MONO,
          fontSize: props.params?.position === "top" ? "13px" : "14px",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: c.textFaint }}>
          folder_open
        </span>
        <span>{props.params?.label as string}</span>
      </div>
    )
  },
  iframe: (props: IDockviewPanelProps) => {
    return (
      <iframe
        onMouseDown={() => {
          if (!props.api.isActive) {
            props.api.setActive()
          }
        }}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        src="https://dockview.dev"
      />
    )
  },
  vesselfinder: (props: IDockviewPanelProps) => {
    const srcdoc = `<!DOCTYPE html>
<html><head><style>html,body{margin:0;padding:0;height:100%;overflow:hidden;}</style></head>
<body>
<script>var width="100%";var height="100%";var latitude="51.5";var longitude="-0.12";var zoom="8";var names=false;</script>
<script src="https://www.vesselfinder.com/aismap.js"></script>
</body></html>`
    return (
      <iframe
        onMouseDown={() => {
          if (!props.api.isActive) {
            props.api.setActive()
          }
        }}
        srcDoc={srcdoc}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />
    )
  },
  debuginfo: (props: IDockviewPanelProps) => <PanelDebugPanel {...props} />,
  // Live-ticking panels are wrapped so they only re-render while visible
  // (renderer:'always' keeps inactive tabs mounted). The blotter and news are
  // static so they don't need gating.
  orders: () => <OrdersPanel />,
  orderbook: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <OrderBookPanel />
    </PanelRenderer>
  ),
  watchlist: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <WatchlistPanel />
    </PanelRenderer>
  ),
  pricealert: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <PriceAlertPanel />
    </PanelRenderer>
  ),
  positionsummary: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <PositionSummaryPanel />
    </PanelRenderer>
  ),
  chart: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <ChartPanel />
    </PanelRenderer>
  ),
  news: () => <NewsPanel />,
  fxtiles: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <FxTilesPanel />
    </PanelRenderer>
  ),
  signals: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <SignalsPanel />
    </PanelRenderer>
  ),
  correlation: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <CorrelationPanel />
    </PanelRenderer>
  ),
  volsurface: (props: IDockviewPanelProps) => (
    <PanelRenderer api={props.api}>
      <VolSurfacePanel />
    </PanelRenderer>
  ),
  eventlog: () => {
    const api = React.useContext(ApiContext)
    if (!api) return null
    return <EventLogPanel api={api} />
  },
  layoutinspector: () => {
    const api = React.useContext(ApiContext)
    if (!api) return null
    return <LayoutInspectorPanel api={api} />
  },
}

const headerComponents = {
    default: (props: IDockviewPanelHeaderProps) => {
        return <DockviewDefaultTab {...props} />;
    },
};

const FloatMenuItem = ({
    panel,
    api,
    close,
}: IContextMenuItemComponentProps) => {
    return (
        <div
            className="dv-context-menu-item"
            onClick={() => {
                api.addFloatingGroup(panel);
                close();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
            <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
            >
                ad_group
            </span>
            Float tab
        </div>
    );
};

const PopoutMenuItem = ({
    panel,
    api,
    close,
}: IContextMenuItemComponentProps) => {
    return (
        <div
            className="dv-context-menu-item"
            onClick={() => {
                api.addPopoutGroup(panel);
                close();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
            <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
            >
                open_in_new
            </span>
            Popout tab
        </div>
    );
};

type TabOverflowMode = 'dropdown' | 'wrap';

interface TabModeMenuItemProps {
    mode: TabOverflowMode;
    active: boolean;
    onSelect: (mode: TabOverflowMode) => void;
}

const TAB_MODE_LABELS: Record<TabOverflowMode, string> = {
    dropdown: 'Overflow dropdown',
    wrap: 'Wrap onto rows',
};

/**
 * Radio-style item for `overflow.mode`. `updateOptions` re-applies wrap to every
 * group, so the two modes can be swapped while the dock is live; the tick marks
 * whichever is currently active.
 */
const TabModeMenuItem = ({
    close,
    componentProps,
}: IContextMenuItemComponentProps) => {
    const { mode, active, onSelect } = componentProps as TabModeMenuItemProps;

    return (
        <div
            className="dv-context-menu-item"
            onClick={() => {
                onSelect(mode);
                close();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
            {TAB_MODE_LABELS[mode]}
            {/* Kept mounted (not conditionally rendered) so the reserved space
                stops the menu width changing as the tick moves between modes. */}
            <span
                className="material-symbols-outlined"
                style={{
                    fontSize: '14px',
                    marginLeft: 'auto',
                    visibility: active ? 'visible' : 'hidden',
                }}
            >
                check
            </span>
        </div>
    );
};

/**
 * Checkable toggle for an edge group's auto-hide mode. `setAutoHide` writes a
 * per-group override of the global `autoHideEdgeGroups` option and the auto-hide
 * controller reconciles the group's chrome live, so a single edge can be flipped
 * between a pinnable tool window and a static docked panel while the dock runs.
 *
 * One toggling item rather than an on/off pair: every edge group here starts
 * auto-hiding, so in a pair the ticked row is the one you'd reach for first and
 * clicking it would do nothing.
 */
const EdgeAutoHideMenuItem = ({
    group,
    close,
}: IContextMenuItemComponentProps) => {
    const autoHide = group.api.isAutoHide();

    return (
        <div
            className="dv-context-menu-item"
            onClick={() => {
                group.api.setAutoHide(!autoHide);
                if (autoHide) {
                    // Turning it off: nothing expands a collapsed edge group
                    // once auto-hide is gone (the strip's click-to-peek goes
                    // with it and the sash is locked at the collapsed size), so
                    // open it here rather than leave a dead strip.
                    group.api.expand();
                }
                close();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
            Auto-hide edge
            {/* Kept mounted (not conditionally rendered) so the reserved space
                stops the menu width changing as the tick comes and goes. */}
            <span
                className="material-symbols-outlined"
                style={{
                    fontSize: '14px',
                    marginLeft: 'auto',
                    visibility: autoHide ? 'visible' : 'hidden',
                }}
            >
                check
            </span>
        </div>
    );
};

const colors = [
    'rgba(255,0,0,0.2)',
    'rgba(0,255,0,0.2)',
    'rgba(0,0,255,0.2)',
    'rgba(255,255,0,0.2)',
    'rgba(0,255,255,0.2)',
    'rgba(255,0,255,0.2)',
];
let count = 0;

const WatermarkComponent = () => {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: 'rgba(255,255,255,0.55)',
                fontFamily: 'monospace',
                pointerEvents: 'none',
            }}
        >
            <span
                className="material-symbols-outlined"
                style={{ fontSize: 32, opacity: 0.7 }}
            >
                dashboard
            </span>
            <div style={{ fontSize: 13 }}>Custom watermark</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
                Drag a tab here or add a panel
            </div>
        </div>
    );
};

const GroupDragGhost = (props: IDockviewGroupDragGhostProps) => {
    const count = props.group.panels.length;
    const title = props.group.activePanel?.title ?? 'Group';
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(33, 150, 243, 0.92)',
                color: 'white',
                font: '11px/1 system-ui, sans-serif',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            }}
        >
            <span style={{ fontWeight: 600 }}>{title}</span>
            <span
                style={{
                    padding: '1px 6px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.25)',
                }}
            >
                +{Math.max(0, count - 1)} more
            </span>
        </div>
    );
};

export const ThemeContext = React.createContext<DockviewTheme | undefined>(
    undefined
);

export interface AdvaptiveViewDesktopProp {
    initialTheme?: DockviewTheme;
}

const AdvaptiveViewDesktopContent = (props: SandboxManagerRenderProps) => {
    const registeredLayoutProfiles = useSandboxManagerSelector(
        (snapshot) => snapshot.context.layoutProfiles
    );
    const selectedLayoutProfileId = useSandboxManagerSelector(
        (snapshot) => snapshot.context.selectedLayoutProfileId
    );
    const layoutRevision = useSandboxManagerSelector(
        (snapshot) => snapshot.context.layoutRevision
    );
    const profilesRegistered = registeredLayoutProfiles === layoutProfiles;
    const selectedLayoutData = registeredLayoutProfiles.find(
        (profile) => profile.id === selectedLayoutProfileId
    )?.data;

    const [logLines, setLogLines] = React.useState<
        { text: string; timestamp?: Date; backgroundColor?: string }[]
    >([]);

    const [panels, setPanels] = React.useState<string[]>([]);
    const [groups, setGroups] = React.useState<string[]>([]);
    const [api, setApi] = React.useState<DockviewApi>();
    const [layoutReady, setLayoutReady] = React.useState(false);

    const [activePanel, setActivePanel] = React.useState<string>();
    const [activeGroup, setActiveGroup] = React.useState<string>();

    const [pending, setPending] = React.useState<
        { text: string; timestamp?: Date }[]
    >([]);

    const addLogLine = (message: string) => {
        setPending((line) => [
            { text: message, timestamp: new Date() },
            ...line,
        ]);
    };

    React.useLayoutEffect(() => {
        if (pending.length === 0) {
            return;
        }
        const color = colors[count++ % colors.length];
        setLogLines((lines) => [
            ...pending.map((_) => ({ ..._, backgroundColor: color })),
            ...lines,
        ]);
        setPending([]);
    }, [pending]);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        // Reset tracked state for the new api instance to prevent stale IDs
        // accumulating across remounts (e.g. when toggling shell mode).
        setPanels([]);
        setGroups([]);
        setActivePanel(undefined);
        setActiveGroup(undefined);

        const disposables = [
            api.onDidAddPanel((event) => {
                setPanels((_) => [..._, event.id]);
                addLogLine(`Panel Added ${event.id}`);
            }),
            api.onDidActivePanelChange((event) => {
                setActivePanel(event.panel?.id);
                addLogLine(`Panel Activated ${event.panel?.id}`);
            }),
            api.onDidRemovePanel((event) => {
                setPanels((_) => {
                    const next = [..._];
                    next.splice(
                        next.findIndex((x) => x === event.id),
                        1
                    );

                    return next;
                });
                addLogLine(`Panel Removed ${event.id}`);
            }),

            api.onDidAddGroup((event) => {
                setGroups((_) => [..._, event.id]);
                addLogLine(`Group Added ${event.id}`);
            }),

            api.onDidMovePanel((event) => {
                addLogLine(`Panel Moved ${event.panel.id}`);
            }),

            api.onDidMaximizedGroupChange((event) => {
                addLogLine(
                    `Group Maximized Changed ${event.group.api.id} [${event.isMaximized}]`
                );
            }),

            api.onDidRemoveGroup((event) => {
                setGroups((_) => {
                    const next = [..._];
                    next.splice(
                        next.findIndex((x) => x === event.id),
                        1
                    );

                    return next;
                });
                addLogLine(`Group Removed ${event.id}`);
            }),

            api.onDidActiveGroupChange((event) => {
                setActiveGroup(event?.id);
                addLogLine(`Group Activated ${event?.id}`);
            }),
        ];

        return () => {
            disposables.forEach((disposable) => disposable.dispose());
        };
    }, [api]);

    React.useEffect(() => {
        if (!api || !profilesRegistered) {
            return;
        }

        if (selectedLayoutData === undefined) {
            loadDockviewLayout(api);
        } else {
            loadDockviewLayout(api, selectedLayoutData);
        }
        setLayoutReady(true);
    }, [api, layoutRevision, profilesRegistered, selectedLayoutData]);

    const onReady = (event: DockviewReadyEvent) => {
        setupEdgeGroups(event.api);
        setApi(event.api);
    };

    // Signal the host once the layout is loaded and the dock becomes visible,
    // so a loading overlay can fade out at the right moment rather than while
    // the grid is still hidden.
    const hasSignalledReady = React.useRef(false);
    React.useEffect(() => {
        if (layoutReady && !hasSignalledReady.current) {
            hasSignalledReady.current = true;
            props.onReady?.();
        }
    }, [layoutReady, props]);

    const effectiveTheme = props.theme ?? themeAbyss;

    const sandboxColors = React.useMemo(
        () =>
            effectiveTheme.colorScheme === 'light' ? SANDBOX_LIGHT_COLORS : SANDBOX_DARK_COLORS,
        [effectiveTheme]
    );

    // Briefly enable colour transitions when the light/dark scheme flips, so the
    // dock crossfades between modes instead of hard-cutting. Scoped to the
    // switch moment (a temporary class) so it never interferes with dragging,
    // resizing or tab changes, and skipped under reduced-motion.
    const [themeAnimating, setThemeAnimating] = React.useState(false);
    const prevScheme = React.useRef(effectiveTheme.colorScheme);
    React.useEffect(() => {
        if (prevScheme.current === effectiveTheme.colorScheme) {
            return;
        }
        prevScheme.current = effectiveTheme.colorScheme;
        if (
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }
        setThemeAnimating(true);
        const handle = window.setTimeout(() => setThemeAnimating(false), 350);
        return () => window.clearTimeout(handle);
    }, [effectiveTheme.colorScheme]);

    const [tabOverflowMode, setTabOverflowMode] =
        React.useState<TabOverflowMode>('dropdown');

    // `'wrap'` needs the MultiRowTabsModule, which the `dockview-enterprise`
    // import above registers. Memoized so the prop only reaches `updateOptions`
    // when the mode actually changes.
    const overflow = React.useMemo(
        () => ({ mode: tabOverflowMode, mru: false, search: true }),
        [tabOverflowMode]
    );

    const getTabContextMenuItems = React.useCallback(
        ({ panel, group }: GetTabContextMenuItemsParams) => {
            const items: (
                | 'close'
                | 'closeOthers'
                | 'closeAll'
                | 'closeLeft'
                | 'closeRight'
                | 'maximize'
                | 'separator'
                | 'pin'
                | {
                      component: React.FC<IContextMenuItemComponentProps>;
                      componentProps?: object;
                  }
                | { label: string; action: () => void }
            )[] = [
                // No 'pin' here: `pinnedTabs.enabled` makes the context menu
                // module inject Pin/Unpin at the top of the list already.
                'separator',
                'close',
                'closeOthers',
                'closeAll',
                'closeLeft',
                'closeRight',
                'separator',
                'maximize',
                'separator',
                // Switches `overflow.mode` between the single-row strip + chevron
                // dropdown and multi-row wrapping tabs.
                ...(['dropdown', 'wrap'] as TabOverflowMode[]).map((mode) => ({
                    component: TabModeMenuItem,
                    componentProps: {
                        mode,
                        active: tabOverflowMode === mode,
                        onSelect: setTabOverflowMode,
                    } satisfies TabModeMenuItemProps,
                })),
                'separator',
                ...(group.api.location.type === 'edge'
                    ? // An edge group can't float or pop out, but it can switch
                      // between a pinnable tool window and a static docked
                      // panel, so that toggle takes the slot instead.
                      [{ component: EdgeAutoHideMenuItem }]
                    : // Float / popout are shown here as custom component items
                      // (with icons); the `'float'` and `'popout'` built-in
                      // shortcuts do the same thing without custom rendering.
                      [
                          { component: FloatMenuItem },
                          { component: PopoutMenuItem },
                      ]),
            ];

            if (api) {
                const groupId = group.id;
                const panelId = panel.id;
                const tabGroup = api.getTabGroupForPanel({ groupId, panelId });
                const allTabGroups = api.getTabGroups({ groupId });
                const otherTabGroups = allTabGroups.filter(
                    (tg) => tg.id !== tabGroup?.id
                );

                items.push('separator');

                if (tabGroup) {
                    items.push({
                        label: `Remove from "${tabGroup.label || tabGroup.id}"`,
                        action: () =>
                            api.removePanelFromTabGroup({ groupId, panelId }),
                    });
                }

                for (const tg of otherTabGroups) {
                    items.push({
                        label: `Add to "${tg.label || tg.id}"`,
                        action: () =>
                            api.addPanelToTabGroup({
                                groupId,
                                tabGroupId: tg.id,
                                panelId,
                            }),
                    });
                }

                items.push({
                    label: 'Add to new group',
                    action: () => {
                        const label = window.prompt('Group name:') || '';
                        const colors: any = DEFAULT_TAB_GROUP_COLORS;
                        const color =
                            colors[Math.floor(Math.random() * colors.length)]
                                .id;
                        const newGroup = api.createTabGroup({
                            groupId,
                            label,
                            color,
                        });
                        api.addPanelToTabGroup({
                            groupId,
                            tabGroupId: newGroup.id,
                            panelId,
                        });
                    },
                });
            }

            return items;
        },
        [api, tabOverflowMode]
    );

    const getTabGroupChipContextMenuItems = React.useCallback(
        ({ group, tabGroup }: GetTabGroupChipContextMenuItemsParams) => {
            const items: (
                | 'colorPicker'
                | 'rename'
                | 'collapse'
                | 'close'
                | 'separator'
                | { label: string; action: () => void }
            )[] = ['rename', 'colorPicker', 'collapse', 'close'];

            if (api) {
                // Float / popout operate on the whole containing group, so they
                // stay custom items. The built-in chip shortcuts are scoped to
                // the tab group (`'collapse'` / `'close'`, used above).
                items.push(
                    'separator',
                    {
                        label: 'Float group',
                        action: () => api.addFloatingGroup(group),
                    },
                    {
                        label: 'Popout group',
                        action: () => {
                            void api.addPopoutGroup(group);
                        },
                    },
                    'separator',
                    {
                        label: 'Dissolve group',
                        action: () =>
                            api.dissolveTabGroup({
                                groupId: group.id,
                                tabGroupId: tabGroup.id,
                            }),
                    }
                );
            }

            return items;
        },
        [api]
    );

    const [watermark, setWatermark] = React.useState<boolean>(false);
    const [customGhost, setCustomGhost] = React.useState<boolean>(false);
    const [dndCompass, setDndCompass] = React.useState<boolean>(false);
    const [smartGuides, setSmartGuides] = React.useState<boolean>(true);

    const [gapCheck, setGapCheck] = React.useState<boolean>(false);

    const css = React.useMemo(() => {
        if (!gapCheck) {
            return {};
        }

        return {
            '--dv-group-gap-size': '0.5rem',
            '--demo-border': '5px dashed purple',
        } as React.CSSProperties;
    }, [gapCheck]);

    const [showLogs, setShowLogs] = React.useState<boolean>(false);
    const [debug, setDebug] = React.useState<boolean>(false);
    return (
        <div
            className={`sandbox${
                effectiveTheme.colorScheme === 'light'
                    ? ' sandbox--light'
                    : ''
            }${themeAnimating ? ' dv-theme-animating' : ''}`}
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                backgroundColor:
                    effectiveTheme.colorScheme === 'light'
                        ? 'rgba(0,0,0,0.03)'
                        : 'rgba(0,0,50,0.25)',
                borderRadius: '8px',
                position: 'relative',
                ...css,
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    height: 0,
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        visibility: layoutReady ? 'visible' : 'hidden',
                    }}
                >
                    <SandboxColorsContext.Provider value={sandboxColors}>
                        <MarketProvider>
                            <ApiContext.Provider value={api}>
                                <DebugContext.Provider value={debug}>
                                    <ThemeContext.Provider
                                        value={effectiveTheme}
                                    >
                                        <DockviewReact
                                            components={components}
                                            defaultTabComponent={
                                                headerComponents.default
                                            }
                                            rightHeaderActionsComponent={
                                                RightControls
                                            }
                                            leftHeaderActionsComponent={
                                                LeftControls
                                            }
                                            prefixHeaderActionsComponent={
                                                PrefixHeaderControls
                                            }
                                            watermarkComponent={
                                                watermark
                                                    ? WatermarkComponent
                                                    : undefined
                                            }
                                            groupDragGhostComponent={
                                                customGhost
                                                    ? GroupDragGhost
                                                    : undefined
                                            }
                                            onReady={onReady}
                                            keyboardNavigation
                                            theme={effectiveTheme}
                                            autoHideEdgeGroups
                                            dockToEdgeGroups
                                            pinnedTabs={{ enabled: true }}
                                            overflow={overflow}
                                            floatingGroupDragHandle="titlebar"
                                            dndCompass={dndCompass}
                                            smartGuides={
                                                smartGuides
                                                    ? { snapDistance: 8 }
                                                    : undefined
                                            }
                                            getTabContextMenuItems={
                                                getTabContextMenuItems
                                            }
                                            getTabGroupChipContextMenuItems={
                                                getTabGroupChipContextMenuItems
                                            }
                                        />
                                    </ThemeContext.Provider>
                                </DebugContext.Provider>
                            </ApiContext.Provider>
                        </MarketProvider>
                    </SandboxColorsContext.Provider>
                </div>

                {showLogs && (
                    <div
                        style={{
                            width: '400px',
                            backgroundColor:
                                effectiveTheme.colorScheme === 'light'
                                    ? '#f6f8fa'
                                    : 'black',
                            color:
                                effectiveTheme.colorScheme === 'light'
                                    ? '#1f2328'
                                    : 'white',
                            overflow: 'hidden',
                            fontFamily: 'monospace',
                            marginLeft: '10px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ flexGrow: 1, overflow: 'auto' }}>
                            {logLines.map((line, i) => {
                                return (
                                    <div
                                        style={{
                                            height: '30px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor:
                                                line.backgroundColor,
                                        }}
                                        key={i}
                                    >
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                minWidth: '20px',
                                                maxWidth: '20px',
                                                color: 'gray',
                                                borderRight: '1px solid gray',
                                                marginRight: '4px',
                                                paddingLeft: '4px',
                                                height: '100%',
                                            }}
                                        >
                                            {logLines.length - i}
                                        </span>
                                        <span>
                                            {line.timestamp && (
                                                <span
                                                    style={{
                                                        fontSize: '0.7em',
                                                        padding: '0px 2px',
                                                    }}
                                                >
                                                    {line.timestamp
                                                        .toISOString()
                                                        .substring(11, 23)}
                                                </span>
                                            )}
                                            <span>{line.text}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                padding: '4px',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button onClick={() => setLogLines([])}>
                                Clear
                            </button>
                        </div>
                    </div>
                )}
                {props.renderControls?.({
                    api,
                    panels,
                    groups,
                    activePanel,
                    activeGroup,
                    hasCustomWatermark: watermark,
                    toggleCustomWatermark: () => setWatermark(!watermark),
                    hasCustomGhost: customGhost,
                    toggleCustomGhost: () => setCustomGhost(!customGhost),
                    dndCompass,
                    onToggleDndCompass: () => setDndCompass(!dndCompass),
                    smartGuides,
                    onToggleSmartGuides: () =>
                        setSmartGuides(!smartGuides),
                    debug,
                    onToggleDebug: () => setDebug(!debug),
                    showLogs,
                    onToggleShowLogs: () => setShowLogs(!showLogs),
                    onClearLogs: () => setLogLines([]),
                })}
            </div>
        </div>
    );
};

const AdvaptiveViewDesktop = ({ initialTheme }: AdvaptiveViewDesktopProp) => (
    <SandboxRenderer
        initialTheme={initialTheme}
        layoutProfiles={layoutProfiles}
        instanceManagerInput={instanceProfiles[0]}
    >
        {(props) => <AdvaptiveViewDesktopContent {...props} />}
    </SandboxRenderer>
);

export default AdvaptiveViewDesktop;
