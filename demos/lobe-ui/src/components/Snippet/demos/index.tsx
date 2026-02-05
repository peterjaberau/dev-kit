import { Snippet, SnippetProps } from '@devkit/ui';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      children: 'pnpm install @devkit/ui',
      copyable: true,
      language: 'sh',
      prefix: '$',
      shadow: false,
      spotlight: false,
      variant: {
        options: ['filled', 'outlined', 'borderless'],
        value: 'filled',
      },
    },
    { store },
  ) as SnippetProps;

  return (
    <StoryBook levaStore={store}>
      <Snippet {...control} />
    </StoryBook>
  );
};
