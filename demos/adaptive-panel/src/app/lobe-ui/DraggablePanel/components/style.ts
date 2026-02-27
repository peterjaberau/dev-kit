import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css }) => {
  return {
    body: css`
      overflow: hidden auto;
      padding: 16px;
    `,
    container: css`
      position: relative;
      overflow: hidden;
    `,
    footer: css`
      padding-block: 8px;
      padding-inline: 16px;
      border-block-start: 1px solid #f0f0f0;
    `,
    handlerIcon: css`
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-out;
    `,
    header: css`
      padding-block: 8px;
      padding-inline: 16px;
      border-block-end: 1px solid #f0f0f0;
      font-weight: 500;
    `,
  }
});
