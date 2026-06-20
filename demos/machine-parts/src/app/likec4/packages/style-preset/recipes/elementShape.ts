import { defineSlotRecipe } from '@chakra-ui/react'
import { __v, vars } from '../const'

export const elementShapeRecipe = defineSlotRecipe({
  className: 'likec4-element-shape',
  slots: ['root', 'outline'],
  base: {
    root: {
      top: '0',
      left: '0',
      position: 'absolute',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'visible',
      [vars.palette.outline]: {
        base: `oklch(from ${__v('palette.stroke')} calc(l * 0.9) c h)`,
        _dark: `oklch(from ${__v('palette.stroke')} calc(l * 1.2) calc(c * 1.05) h)`,
      },
      ['--likec4-outline-size']: `4px`,
    },
    outline: {
      opacity: 0.8,
      transitionBehavior: 'allow-discrete',
      visibility: {
        base: 'hidden',
        _smallZoom: 'hidden',
        _selected: 'visible',
        _focusVisible: 'visible',
        _groupFocusVisible: 'visible',
      },
      animationPlayState: {
        base: 'paused',
        _selected: 'running',
        _focusVisible: 'running',
        _groupFocusVisible: 'running',
        _panning: 'paused',
      },
      pointerEvents: 'none',
    },
  },
  variants: {
    shapetype: {
      html: {
        root: {
          backgroundColor: 'var(--likec4-palette-fill)',
          border: 'none',
          borderRadius: '6px',
          boxShadow: {
            base: [
              '0 2px 1px 0 rgb(0 0 0 / 21%)',
              '0 1px 1px 0 color-mix(in oklab, var(--likec4-palette-stroke) 40%, transparent)',
              '0 5px 3px 0 rgb(0 0 0 / 10%)',
            ].join(','),
            _hover: {
              base: `rgba(38, 57, 77, 95%) 0px 20px 30px -10px`,
              _dark: `rgba(10, 11, 16, 90%) 0px 20px 30px -10px`,
            },
            _selected: 'none',
            _smallZoom: 'none',
            _panning: 'none',
          },
          transition: {
            base: 'background-color 150ms, box-shadow 130ms',
            _reduceGraphicsOnPan: 'none',
          },
          transitionTimingFunction: 'out',
          transitionDelay: '0ms',
        },
        multipleHtml: {
          position: 'absolute',
          content: '" "',
          top: '16px',
          left: '16px',
          width: 'calc(100% - 6px)',
          height: 'calc(100% - 6px)',
          backgroundColor: 'var(--likec4-palette-fill)',
          borderRadius: '6px',
          zIndex: -1,
          filter: 'brightness(0.5) !important',
          visibility: {
            base: 'visible',
            _smallZoom: 'hidden',
            _selected: 'hidden',
            _focusVisible: 'hidden',
            _reduceGraphicsOnPan: 'hidden',
          },
          transition: 'normal',
          _hover: {
            transform: 'translate(-14px, -14px)',
          },
        },
        outline: {
          position: 'absolute',
          content: '" "',
          top: `[calc(-1 * var(--likec4-outline-size) - 1px)]`,
          left: `[calc(-1 * var(--likec4-outline-size) - 1px)]`,
          width: `[calc(100% + 2 * var(--likec4-outline-size) + 2px)]`,
          height: `[calc(100% + 2 * var(--likec4-outline-size) + 2px)]`,
          borderStyle: 'solid',
          borderWidth: 'var(--likec4-outline-size)',
          borderRadius: '11px',
          borderColor: 'var(--likec4-palette-outline)',
          animationStyle: 'indicator',
        },
      },
      svg: {
        root: {
          fill: 'var(--likec4-palette-fill)',
          stroke: 'var(--likec4-palette-stroke)',
          transition: `fill 120ms {easings.in}, filter 130ms {easings.in}`,
          transitionTimingFunction: {
            base: 'out',
            _hover: 'in',
          },
          transitionDelay: '0ms',
          filter: {
            base: [
              'drop-shadow(0 2px 1px rgba(0, 0, 0, 0.21))',
              'drop-shadow(0 1px 1px color-mix(in oklab, var(--likec4-palette-stroke) 40%, transparent))',
              'drop-shadow(0 5px 3px rgba(0, 0, 0, 0.1))',
            ].join('\n'),
            _hover: [
              'drop-shadow(0 2px 1px rgba(0, 0, 0, 0.12))',
              'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.12))',
              'drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.12))',
              'drop-shadow(0px 16px 8px rgba(0, 0, 0, 0.1))',
              'drop-shadow(0px 32px 16px rgba(0, 0, 0, 0.09))',
            ].join('\n'),
            _selected: 'none',
            _smallZoom: 'none',
            _panning: 'none',
          },
          '& [data-likec4-fill="fill"]': {
            fill: 'var(--likec4-palette-fill)',
          },
          '& [data-likec4-fill="stroke"]': {
            fill: 'var(--likec4-palette-stroke)',
          },
          '& [data-likec4-fill="mix-stroke"]': {
            fill: 'color-mix(in oklab, var(--likec4-palette-stroke) 80%, var(--likec4-palette-fill))',
          },
        },
        componentTopLeftRect: {
          '--mix-bg': '40%',
          fill: 'color-mix(in oklab, var(--likec4-palette-stroke) var(--mix-bg), var(--likec4-palette-fill))',
          transition: `all 120ms {easings.in}`,
          transitionDelay: '0ms',
          strokeOpacity: 0.8,
          _selected: {
            transitionTimingFunction: 'out',
            '--mix-bg': '60%',
            strokeOpacity: 1,
          },
          _hover: {
            transitionTimingFunction: 'out',
            '--mix-bg': '60%',
            strokeOpacity: 1,
          },
        },
        multipleSvg: {
          transformOrigin: {
            base: '50% 50%',
            _shapeQueue: '75% 25%',
            _shapeCylinder: '50% 100%',
            _shapeStorage: '50% 100%',
          },
          transform: {
            base: 'translate(14px, 14px) perspective(200px) translateZ(-4px)',
            _hover: 'translate(2px, 2px) perspective(200px) translateZ(-4px)',
          },
          transitionBehavior: 'allow-discrete',
          transitionProperty: 'fill, filter, transform',
          transitionDuration: 'faster',
          filter: 'brightness(0.5) !important',
          stroke: 'none',
          display: {
            _smallZoom: 'none',
            _reduceGraphicsOnPan: 'none',
            _selected: 'none',
            _focusVisible: 'none',
          },
          '& [data-likec4-fill="mix-stroke"]': {
            fill: 'var(--likec4-palette-fill)',
          },
        },
        outline: {
          stroke: 'var(--likec4-palette-outline)',
          fill: 'none',
          strokeWidth: 4,
          animationStyle: 'indicator',
        },
      },
    },
    withBorder: {
      true: {},
      false: {},
    },
    withOutline: {
      true: {
        outline: {
          display: 'block',
        },
      },
      false: {
        outline: {
          display: 'none',
        },
      },
    },
  },
  defaultVariants: {
    withBorder: false,
    withOutline: false,
  },
  compoundVariants: [{
    shapetype: 'html',
    withBorder: true,
    css: {
      root: {
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: 'var(--likec4-palette-stroke)',
        '--likec4-outline-size': '6px',
      },
      outline: {
        borderRadius: '10px',
      },
    },
  }],
})
