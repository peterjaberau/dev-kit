import { Button, Empty } from '@devkit/ui';

export default () => (
  <Empty
    action={<Button type="primary">Create Item</Button>}
    description="Create your first item to get started"
    title="No Items"
  />
);
