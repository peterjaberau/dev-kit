import { Button, Tooltip, TooltipProps } from '@devkit/ui';
import { StoryBook, useControls, useCreateStore } from '@devkit/ui/storybook';

export default () => {
  const store = useCreateStore();
  const control = useControls(
    {
      arrow: false,
      hotkey: 'mod+k',
      title: 'Example tooltip',
    },
    { store },
  ) as TooltipProps;

  return (
    <StoryBook levaStore={store}>
      <Tooltip {...control}>
        <Button type="primary">Tooltip</Button>
      </Tooltip>
    </StoryBook>
  );
};
