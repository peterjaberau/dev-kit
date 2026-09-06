import type { CSSProperties } from 'react';
import {
    TabAnimation,
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

export const LAYOUT_MANAGER_BUILTIN_THEMES: {
    theme: DockviewTheme;
    label: string;
}[] = [
    { theme: themeDark, label: 'Dark' },
    { theme: themeLight, label: 'Light' },
    { theme: themeVisualStudio, label: 'Visual Studio' },
    { theme: themeAbyss, label: 'Abyss' },
    { theme: themeDracula, label: 'Dracula' },
    { theme: themeLightSpaced, label: 'Light Spaced' },
    { theme: themeAbyssSpaced, label: 'Abyss Spaced' },
    { theme: themeNord, label: 'Nord' },
    { theme: themeNordSpaced, label: 'Nord Spaced' },
    { theme: themeCatppuccinMocha, label: 'Catppuccin Mocha' },
    { theme: themeCatppuccinMochaSpaced, label: 'Catppuccin Mocha Spaced' },
    { theme: themeMonokai, label: 'Monokai' },
    { theme: themeSolarizedLight, label: 'Solarized Light' },
    { theme: themeSolarizedLightSpaced, label: 'Solarized Light Spaced' },
    { theme: themeGithubDark, label: 'GitHub Dark' },
    { theme: themeGithubDarkSpaced, label: 'GitHub Dark Spaced' },
    { theme: themeGithubLight, label: 'GitHub Light' },
    { theme: themeGithubLightSpaced, label: 'GitHub Light Spaced' },
];

export interface LayoutManagerThemeCssOverrides {
    '--dv-group-view-background-color'?: string;
    '--dv-tabs-and-actions-container-background-color'?: string;
    '--dv-tabs-and-actions-container-height'?: string;
    '--dv-tabs-and-actions-container-font-size'?: string;
    '--dv-border-radius'?: string;
    '--dv-spacing-padding'?: string;
    '--dv-tab-border-radius'?: string;
    '--dv-sash-border-radius'?: string;
    '--dv-floating-group-border'?: string;
    '--dv-activegroup-visiblepanel-tab-background-color'?: string;
    '--dv-activegroup-hiddenpanel-tab-background-color'?: string;
    '--dv-inactivegroup-visiblepanel-tab-background-color'?: string;
    '--dv-inactivegroup-hiddenpanel-tab-background-color'?: string;
    '--dv-activegroup-visiblepanel-tab-color'?: string;
    '--dv-activegroup-hiddenpanel-tab-color'?: string;
    '--dv-inactivegroup-visiblepanel-tab-color'?: string;
    '--dv-inactivegroup-hiddenpanel-tab-color'?: string;
    '--dv-tab-divider-color'?: string;
    '--dv-separator-border'?: string;
    '--dv-paneview-header-border-color'?: string;
    '--dv-icon-hover-background-color'?: string;
    '--dv-drag-over-background-color'?: string;
    '--dv-drag-over-border'?: string;
    '--dv-active-sash-color'?: string;
    '--dv-sash-color'?: string;
    '--dv-scrollbar-background-color'?: string;
    '--dv-floating-box-shadow'?: string;
    '--dv-floating-border'?: string;
    '--dv-floating-group-dragging-opacity'?: string;
}

export interface LayoutManagerThemeState {
    gap: number;
    dndOverlayMounting: 'absolute' | 'relative';
    dndPanelOverlay: 'content' | 'group';
    dndTabIndicator: 'line' | 'fill';
    dndOverlayBorder: string;
    tabGroupIndicator: 'wrap' | 'none';
    tabAnimation: TabAnimation;
    cssOverrides: LayoutManagerThemeCssOverrides;
}

export function getInitialStateFromLayoutManagerTheme(
    theme: DockviewTheme
): LayoutManagerThemeState {
    return {
        gap: theme.gap ?? 0,
        dndOverlayMounting: theme.dndOverlayMounting ?? 'relative',
        dndPanelOverlay: theme.dndPanelOverlay ?? 'content',
        dndTabIndicator: theme.dndTabIndicator ?? 'fill',
        dndOverlayBorder: theme.dndOverlayBorder ?? '',
        tabGroupIndicator: theme.tabGroupIndicator ?? 'wrap',
        tabAnimation: theme.tabAnimation ?? 'default',
        cssOverrides: {},
    };
}

export function buildEffectiveLayoutManagerTheme(
    baseTheme: DockviewTheme,
    state: LayoutManagerThemeState
): DockviewTheme {
    return {
        ...baseTheme,
        gap: state.gap > 0 ? state.gap : undefined,
        dndOverlayMounting: state.dndOverlayMounting,
        dndPanelOverlay: state.dndPanelOverlay,
        dndTabIndicator: state.dndTabIndicator,
        dndOverlayBorder: state.dndOverlayBorder || undefined,
        tabGroupIndicator: state.tabGroupIndicator,
        tabAnimation: state.tabAnimation,
    };
}

export function generateLayoutManagerCodeSnippet(
    baseTheme: DockviewTheme,
    state: LayoutManagerThemeState
): string {
    const name = baseTheme.name;
    const importName = `theme${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    const overrideEntries = Object.entries(state.cssOverrides).filter(
        ([, value]) => value !== undefined && value !== ''
    ) as [string, string][];

    const themeFields: string[] = [];
    if (state.gap !== (baseTheme.gap ?? 0)) {
        themeFields.push(`  gap: ${state.gap},`);
    }
    if (
        state.dndOverlayMounting !==
        (baseTheme.dndOverlayMounting ?? 'relative')
    ) {
        themeFields.push(
            `  dndOverlayMounting: '${state.dndOverlayMounting}',`
        );
    }
    if (state.dndPanelOverlay !== (baseTheme.dndPanelOverlay ?? 'content')) {
        themeFields.push(`  dndPanelOverlay: '${state.dndPanelOverlay}',`);
    }
    if (state.dndTabIndicator !== (baseTheme.dndTabIndicator ?? 'fill')) {
        themeFields.push(`  dndTabIndicator: '${state.dndTabIndicator}',`);
    }
    if (state.dndOverlayBorder !== (baseTheme.dndOverlayBorder ?? '')) {
        themeFields.push(`  dndOverlayBorder: '${state.dndOverlayBorder}',`);
    }
    if (
        state.tabGroupIndicator !==
        (baseTheme.tabGroupIndicator ?? 'wrap')
    ) {
        themeFields.push(
            `  tabGroupIndicator: '${state.tabGroupIndicator}',`
        );
    }
    if (state.tabAnimation !== (baseTheme.tabAnimation ?? 'default')) {
        themeFields.push(`  tabAnimation: '${state.tabAnimation}',`);
    }

    let output = `import { ${importName} } from '#adaptive-view/react';\n\n`;

    if (themeFields.length > 0) {
        output += `const myTheme = {\n  ...${importName},\n${themeFields.join('\n')}\n};\n`;
    } else {
        output += `const myTheme = ${importName};\n`;
    }

    if (overrideEntries.length > 0) {
        output += `\n// Apply to the div wrapping <DockviewReact>:\nconst cssOverrides: React.CSSProperties = {\n`;
        for (const [key, value] of overrideEntries) {
            output += `  '${key}': '${value}',\n`;
        }
        output += `};\n`;
    }

    return output;
}

