import { Block, type BlockProps } from '@devkit/ui';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      clickable: false,
      glass: false,
      shadow: false,
      variant: {
        options: ['filled', 'outlined', 'borderless'],
        value: 'filled',
      },
    },
    { store },
  ) as BlockProps;

  return (
    <StoryBook levaStore={store}>
      <Block padding={16} {...control}>
        Block
      </Block>
    </StoryBook>
  );
};
