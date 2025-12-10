// Typography system with Inconsolata
export const FONT_FAMILY = '"Inconsolata", "SF Mono", "Monaco", "Fira Code", "Geist Mono", monospace';

export const typography: any = {
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  tab: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.03em',
    textTransform: 'uppercase' as const,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  info: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.7rem',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  button: {
    xs: {
      fontFamily: FONT_FAMILY,
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    sm: {
      fontFamily: FONT_FAMILY,
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
} as const;
