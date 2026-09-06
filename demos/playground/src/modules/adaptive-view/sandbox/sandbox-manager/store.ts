import { createStore } from '@xstate/store';
import {
    DockviewTheme,
    themeGithubLightSpaced,
} from '#adaptive-view/react';
import {
    getInitialStateFromLayoutManagerTheme,
    LAYOUT_MANAGER_BUILTIN_THEMES,
    LayoutManagerThemeState,
    LayoutManagerThemeCssOverrides,
} from './layoutManagerTheme';

export type SandboxVariant = 'desktop' | 'mobile';

export interface SandboxThemeOption {
    label: string;
    theme: DockviewTheme;
}

export interface SandboxLayoutProfile {
    id: string;
    title: string;
    data: unknown;
}

export const sandboxThemes: readonly SandboxThemeOption[] =
    LAYOUT_MANAGER_BUILTIN_THEMES;

interface SandboxManagerContext {
    variant: SandboxVariant;
    theme: DockviewTheme;
    layoutManagerTheme: LayoutManagerThemeState;
    layoutManagerOpen: boolean;
    ready: boolean;
    layoutProfiles: readonly SandboxLayoutProfile[];
    selectedLayoutProfileId: string | null;
    layoutRevision: number;
}

const initialContext: SandboxManagerContext = {
    variant: 'desktop',
    theme: themeGithubLightSpaced,
    layoutManagerTheme: getInitialStateFromLayoutManagerTheme(
        themeGithubLightSpaced
    ),
    layoutManagerOpen: false,
    ready: false,
    layoutProfiles: [],
    selectedLayoutProfileId: null,
    layoutRevision: 0,
};

export function createSandboxManagerStore() {
    return createStore({
        context: initialContext,
        on: {
            setVariant: (
                context,
                event: { variant: SandboxVariant }
            ): SandboxManagerContext => ({
                ...context,
                variant: event.variant,
                layoutManagerOpen:
                    event.variant === 'desktop' && context.layoutManagerOpen,
            }),
            prepareVariant: (
                context,
                event: { variant: SandboxVariant }
            ): SandboxManagerContext => ({
                ...context,
                variant: event.variant,
                layoutManagerOpen:
                    event.variant === 'desktop' && context.layoutManagerOpen,
                ready: false,
            }),
            selectTheme: (
                context,
                event: { themeName: string }
            ): SandboxManagerContext => ({
                ...context,
                theme:
                    sandboxThemes.find(
                        ({ theme }) => theme.name === event.themeName
                    )?.theme ?? context.theme,
                layoutManagerTheme: getInitialStateFromLayoutManagerTheme(
                    sandboxThemes.find(
                        ({ theme }) => theme.name === event.themeName
                    )?.theme ?? context.theme
                ),
            }),
            updateLayoutManagerTheme: (
                context,
                event: { patch: Partial<LayoutManagerThemeState> }
            ): SandboxManagerContext => ({
                ...context,
                layoutManagerTheme: {
                    ...context.layoutManagerTheme,
                    ...event.patch,
                },
            }),
            updateThemeCss: (
                context,
                event: { patch: Partial<LayoutManagerThemeCssOverrides> }
            ): SandboxManagerContext => {
                const cssOverrides = {
                    ...context.layoutManagerTheme.cssOverrides,
                };

                for (const [key, value] of Object.entries(event.patch)) {
                    if (value === undefined || value === '') {
                        delete cssOverrides[
                            key as keyof LayoutManagerThemeCssOverrides
                        ];
                    } else {
                        cssOverrides[key as keyof LayoutManagerThemeCssOverrides] = value;
                    }
                }

                return {
                    ...context,
                    layoutManagerTheme: {
                        ...context.layoutManagerTheme,
                        cssOverrides,
                    },
                };
            },
            resetLayoutManagerTheme: (context): SandboxManagerContext => ({
                ...context,
                layoutManagerTheme: getInitialStateFromLayoutManagerTheme(
                    context.theme
                ),
            }),
            setLayoutProfiles: (
                context,
                event: { profiles: readonly SandboxLayoutProfile[] }
            ): SandboxManagerContext => ({
                ...context,
                layoutProfiles: event.profiles,
            }),
            selectLayoutProfile: (
                context,
                event: { profileId: string | null }
            ): SandboxManagerContext => ({
                ...context,
                selectedLayoutProfileId: event.profileId,
                layoutRevision: context.layoutRevision + 1,
            }),
            toggleLayoutManager: (context): SandboxManagerContext => ({
                ...context,
                layoutManagerOpen: !context.layoutManagerOpen,
            }),
            closeLayoutManager: (context): SandboxManagerContext => ({
                ...context,
                layoutManagerOpen: false,
            }),
            markReady: (context): SandboxManagerContext => ({
                ...context,
                ready: true,
            }),
        },
    });
}

export type SandboxManagerStore = ReturnType<
    typeof createSandboxManagerStore
>;
