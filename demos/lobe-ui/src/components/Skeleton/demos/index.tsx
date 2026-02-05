import { Skeleton } from '@devkit/ui';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      active: true,
      avatar: true,
      paragraph: true,
      title: true,
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <Skeleton {...(control as any)} />
    </StoryBook>
  );
};
