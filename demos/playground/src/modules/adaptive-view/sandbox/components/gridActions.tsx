import { DockviewApi, EdgeGroupPosition } from '#adaptive-view/react';
import * as React from 'react';
import { nextId } from '../sandbox-manager/utils';
import {
    useSandboxManagerSelector,
    useSandboxManagerStore,
} from '../sandbox-manager/provider';
import type { SandboxLayoutProfile } from '../sandbox-manager/store';
import { LM } from '../sandbox-manager/layoutManagerTheme';
import { Btn, IconBtn } from '../sandbox-manager/layoutManagerKit';

const Row = (props: {
    label?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 0',
            minHeight: 30,
            ...props.style,
        }}
    >
        {props.label && (
            <span
                style={{
                    flex: 1,
                    fontSize: 12,
                    color: LM.text,
                    fontFamily: LM.ui,
                }}
            >
                {props.label}
            </span>
        )}
        {props.children}
    </div>
);

const EDGE_POSITIONS: EdgeGroupPosition[] = ['top', 'bottom', 'left', 'right'];

const readEdgeState = (
    api: DockviewApi
): Partial<Record<EdgeGroupPosition, boolean>> =>
    Object.fromEntries(
        EDGE_POSITIONS.map((pos) => [pos, api.getEdgeGroup(pos) !== undefined])
    );

const EdgeGroupToggles = (props: { api: DockviewApi }) => {
    const [active, setActive] = React.useState<
        Partial<Record<EdgeGroupPosition, boolean>>
    >(() => readEdgeState(props.api));

    React.useEffect(() => {
        const sync = () => setActive(readEdgeState(props.api));
        sync();
        const disposable = props.api.onDidLayoutChange(sync);
        return () => disposable.dispose();
    }, [props.api]);

    const toggle = (position: EdgeGroupPosition) => {
        if (active[position]) {
            props.api.removeEdgeGroup(position);
        } else {
            const groupApi = props.api.addEdgeGroup(position, {
                id: `edge-${position}`,
                initialSize: 200,
                minimumSize: 100,
            });
            props.api.addPanel({
                id: `edge-panel-${position}-${Date.now()}`,
                component: 'fixedPlaceholder',
                title: `Tab ${nextId()}`,
                position: { referenceGroup: groupApi.id },
                params: { label: position, position },
            });
        }
    };

    return (
        <Row label="Edge groups">
            <div
                style={{
                    display: 'flex',
                    background: LM.surface,
                    borderRadius: LM.radiusSm,
                    border: `1px solid ${LM.border}`,
                    padding: 3,
                    gap: 3,
                }}
            >
                {EDGE_POSITIONS.map((pos) => (
                    <button
                        key={pos}
                        onClick={() => toggle(pos)}
                        style={{
                            padding: '3px 9px',
                            fontSize: 11,
                            fontWeight: active[pos] ? 600 : 500,
                            fontFamily: LM.ui,
                            border: 'none',
                            borderRadius: 5,
                            cursor: 'pointer',
                            background: active[pos] ? LM.accent : 'transparent',
                            color: active[pos] ? LM.accentContrast : LM.muted,
                            boxShadow: active[pos] ? LM.glow : 'none',
                            transition: 'background 0.12s, color 0.12s',
                        }}
                    >
                        {pos}
                    </button>
                ))}
            </div>
        </Row>
    );
};

import { createRoot } from 'react-dom/client';
import { PanelBuilder } from './panelBuilder';

let mount: HTMLElement | null = null;

const getPopoverMount = (): HTMLElement => {
    if (mount?.isConnected) {
        return mount;
    }

    mount = document.querySelector<HTMLElement>('.popover-anchor');

    if (!mount) {
        mount = document.createElement('div');
        mount.className = 'popover-anchor';
        document.body.prepend(mount);
    }

    return mount;
};

const PopoverComponent = (props: {
    close: () => void;
    component: React.FC<{ close: () => void }>;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handler = (ev: MouseEvent) => {
            let target = ev.target as HTMLElement;

            while (target.parentElement) {
                if (target === ref.current) {
                    return;
                }
                target = target.parentElement;
            }

            props.close();
        };

        window.addEventListener('mousedown', handler);

        return () => {
            window.removeEventListener('mousedown', handler);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 9999,
                height: '100%',
                width: '100%',
            }}
        >
            <div
                ref={ref}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    background: LM.bg,
                    border: `1px solid ${LM.border}`,
                    borderRadius: LM.radius,
                    color: LM.text,
                    fontFamily: LM.ui,
                    padding: 16,
                    boxShadow: LM.shadowLg,
                }}
            >
                <props.component close={props.close} />
            </div>
        </div>
    );
};

