import { TokenTag, TokenTagProps } from '@devkit/ui/chat';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      maxValue: {
        step: 1,
        value: 5000,
      },
      mode: {
        options: ['remained', 'used'],
        value: 'remained',
      },
      shape: {
        options: ['round', 'square'],
        value: 'round',
      },
      showInfo: true,
      value: {
        step: 1,
        value: 1000,
      },
    },
    { store },
  ) as TokenTagProps;

  return (
    <StoryBook levaStore={store}>
      <TokenTag {...control} />
    </StoryBook>
  );
};
