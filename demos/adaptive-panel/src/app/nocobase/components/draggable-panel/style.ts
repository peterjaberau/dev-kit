import { defineSlotRecipe } from '@chakra-ui/react';

export const draggablePanelRecipe = defineSlotRecipe({
  className: 'draggable-panel',
  slots: ['root', 'inner', 'handler', 'handlerIcon', 'toggle'],
  base: {
    root: {
      '--panel-header-height': '0px',
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      borderColor: 'border.muted',
      borderStyle: 'solid',
      borderWidth: '0px',
      overflow: 'hidden',
      _hover: {
        '& .draggable-panel__toggle': {
          opacity: 1,
        },
      },
    },

    inner: {
      overflow: 'hidden',
      transition: 'all 0.2s ease-out',
    },

    handler: {
      position: 'relative',
      zIndex: 1,
      _before: {
        content: '""',
        position: 'absolute',
        zIndex: 0,
        transition: 'all 0.2s ease-out',
        bg: 'transparent',
      },
      _hover: {
        _before: {
          bg: 'colorPalette.solid',
        },
      },
      _active: {
        _before: {
          bg: 'colorPalette.solid',
        },
      },
    },

    handlerIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease-out',
    },

    toggle: {
      position: 'absolute',
      zIndex: 10,
      opacity: 0,
      transition: 'opacity 0.2s ease-out',
      pointerEvents: 'none',

      '& > div': {
        pointerEvents: 'all',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '1px',
        borderColor: 'border.muted',
        bg: 'bg.muted',
        color: 'fg.muted',
        transition: 'all 0.2s ease-out',
        _hover: {
          bg: 'bg.subtle',
          color: 'fg',
        },
        _active: {
          bg: 'bg.emphasized',
          color: 'fg',
        },
      },
    },
  },

  variants: {
    mode: {
      fixed: {
        root: { position: 'relative' },
      },
      float: {
        root: { position: 'absolute', zIndex: 200 },
      },
    },

    fullscreen: {
      true: {
        root: {
          position: 'absolute',
          insetBlock: 'var(--panel-header-height) 0',
          insetInline: 0,
          w: '100%',
          h: 'calc(100% - var(--panel-header-height))',
          bg: 'bg.canvas',
        },
      },
    },

    placement: {
      right: {
        root: { flexDirection: 'row' },
        handler: {
          w: '2px',
          cursor: 'col-resize',
          _before: {
            insetInlineStart: '50%',
            w: '2px',
            h: '100%',
          },
        },
        toggle: {
          insetInlineEnd: '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          h: '40px',
          w: '16px',
          '& > div': {
            w: '16px',
            h: '40px',
            borderRadius: '0 4px 4px 0',
          },
        },
      },

      left: {
        root: { flexDirection: 'row-reverse' },
        handler: {
          w: '2px',
          cursor: 'col-resize',
          _before: {
            insetInlineEnd: '50%',
            w: '2px',
            h: '100%',
          },
        },
        toggle: {
          insetInlineStart: '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          h: '40px',
          w: '16px',
          '& > div': {
            w: '16px',
            h: '40px',
            borderRadius: '4px 0 0 4px',
          },
        },
      },

      top: {
        root: { flexDirection: 'column-reverse' },
        handler: {
          h: '2px',
          cursor: 'row-resize',
          _before: {
            insetBlockStart: '50%',
            h: '2px',
            w: '100%',
          },
        },
        toggle: {
          insetBlockStart: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          w: '40px',
          h: '16px',
          '& > div': {
            w: '40px',
            h: '16px',
            borderRadius: '4px 4px 0 0',
          },
        },
      },

      bottom: {
        root: { flexDirection: 'column' },
        handler: {
          h: '2px',
          cursor: 'row-resize',
          _before: {
            insetBlockEnd: '50%',
            h: '2px',
            w: '100%',
          },
        },
        toggle: {
          insetBlockEnd: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          w: '40px',
          h: '16px',
          '& > div': {
            w: '40px',
            h: '16px',
            borderRadius: '0 0 4px 4px',
          },
        },
      },
    },

    expanded: {
      true: {},
      false: {
        inner: {
          display: 'none',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'fixed',
    placement: 'right',
    fullscreen: false,
    expanded: true,
  },
});
