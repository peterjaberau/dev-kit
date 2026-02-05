import { TextArea, TextAreaProps } from '@devkit/ui';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const controls = useControls(
    {
      placeholder: 'Type keywords...',
      resize: false,
      shadow: false,
      variant: {
        options: ['outlined', 'borderless', 'filled'],
        value: 'filled',
      },
    },
    { store },
  ) as TextAreaProps;

  return (
    <StoryBook levaStore={store}>
      <TextArea {...controls} />
    </StoryBook>
  );
};
