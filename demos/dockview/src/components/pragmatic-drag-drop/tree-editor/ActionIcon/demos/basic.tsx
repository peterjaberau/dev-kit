import { SmileOutlined } from '@ant-design/icons';
import { ActionIcon } from '..';

export default () => (
  <ActionIcon
    title={'Description of function buttons'}
    icon={<SmileOutlined />}
    onClick={() => {
      alert('Trigger action');
    }}
  />
);