// Tokens for the demo's "Controls & Theme" layout manager. These map to the docs'
// own `--dv-*` design tokens (and `--ifm-*`) so the panel matches the rest of
// the site and flips with its light/dark mode. Double fallbacks (--dv-* →
// --ifm-* → hard hex) keep it looking right in the standalone / CodeSandbox
// build where the docs variables don't exist.
export const LM = {
    // Surfaces
    bg: 'var(--ifm-background-surface-color, #14141d)', // panel body
    card: 'var(--ifm-background-color, #0d0d15)', // nested section cards
    surface: 'var(--ifm-hover-overlay, rgba(255,255,255,0.05))',
    surfaceHover:
        'var(--dv-accent-soft, var(--ifm-hover-overlay, rgba(255,255,255,0.08)))',
    inputBg: 'var(--ifm-background-color, rgba(255,255,255,0.04))',

    // Borders
    border: 'var(--dv-border, var(--ifm-toc-border-color, rgba(255,255,255,0.12)))',
    borderStrong:
        'var(--dv-border-strong, var(--ifm-color-emphasis-300, rgba(255,255,255,0.2)))',

    // Text
    heading: 'var(--ifm-heading-color, #f4f4f8)',
    text: 'var(--ifm-font-color-base, #c7c9d6)',
    muted: 'var(--ifm-color-content-secondary, rgba(255,255,255,0.6))',
    faint: 'var(--ifm-color-emphasis-500, rgba(255,255,255,0.42))',

    // Accent
    accent: 'var(--ifm-color-primary, #5d94f4)',
    accentContrast: 'var(--dv-accent-contrast, #ffffff)',
    accentSoft: 'var(--dv-accent-soft, rgba(93,148,244,0.16))',
    accentSoftHover: 'var(--dv-accent-soft-hover, rgba(93,148,244,0.28))',

    // Elevation
    shadowSm: 'var(--dv-shadow-sm, 0 1px 2px rgba(0,0,0,0.4))',
    shadowMd: 'var(--dv-shadow-md, 0 4px 14px rgba(0,0,0,0.4))',
    shadowLg: 'var(--dv-shadow-lg, 0 20px 44px -14px rgba(0,0,0,0.7))',
    glow: '0 2px 10px color-mix(in srgb, var(--ifm-color-primary, #5d94f4) 40%, transparent)',

    // Shape
    radius: 12,
    radiusSm: 8,
    radiusChip: 6,

    // Type
    ui: 'var(--ifm-font-family-base, "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif)',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

// Shared button styles (grid/panel/group action rows): the site's secondary /
// primary button recipe, so every button reads clearly in light and dark.
export const layoutManagerBtn: CSSProperties = {
    padding: '5px 11px',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: LM.ui,
    border: `1px solid ${LM.border}`,
    borderRadius: LM.radiusSm,
    background: LM.surface,
    color: LM.text,
    cursor: 'pointer',
    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
};

export const layoutManagerBtnActive: CSSProperties = {
    ...layoutManagerBtn,
    background: 'var(--ifm-color-primary, #5d94f4)',
    borderColor: LM.accent,
    color: LM.accentContrast,
    boxShadow: LM.glow,
};

export const layoutManagerIconBtn: CSSProperties = {
    ...layoutManagerBtn,
    padding: '4px 7px',
    color: LM.muted,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
};
