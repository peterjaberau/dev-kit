import { createStaticStyles, cx } from 'antd-style';
import { cva } from 'class-variance-authority';

// Layout constants

const prefixCls = 'ant';
const prefix = `${prefixCls}-draggable-panel`;

export const styles = createStaticStyles(({ css }) => {
  // Base styles - border styles split by showBorder
  const borderStyles = {
    borderBottom: css`
      border-block-end: 1px solid #d9d9d9;
    `,
    borderBottomNone: css`
      border-block-end-width: 0;
    `,
    borderLeft: css`
      border-inline-start: 1px solid #d9d9d9;
    `,
    borderLeftNone: css`
      border-inline-start-width: 0;
    `,
    borderRight: css`
      border-inline-end: 1px solid #d9d9d9;
    `,
    borderRightNone: css`
      border-inline-end-width: 0;
    `,
    borderTop: css`
      border-block-start: 1px solid #d9d9d9;
    `,
    borderTopNone: css`
      border-block-start-width: 0;
    `,
  }

  // done
  const float = css`
    position: absolute;
    z-index: 200;
  `;

  const floatPositions = {
    bottomFloat: cx(
      float,
      css`
        inset-block-end: 0;
        inset-inline: 0 0;
        width: 100%;
      `,
    ),
    leftFloat: cx(
      float,
      css`
        inset-block: var(--draggable-panel-header-height, 0) 0;
        inset-inline-start: 0;
        height: calc(100% - var(--draggable-panel-header-height, 0px));
      `,
    ),
    rightFloat: cx(
      float,
      css`
        inset-block: var(--draggable-panel-header-height, 0) 0;
        inset-inline-end: 0;
        height: calc(100% - var(--draggable-panel-header-height, 0px));
      `,
    ),
    topFloat: cx(
      float,
      css`
        inset-block-start: var(--draggable-panel-header-height, 0);
        inset-inline: 0 0;
        width: 100%;
      `,
    ),
  };

  const handleBaseStyle = css`
    position: relative;
    background: r !important;
    &::before {
      content: '';
      position: absolute;
      transition: all 0.2s ease-out;
    }
  `;

  const handleHighlightStyle = css`
    &:hover {
      &::before {
        background: #91caff;
        box-shadow: 0 0 8px color-mix(in srgb, #1677ff 25%, transparent);
      }
    }

    &:active {
      &::before {
        background: #1677ff !important;
      }
    }
  `

  const handleStyles = {
    handleBottom: cx(
      `${prefix}-bottom-handle`,
      css`
        &::before {
          inset-block-end: 50%;
          width: 100%;
          height: 2px;
        }
      `,
    ),
    handleLeft: cx(
      `${prefix}-left-handle`,
      css`
        &::before {
          inset-inline-start: 50%;
          width: 2px;
          height: 100%;
        }
      `,
    ),
    handleRight: cx(
      `${prefix}-right-handle`,
      css`
        &::before {
          inset-inline-end: 50%;
          width: 2px;
          height: 100%;
        }
      `,
    ),
    handleRoot: handleBaseStyle,
    handleTop: cx(
      `${prefix}-top-handle`,
      css`
        &::before {
          inset-block-start: 50%;
          width: 100%;
          height: 2px;
        }
      `,
    ),
  };



  // Additional component styles
  const componentStyles = {
    // done
    fixed: css`
      position: relative;
    `,
    // done
    fullscreen: css`
      position: absolute;
      inset-block: var(--draggable-panel-header-height, 0) 0;
      inset-inline: 0;

      width: 100%;
      height: calc(100% - var(--draggable-panel-header-height, 0px));

      background: #ffffff;
    `,

    panel: cx(
      `${prefix}-fixed`,
      css`
        overflow: hidden;
        background: var(--draggable-panel-bg, #ffffff);
        transition: all 0.2s ease-out;
      `,
    ),
    root: cx(
      prefix,
      css`
        flex-shrink: 0;
      `,
    ),
  }

  return {
    ...borderStyles,
    ...floatPositions,
    ...handleStyles,
    handleHighlight: handleHighlightStyle,
    //done
    ...componentStyles,
  };
});

export const handleVariants = cva(styles.handleRoot, {
  variants: {
    placement: {
      bottom: styles.handleBottom,
      left: styles.handleLeft,
      right: styles.handleRight,
      top: styles.handleTop,
    },
  },
});

export const panelVariants = cva(styles.root, {
  compoundVariants: [
    {
      class: styles.bottomFloat,
      mode: 'float',
      placement: 'bottom',
    },
    {
      class: styles.topFloat,
      mode: 'float',
      placement: 'top',
    },
    {
      class: styles.leftFloat,
      mode: 'float',
      placement: 'left',
    },
    {
      class: styles.rightFloat,
      mode: 'float',
      placement: 'right',
    },
    // Border styles based on placement, isExpand, and showBorder
    // Note: border is on the opposite side of placement
    // placement 'top' -> borderBottom, placement 'right' -> borderLeft, etc.
    {
      class: styles.borderBottom,
      isExpand: true,
      placement: 'top',
      showBorder: true,
    },
    {
      class: styles.borderBottomNone,
      isExpand: true,
      placement: 'top',
      showBorder: false,
    },
    {
      class: styles.borderLeft,
      isExpand: true,
      placement: 'right',
      showBorder: true,
    },
    {
      class: styles.borderLeftNone,
      isExpand: true,
      placement: 'right',
      showBorder: false,
    },
    {
      class: styles.borderTop,
      isExpand: true,
      placement: 'bottom',
      showBorder: true,
    },
    {
      class: styles.borderTopNone,
      isExpand: true,
      placement: 'bottom',
      showBorder: false,
    },
    {
      class: styles.borderRight,
      isExpand: true,
      placement: 'left',
      showBorder: true,
    },
    {
      class: styles.borderRightNone,
      isExpand: true,
      placement: 'left',
      showBorder: false,
    },
  ],
  defaultVariants: {
    isExpand: false,
    mode: 'fixed',
    placement: 'right',
    showBorder: true,
  },

  variants: {
    isExpand: {
      false: null,
      true: null,
    },
    mode: {
      fixed: styles.fixed,
      float: null,
    },
    placement: {
      bottom: null,
      left: null,
      right: null,
      top: null,
    },
    showBorder: {
      false: null,
      true: null,
    },
  },
});

