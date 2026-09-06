'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import AdaptiveViewDesktopSandbox from '../desktop';
import AdvaptiveViewMobileSandbox from '../mobile';
import { ControlsContent } from '../components/settingsModal';
import {
    useSandboxManagerSelector,
    useSandboxManagerStore,
} from './provider';
import { sandboxThemes, SandboxVariant } from './store';
import { buildEffectiveLayoutManagerTheme } from './layoutManagerTheme';
import { LayoutManager } from './layoutManager';
import './styles/dockview.css';
import './styles/manager.css';
import './styles/sandbox.css';

export interface SandboxManagerProps {
    variant: SandboxVariant;
}

export default function SandboxManager({ variant }: SandboxManagerProps) {
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
    const query = searchParams.toString();
    const desktopHref = `/lab/adaptive-view/desktop${query ? `?${query}` : ''}`;
    const mobileHref = `/lab/adaptive-view/mobile${query ? `?${query}` : ''}`;

    React.useEffect(() => {
        store.trigger.setVariant({ variant });
    }, [store, variant]);

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
                <nav
                    className="adaptive-sandbox-manager__variants"
                    aria-label="Sandbox viewport"
                >
                    <Link
                        href={desktopHref}
                        className={variant === 'desktop' ? 'is-active' : ''}
                        aria-current={variant === 'desktop' ? 'page' : undefined}
                        onClick={() =>
                            store.trigger.prepareVariant({ variant: 'desktop' })
                        }
                    >
                        Desktop
                    </Link>
                    <Link
                        href={mobileHref}
                        className={variant === 'mobile' ? 'is-active' : ''}
                        aria-current={variant === 'mobile' ? 'page' : undefined}
                        onClick={() =>
                            store.trigger.prepareVariant({ variant: 'mobile' })
                        }
                    >
                        Mobile
                    </Link>
                </nav>

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

                    {variant === 'desktop' && (
                        <button
                            type="button"
                            className={layoutManagerOpen ? 'is-active' : ''}
                            aria-pressed={layoutManagerOpen}
                            onClick={() => store.trigger.toggleLayoutManager()}
                        >
                            Controls &amp; Theme
                        </button>
                    )}
                </div>
            </header>

            <section
                ref={frameRef}
                className="adaptive-sandbox-manager__frame"
            >
                {variant === 'desktop' ? (
                    <AdaptiveViewDesktopSandbox
                        theme={effectiveTheme}
                        onReady={markReady}
                        renderControls={(controls) => (
                            <LayoutManager
                                open={layoutManagerOpen}
                                onClose={() => store.trigger.closeLayoutManager()}
                                state={layoutManagerTheme}
                                onChange={(patch) =>
                                    store.trigger.updateLayoutManagerTheme({
                                        patch,
                                    })
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
                        )}
                    />
                ) : (
                    <AdvaptiveViewMobileSandbox
                        theme={effectiveTheme}
                        onReady={markReady}
                    />
                )}

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
