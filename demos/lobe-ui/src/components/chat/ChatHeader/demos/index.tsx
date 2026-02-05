import { ChatHeader, ChatHeaderProps } from '@devkit/ui/chat';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      showBackButton: false,
    },
    { store },
  ) as ChatHeaderProps;

  return (
    <StoryBook levaStore={store} noPadding>
      <ChatHeader {...control} left={<div>Left</div>} right={<div>Right</div>} />
    </StoryBook>
  );
};
