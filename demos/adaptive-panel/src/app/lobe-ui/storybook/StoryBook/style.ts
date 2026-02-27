import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css, responsive }) => {
  return {
    editor: css`
      width: inherit;
      min-height: inherit;
    `,
    left: css`
      position: relative;
      overflow: auto;
    `,
    leftWithPadding: css`
      position: relative;
      overflow: auto;
      padding-block: 40px;
      padding-inline: 24px;
    `,
    leva: css`
      --leva-sizes-controlWidth: 66%;
      --leva-colors-elevation1: #00000012;
      --leva-colors-elevation2: transparent;
      --leva-colors-elevation3: #00000012;
      --leva-colors-accent1: #1677ff;
      --leva-colors-accent2: #4096ff;
      --leva-colors-accent3: #0958d9;
      --leva-colors-highlight1: #00000075;
      --leva-colors-highlight2: #000000a3;
      --leva-colors-highlight3: #000000e3;
      --leva-colors-vivid1: #faad14;
      --leva-shadows-level1: unset;
      --leva-shadows-level2: unset;
      --leva-fonts-mono: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;

      overflow: auto;

      width: 100%;
      height: 100%;
      padding-block: 6px;
      padding-inline: 0;

      > div {
        background: transparent;

        > div {
          background: transparent;
        }
      }

      input:checked + label > svg {
        stroke: #f5f5f5;
      }

      button {
        --leva-colors-accent2: #00000012;
      }
    `,
    right: css`
      background: #f5f5f5;

      ${responsive.sm} {
        .draggable-panel-fixed {
          width: 100% !important;
        }
      }
    `,
  }
});
