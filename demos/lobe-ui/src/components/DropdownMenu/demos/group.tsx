import { Button, DropdownMenu } from '@devkit/ui';

import { groupItems } from './data';

export default () => {
  return (
    <DropdownMenu items={groupItems} nativeButton>
      <Button>Group Items</Button>
    </DropdownMenu>
  );
};
