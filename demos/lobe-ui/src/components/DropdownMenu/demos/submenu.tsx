import { Button, DropdownMenu } from '@devkit/ui';

import { submenuItems } from './data';

export default () => {
  return (
    <DropdownMenu items={submenuItems} nativeButton>
      <Button>Open Menu</Button>
    </DropdownMenu>
  );
};
