'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
    ControlsContent,
    type ControlsContentProps,
} from '../components/settingsModal';
import {
    useSandboxManagerSelector,
    useSandboxManagerStore,
} from './provider';
import { sandboxThemes } from './store';
import { buildEffectiveLayoutManagerTheme } from './layoutManagerTheme';
import { LayoutManager } from './layoutManager';
import './styles/dockview.css';
import './styles/manager.css';
import './styles/sandbox.css';

export interface SandboxManagerRenderProps {
    theme: ReturnType<typeof buildEffectiveLayoutManagerTheme>;
    onReady: () => void;
    renderControls: (controls: ControlsContentProps) => React.ReactNode;
}

export interface SandboxManagerProps {
    children: (props: SandboxManagerRenderProps) => React.ReactNode;
}

export default function SandboxManager({ children }: SandboxManagerProps) {
    const store = useSandboxManagerStore();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        theme,
        layoutManagerTheme,
        layoutManagerOpen,
        ready,
        selectedLayoutProfileId,
    } = useSandboxManagerSelector((snapshot) => snapshot.context);
    const syncingLayoutFromUrl = React.useRef(false);
    const frameRef = React.useRef<HTMLElement>(null);
    const previousCssOverrideKeys = React.useRef<string[]>([]);
    const effectiveTheme = React.useMemo(
        () => buildEffectiveLayoutManagerTheme(theme, layoutManagerTheme),
        [theme, layoutManagerTheme]
    );
    const urlLayoutProfileId = searchParams.get('layout');

    React.useEffect(() => {
        const currentProfileId =
            store.getSnapshot().context.selectedLayoutProfileId;
        if (currentProfileId !== urlLayoutProfileId) {
            syncingLayoutFromUrl.current = true;
            store.trigger.selectLayoutProfile({
                profileId: urlLayoutProfileId,
            });
        }
    }, [store, urlLayoutProfileId]);

    React.useEffect(() => {
        if (syncingLayoutFromUrl.current) {
            if (selectedLayoutProfileId === urlLayoutProfileId) {
                syncingLayoutFromUrl.current = false;
            }
            return;
        }

        if (selectedLayoutProfileId === urlLayoutProfileId) {
            return;
        }

        const nextParams = new URLSearchParams(searchParams.toString());
        if (selectedLayoutProfileId) {
            nextParams.set('layout', selectedLayoutProfileId);
        } else {
            nextParams.delete('layout');
        }
        const nextQuery = nextParams.toString();
        router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ''}`);
    }, [
        pathname,
        router,
        searchParams,
        selectedLayoutProfileId,
        urlLayoutProfileId,
    ]);

    React.useEffect(() => {
        const dockviewRoot = frameRef.current?.querySelector<HTMLElement>(
            '[class*="dockview-theme"]'
        );
        if (!dockviewRoot) {
            return;
        }

        for (const key of previousCssOverrideKeys.current) {
            if (!(key in layoutManagerTheme.cssOverrides)) {
                dockviewRoot.style.removeProperty(key);
            }
        }
        for (const [key, value] of Object.entries(
            layoutManagerTheme.cssOverrides
        )) {
            if (value !== undefined) {
                dockviewRoot.style.setProperty(key, value);
            }
        }
        previousCssOverrideKeys.current = Object.keys(
            layoutManagerTheme.cssOverrides
        );
    }, [layoutManagerTheme.cssOverrides, effectiveTheme]);

    const markReady = React.useCallback(() => {
        store.trigger.markReady();
    }, [store]);

    return (
        <main
            className="adaptive-sandbox-manager"
            data-color-scheme={theme.colorScheme ?? 'dark'}
        >
            <header className="adaptive-sandbox-manager__toolbar">
                <div className="adaptive-sandbox-manager__actions">
                    <label>
                        <span>Theme</span>
                        <select
                            value={theme.name}
                            onChange={(event) =>
                                store.trigger.selectTheme({
                                    themeName: event.target.value,
                                })
                            }
                        >
                            {sandboxThemes.map((option) => (
                                <option
                                    key={option.theme.name}
                                    value={option.theme.name}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        type="button"
                        className={layoutManagerOpen ? 'is-active' : ''}
                        aria-pressed={layoutManagerOpen}
                        onClick={() => store.trigger.toggleLayoutManager()}
                    >
                        Controls &amp; Theme
                    </button>
                </div>
            </header>

            <section
                ref={frameRef}
                className="adaptive-sandbox-manager__frame"
            >
                {children({
                    theme: effectiveTheme,
                    onReady: markReady,
                    renderControls: (controls) => (
                        <LayoutManager
                            open={layoutManagerOpen}
                            onClose={() => store.trigger.closeLayoutManager()}
                            state={layoutManagerTheme}
                            onChange={(patch) =>
                                store.trigger.updateLayoutManagerTheme({ patch })
                            }
                            onCssChange={(patch) =>
                                store.trigger.updateThemeCss({ patch })
                            }
                            onReset={() =>
                                store.trigger.resetLayoutManagerTheme()
                            }
                            baseTheme={theme}
                            containerEl={frameRef.current}
                            controls={<ControlsContent {...controls} />}
                        />
                    ),
                })}

                <div
                    className={`adaptive-sandbox-manager__loader${
                        ready ? ' is-ready' : ''
                    }`}
                    role="status"
                    aria-label="Loading adaptive view sandbox"
                    aria-hidden={ready}
                >
                    <span />
                </div>
            </section>
        </main>
    );
}
