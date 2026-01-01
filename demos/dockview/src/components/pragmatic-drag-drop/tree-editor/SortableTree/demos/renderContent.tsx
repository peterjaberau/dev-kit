'use client';
import type { TreeData } from '..';
import { SortableTree } from '..';
import { Input } from 'antd';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import type { MenuContent } from './data';
import { menuData } from './data';

const NodeRender = ({ node }: any) => {
  const [text, setText] = useState(node.content.name);

  return (
    <Flexbox horizontal align={'center'} gap={4}>

      <Input
        size={'small'}
        value={text}
        id={node.id}
        tabIndex={10}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Flexbox>
  );
};

export const SortableTreeRenderContent = () => {
  const [treeData, setTreeData] = useState<TreeData<MenuContent>>(menuData);

  return (
    <div style={{ width: 340 }}>
      <SortableTree<MenuContent>
        treeData={treeData}
        onTreeDataChange={(data) => {
          console.log('change：', data);
          setTreeData(data);
        }}
        renderContent={(node) => node.content && <NodeRender node={node} />}
      />
    </div>
  );
};
