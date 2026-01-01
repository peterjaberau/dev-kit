import { CollapseAction, DeleteAction, EditAction, HandleAction } from '../Icons';
import { Space } from 'antd';

export default () => (
  <Space>
    <DeleteAction title="Delete button" />
    <EditAction title="Edit button" />
    <HandleAction title="Handle action" />
    <CollapseAction title="Collapse action" />
  </Space>
);