function usePopover() {
    return {
        open: (Component: React.FC<{ close: () => void }>) => {
            const el = document.createElement('div');
            getPopoverMount().appendChild(el);
            const root = createRoot(el);

            root.render(
                <PopoverComponent
                    component={Component}
                    close={() => {
                        root.unmount();
                        el.remove();
                    }}
                />
            );
        },
    };
}

export const GridActions = (props: { api?: DockviewApi }) => {
    const managerStore = useSandboxManagerStore();
    const layoutProfiles = useSandboxManagerSelector(
        (snapshot) => snapshot.context.layoutProfiles
    );
    const selectedLayoutProfileId = useSandboxManagerSelector(
        (snapshot) => snapshot.context.selectedLayoutProfileId
    );
    const [loadMenuOpen, setLoadMenuOpen] = React.useState(false);

    const onClear = () => {
        props.api?.clear();
    };

    const onLoad = (profile: SandboxLayoutProfile) => {
        if (!props.api) {
            return;
        }

        setLoadMenuOpen(false);
        managerStore.trigger.selectLayoutProfile({ profileId: profile.id });
    };

    const onSave = () => {
        if (props.api) {
            const state = props.api.toJSON();
            console.log(state);
            localStorage.setItem('dv-demo-state-v9', JSON.stringify(state));
        }
    };

    const onReset = () => {
        if (props.api) {
            localStorage.removeItem('dv-demo-state-v9');
            try {
                managerStore.trigger.selectLayoutProfile({ profileId: null });
            } catch {}
        }
    };

    const popover = usePopover();

    const onAddPanel = (options?: { advanced?: boolean; nested?: boolean }) => {
        if (options?.advanced) {
            popover.open(({ close }) => {
                return <PanelBuilder api={props.api!} done={close} />;
            });
        } else {
            props.api?.addPanel({
                id: `id_${Date.now().toString()}`,
                component: options?.nested ? 'nested' : 'default',
                title: `Tab ${nextId()}`,
                renderer: 'always',
            });
        }
    };

    const onAddGroup = () => {
        props.api?.addGroup();
    };

    return (
        <div style={{ padding: '2px 0' }}>
            <Row>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <Btn
                            onClick={() => setLoadMenuOpen((open) => !open)}
                            icon="folder_open"
                            title="Choose a layout profile"
                        >
                            Load
                        </Btn>
                        {loadMenuOpen && (
                            <div
                                role="menu"
                                aria-label="Layout profiles"
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 6px)',
                                    left: 0,
                                    zIndex: 100,
                                    minWidth: 170,
                                    padding: 5,
                                    border: `1px solid ${LM.border}`,
                                    borderRadius: LM.radiusSm,
                                    background: LM.bg,
                                    boxShadow: LM.shadowMd,
                                }}
                            >
                                {layoutProfiles.map((profile) => (
                                    <button
                                        key={profile.id}
                                        type="button"
                                        role="menuitem"
                                        aria-current={
                                            profile.id ===
                                            selectedLayoutProfileId
                                                ? 'true'
                                                : undefined
                                        }
                                        onClick={() => onLoad(profile)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '7px 9px',
                                            border: 0,
                                            borderRadius: 5,
                                            background: 'transparent',
                                            color: LM.text,
                                            cursor: 'pointer',
                                            fontFamily: LM.ui,
                                            fontSize: 12,
                                            textAlign: 'left',
                                        }}
                                    >
                                        {profile.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <Btn onClick={onSave} icon="save">
                        Save
                    </Btn>
                    <Btn onClick={onClear} icon="clear_all">
                        Clear
                    </Btn>
                    <Btn onClick={onReset} icon="restart_alt">
                        Reset
                    </Btn>
                </div>
            </Row>
            {props.api && <EdgeGroupToggles api={props.api} />}
            <Row>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <Btn onClick={() => onAddPanel()} icon="add">
                        Add Panel
                    </Btn>
                    <IconBtn
                        onClick={() => onAddPanel({ advanced: true })}
                        icon="tune"
                        title="Advanced panel options"
                    />
                    <Btn
                        onClick={() => onAddPanel({ nested: true })}
                        icon="dashboard"
                    >
                        Nested
                    </Btn>
                    <Btn onClick={onAddGroup} icon="add_box">
                        Add Group
                    </Btn>
                </div>
            </Row>
        </div>
    );
};
