import { createStore } from '@xstate/store';
import {
    DockviewTheme,
    themeAbyss,
    themeAbyssSpaced,
    themeCatppuccinMocha,
    themeCatppuccinMochaSpaced,
    themeDark,
    themeDracula,
    themeGithubDark,
    themeGithubDarkSpaced,
    themeGithubLight,
    themeGithubLightSpaced,
    themeLight,
    themeLightSpaced,
    themeMonokai,
    themeNord,
    themeNordSpaced,
    themeSolarizedLight,
    themeSolarizedLightSpaced,
    themeVisualStudio,
} from '#adaptive-view/react';
import {
    getInitialStateFromTheme,
    ThemeBuilderState,
    ThemeCssOverrides,
} from './themeBuilder';

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

export const sandboxThemes: readonly SandboxThemeOption[] = [
    { label: 'Dark', theme: themeDark },
    { label: 'Light', theme: themeLight },
    { label: 'Visual Studio', theme: themeVisualStudio },
    { label: 'Abyss', theme: themeAbyss },
    { label: 'Dracula', theme: themeDracula },
    { label: 'Light Spaced', theme: themeLightSpaced },
    { label: 'Abyss Spaced', theme: themeAbyssSpaced },
    { label: 'Nord', theme: themeNord },
    { label: 'Nord Spaced', theme: themeNordSpaced },
    { label: 'Catppuccin Mocha', theme: themeCatppuccinMocha },
    {
        label: 'Catppuccin Mocha Spaced',
        theme: themeCatppuccinMochaSpaced,
    },
    { label: 'Monokai', theme: themeMonokai },
    { label: 'Solarized Light', theme: themeSolarizedLight },
    {
        label: 'Solarized Light Spaced',
        theme: themeSolarizedLightSpaced,
    },
    { label: 'GitHub Dark', theme: themeGithubDark },
    { label: 'GitHub Dark Spaced', theme: themeGithubDarkSpaced },
    { label: 'GitHub Light', theme: themeGithubLight },
    { label: 'GitHub Light Spaced', theme: themeGithubLightSpaced },
];

interface SandboxManagerContext {
    variant: SandboxVariant;
    theme: DockviewTheme;
    themeBuilder: ThemeBuilderState;
    controlsOpen: boolean;
    ready: boolean;
    layoutProfiles: readonly SandboxLayoutProfile[];
    selectedLayoutProfileId: string | null;
    layoutRevision: number;
}

const initialContext: SandboxManagerContext = {
    variant: 'desktop',
    theme: themeGithubLightSpaced,
    themeBuilder: getInitialStateFromTheme(themeGithubLightSpaced),
    controlsOpen: false,
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
                controlsOpen:
                    event.variant === 'desktop' && context.controlsOpen,
            }),
            prepareVariant: (
                context,
                event: { variant: SandboxVariant }
            ): SandboxManagerContext => ({
                ...context,
                variant: event.variant,
                controlsOpen:
                    event.variant === 'desktop' && context.controlsOpen,
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
                themeBuilder: getInitialStateFromTheme(
                    sandboxThemes.find(
                        ({ theme }) => theme.name === event.themeName
                    )?.theme ?? context.theme
                ),
            }),
            updateThemeBuilder: (
                context,
                event: { patch: Partial<ThemeBuilderState> }
            ): SandboxManagerContext => ({
                ...context,
                themeBuilder: { ...context.themeBuilder, ...event.patch },
            }),
            updateThemeCss: (
                context,
                event: { patch: Partial<ThemeCssOverrides> }
            ): SandboxManagerContext => {
                const cssOverrides = { ...context.themeBuilder.cssOverrides };

                for (const [key, value] of Object.entries(event.patch)) {
                    if (value === undefined || value === '') {
                        delete cssOverrides[key as keyof ThemeCssOverrides];
                    } else {
                        cssOverrides[key as keyof ThemeCssOverrides] = value;
                    }
                }

                return {
                    ...context,
                    themeBuilder: { ...context.themeBuilder, cssOverrides },
                };
            },
            resetThemeBuilder: (context): SandboxManagerContext => ({
                ...context,
                themeBuilder: getInitialStateFromTheme(context.theme),
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
            toggleControls: (context): SandboxManagerContext => ({
                ...context,
                controlsOpen: !context.controlsOpen,
            }),
            closeControls: (context): SandboxManagerContext => ({
                ...context,
                controlsOpen: false,
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
