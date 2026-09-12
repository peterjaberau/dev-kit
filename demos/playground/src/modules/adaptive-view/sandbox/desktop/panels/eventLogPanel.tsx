import * as React from 'react';
import { useSandboxColors } from '../../sandbox-manager/sandboxTheme';
import { useDesktop } from "../selectors"

type LogEntry = {
    id: number;
    text: string;
    timestamp: Date;
    category: 'panel' | 'group' | 'layout' | 'tab grp';
};

let entryId = 0;

const categoryColor = (cat: LogEntry['category']) => {
    switch (cat) {
        case 'panel':
            return '#60a5fa';
        case 'group':
            return '#a78bfa';
        case 'layout':
            return '#34d399';
        case 'tab grp':
            return '#f472b6';
    }
};

export const EventLogPanel = () => {
  const { dockviewApi } = useDesktop()

  const c = useSandboxColors();

    const [entries, setEntries] = React.useState<LogEntry[]>([]);

    React.useEffect(() => {
      const add = (text: string, category: LogEntry["category"]) => {
        setEntries((prev) =>
          [
            {
              id: entryId++,
              text,
              timestamp: new Date(),
              category,
            },
            ...prev,
          ].slice(0, 500),
        )
      }

      const disposables = [
        dockviewApi.onDidAddPanel((e: any) => add(`Panel added: ${e.id}`, "panel")),
        dockviewApi.onDidRemovePanel((e: any) => add(`Panel removed: ${e.id}`, "panel")),
        dockviewApi.onDidActivePanelChange((e: any) => add(`Active panel: ${e.panel?.id ?? "none"}`, "panel")),
        dockviewApi.onDidMovePanel((e: any) => add(`Panel moved: ${e.panel.id}`, "panel")),
        dockviewApi.onDidAddGroup((e: any) => add(`Group added: ${e.id}`, "group")),
        dockviewApi.onDidRemoveGroup((e: any) => add(`Group removed: ${e.id}`, "group")),
        dockviewApi.onDidActiveGroupChange((e: any) => add(`Active group: ${e?.id ?? "none"}`, "group")),
        dockviewApi.onDidMaximizedGroupChange((e: any) =>
          add(`Group ${e.group.api.id} maximized: ${e.isMaximized}`, "group"),
        ),
        dockviewApi.onDidLayoutChange(() => add("Layout changed", "layout")),
        dockviewApi.onDidCreateTabGroup((e: any) => add(`Tab group created: ${e.tabGroup.id}`, "tab grp")),
        dockviewApi.onDidDestroyTabGroup((e: any) => add(`Tab group destroyed: ${e.tabGroup.id}`, "tab grp")),
        dockviewApi.onDidAddPanelToTabGroup((e: any) =>
          add(`Panel ${e.panelId} → tab group ${e.tabGroup.id}`, "tab grp"),
        ),
        dockviewApi.onDidRemovePanelFromTabGroup((e: any) =>
          add(`Panel ${e.panelId} left tab group ${e.tabGroup.id}`, "tab grp"),
        ),
        dockviewApi.onDidTabGroupChange((e: any) => add(`Tab group changed: ${e.tabGroup.id}`, "tab grp")),
        dockviewApi.onDidTabGroupCollapsedChange((e: any) =>
          add(`Tab group ${e.tabGroup.id} ${e.tabGroup.collapsed ? "collapsed" : "expanded"}`, "tab grp"),
        ),
      ]

      return () => disposables.forEach((d: any) => d.dispose())
    }, [dockviewApi])

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: c.bg,
                fontFamily: 'monospace',
                fontSize: 12,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderBottom: `1px solid ${c.border}`,
                    flexShrink: 0,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                        style={{
                            color: c.textMuted,
                            fontSize: 11,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                        }}
                    >
                        Events
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {(['panel', 'group', 'layout', 'tab grp'] as const).map((cat) => (
                            <span
                                key={cat}
                                style={{
                                    fontSize: 10,
                                    color: categoryColor(cat),
                                    opacity: 0.7,
                                }}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setEntries([])}
                    style={{
                        background: 'none',
                        border: `1px solid ${c.border}`,
                        color: c.textMuted,
                        cursor: 'pointer',
                        padding: '2px 8px',
                        borderRadius: 3,
                        fontSize: 11,
                        fontFamily: 'monospace',
                    }}
                >
                    Clear
                </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
                {entries.length === 0 && (
                    <div
                        style={{
                            padding: '12px 10px',
                            color: c.textFaint,
                            fontSize: 11,
                        }}
                    >
                        Interact with the layout to see events...
                    </div>
                )}
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        style={{
                            display: 'flex',
                            gap: 8,
                            padding: '2px 10px',
                            alignItems: 'baseline',
                        }}
                    >
                        <span
                            style={{
                                color: c.textFaint,
                                fontSize: 10,
                                flexShrink: 0,
                                width: 72,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {entry.timestamp.toISOString().slice(11, 23)}
                        </span>
                        <span
                            style={{
                                color: categoryColor(entry.category),
                                flexShrink: 0,
                                width: 48,
                                fontSize: 10,
                            }}
                        >
                            {entry.category}
                        </span>
                        <span style={{ color: c.text }}>{entry.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
