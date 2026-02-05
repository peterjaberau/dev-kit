import { Spotlight, SpotlightProps } from '@devkit/ui/awesome';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';
import { createStaticStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => ({
  card: css`
    position: relative;

    width: 100%;
    height: 36px;
    border: 1px solid ${cssVar.colorBorder};
    border-radius: ${cssVar.borderRadius};

    background: ${cssVar.colorBgLayout};
  `,
}));

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      size: 64,
    },
    { store },
  ) as SpotlightProps;

  return (
    <StoryBook levaStore={store}>
      <div className={styles.card}>
        <Spotlight {...control} />
      </div>
    </StoryBook>
  );
};
